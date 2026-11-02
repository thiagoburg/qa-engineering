interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
}

interface SessionUser {
  id: string;
  email: string;
}

interface TaskRow {
  id: string;
  title: string;
  description: string;
  completed: number;
  created_at: string;
  updated_at: string;
}

const SESSION_COOKIE = "taskflow_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class AuthServiceError extends Error {}

function json(data: unknown, status = 200, headers = new Headers()): Response {
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  applySecurityHeaders(headers);
  return new Response(JSON.stringify(data), { status, headers });
}

function applySecurityHeaders(headers: Headers): void {
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'",
  );
}

function error(message: string, status: number): Response {
  return json({ error: message }, status);
}

function cookieValue(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  for (const item of cookieHeader.split(";")) {
    const [name, ...value] = item.trim().split("=");
    if (name === SESSION_COOKIE) return value.join("=") || null;
  }
  return null;
}

function cookieHeader(request: Request, value: string, maxAge: number): string {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

async function supabaseRequest(
  env: Env,
  path: string,
  options: { method?: string; body?: unknown; accessToken?: string } = {},
): Promise<Response> {
  const baseUrl = env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const publishableKey = env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!baseUrl || !publishableKey) throw new AuthServiceError("Authentication service is not configured.");

  const headers = new Headers({ apikey: publishableKey });
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (options.accessToken) headers.set("Authorization", `Bearer ${options.accessToken}`);
  try {
    return await fetch(`${baseUrl}/auth/v1${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new AuthServiceError("Authentication service is unavailable.");
  }
}

async function responseJson(response: Response): Promise<Record<string, unknown>> {
  try {
    const value: unknown = await response.json();
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function authFailure(response: Response, body: Record<string, unknown>, action: "register" | "login"): Response {
  if (action === "login" && [400, 401, 403, 422].includes(response.status)) {
    return error("Email or password is incorrect.", 401);
  }
  const providerMessage = [body.msg, body.message, body.error_description, body.error]
    .filter((value): value is string => typeof value === "string")
    .join(" ");
  if (action === "register" && /already registered|already exists|user_already_exists/i.test(providerMessage)) {
    return error("An account with that email already exists.", 409);
  }
  if (response.status === 429) return error("Too many attempts. Try again later.", 429);
  if (response.status >= 500) return error("Authentication service is unavailable.", 503);
  return error(action === "register" ? "Account could not be created. Check the email and password." : "Email or password is incorrect.", action === "register" ? 400 : 401);
}

function sessionCookie(request: Request, body: Record<string, unknown>): string | null {
  if (typeof body.access_token !== "string" || !body.access_token) return null;
  const expiresIn = typeof body.expires_in === "number" ? body.expires_in : 3600;
  const maxAge = Math.max(1, Math.min(SESSION_SECONDS, Math.floor(expiresIn)));
  return cookieHeader(request, body.access_token, maxAge);
}

function sessionUser(value: unknown): SessionUser | null {
  if (value === null || typeof value !== "object") return null;
  const user = value as Record<string, unknown>;
  return typeof user.id === "string" && typeof user.email === "string"
    ? { id: user.id, email: user.email }
    : null;
}

async function saveUser(env: Env, user: SessionUser): Promise<void> {
  await env.DB.prepare(
    "INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET email = excluded.email",
  )
    .bind(user.id, user.email)
    .run();
}

async function parseJson(request: Request): Promise<Record<string, unknown> | null> {
  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > 8_192) return null;
  if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) return null;
  try {
    if (!request.body) return null;
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8_192) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const value: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function validEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_PATTERN.test(value.trim());
}

async function currentUser(request: Request, env: Env): Promise<SessionUser | null> {
  const token = cookieValue(request);
  if (!token) return null;
  const response = await supabaseRequest(env, "/user", { accessToken: token });
  if (response.status === 401 || response.status === 403) return null;
  if (!response.ok) throw new AuthServiceError("Authentication service is unavailable.");
  return sessionUser(await responseJson(response));
}

async function register(request: Request, env: Env): Promise<Response> {
  const body = await parseJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string") {
    return error("Enter a valid email address and password.", 400);
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;
  const passwordBytes = new TextEncoder().encode(password).byteLength;
  if (passwordBytes < 12 || passwordBytes > 256) {
    return error("Password must be between 12 and 256 bytes.", 400);
  }

  const response = await supabaseRequest(env, "/signup", { method: "POST", body: { email, password } });
  const result = await responseJson(response);
  if (!response.ok) return authFailure(response, result, "register");

  const user = sessionUser(result.user);
  if (!user) return error("Authentication service returned an invalid account.", 502);
  const cookie = sessionCookie(request, result);
  if (!cookie) {
    return json({ confirmationRequired: true }, 202);
  }

  await saveUser(env, user);
  return json({ user }, 201, new Headers({ "Set-Cookie": cookie }));
}

async function login(request: Request, env: Env): Promise<Response> {
  const body = await parseJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string") {
    return error("Enter your email address and password.", 400);
  }

  const response = await supabaseRequest(env, "/token?grant_type=password", {
    method: "POST",
    body: { email: body.email.trim().toLowerCase(), password: body.password },
  });
  const result = await responseJson(response);
  if (!response.ok) return authFailure(response, result, "login");

  const user = sessionUser(result.user);
  const cookie = sessionCookie(request, result);
  if (!user || !cookie) return error("Authentication service returned an invalid session.", 502);

  await saveUser(env, user);
  return json({ user }, 200, new Headers({ "Set-Cookie": cookie }));
}

async function logout(request: Request, env: Env): Promise<Response> {
  const token = cookieValue(request);
  let providerRevoked = true;
  if (token) {
    try {
      const response = await supabaseRequest(env, "/logout", { method: "POST", accessToken: token });
      providerRevoked = response.ok;
    } catch {
      // Always clear the browser cookie, even if the auth service is unavailable.
      providerRevoked = false;
    }
  }
  const headers = new Headers({ "Set-Cookie": cookieHeader(request, "", 0) });
  return json({ ok: true, providerRevoked }, 200, headers);
}

async function listTasks(request: Request, env: Env, user: SessionUser): Promise<Response> {
  const filter = new URL(request.url).searchParams.get("status") ?? "all";
  if (!["all", "active", "completed"].includes(filter)) return error("Unknown task filter.", 400);
  const whereStatus = filter === "active" ? " AND completed = 0" : filter === "completed" ? " AND completed = 1" : "";
  const result = await env.DB.prepare(
    `SELECT id, title, description, completed, created_at, updated_at
       FROM tasks WHERE user_id = ?${whereStatus} ORDER BY created_at DESC, id`,
  )
    .bind(user.id)
    .all<TaskRow>();
  return json({ tasks: result.results.map((task) => ({ ...task, completed: Boolean(task.completed) })) });
}

async function createTask(request: Request, env: Env, user: SessionUser): Promise<Response> {
  const body = await parseJson(request);
  if (!body || typeof body.title !== "string") return error("Enter a task title.", 400);
  const title = body.title.trim();
  const description = body.description === undefined ? "" : body.description;
  if (!title) return error("Enter a task title.", 400);
  if (title.length > 120) return error("Task title must be 120 characters or fewer.", 400);
  if (typeof description !== "string" || description.length > 1000) {
    return error("Description must be 1,000 characters or fewer.", 400);
  }

  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO tasks (id, user_id, title, description) VALUES (?, ?, ?, ?)")
    .bind(id, user.id, title, description.trim())
    .run();
  const task = await env.DB.prepare(
    "SELECT id, title, description, completed, created_at, updated_at FROM tasks WHERE id = ? AND user_id = ?",
  )
    .bind(id, user.id)
    .first<TaskRow>();
  return json({ task: { ...task, completed: Boolean(task?.completed) } }, 201);
}

async function updateTask(request: Request, env: Env, user: SessionUser, id: string): Promise<Response> {
  const body = await parseJson(request);
  if (!body || Object.keys(body).length === 0) return error("Provide a task title, description, or completion state.", 400);

  const existing = await env.DB.prepare("SELECT id, title, description, completed FROM tasks WHERE id = ? AND user_id = ?")
    .bind(id, user.id)
    .first<{ id: string; title: string; description: string; completed: number }>();
  if (!existing) return error("Task not found.", 404);

  const title = body.title === undefined ? existing.title : body.title;
  const description = body.description === undefined ? existing.description : body.description;
  const completed = body.completed === undefined ? Boolean(existing.completed) : body.completed;
  if (typeof title !== "string" || !title.trim()) return error("Enter a task title.", 400);
  if (title.trim().length > 120) return error("Task title must be 120 characters or fewer.", 400);
  if (typeof description !== "string" || description.length > 1000) {
    return error("Description must be 1,000 characters or fewer.", 400);
  }
  if (typeof completed !== "boolean") return error("Completion state must be true or false.", 400);

  await env.DB.prepare(
    "UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ? AND user_id = ?",
  )
    .bind(title.trim(), description.trim(), completed ? 1 : 0, id, user.id)
    .run();
  const task = await env.DB.prepare(
    "SELECT id, title, description, completed, created_at, updated_at FROM tasks WHERE id = ? AND user_id = ?",
  )
    .bind(id, user.id)
    .first<TaskRow>();
  return json({ task: { ...task, completed: Boolean(task?.completed) } });
}

async function deleteTask(env: Env, user: SessionUser, id: string): Promise<Response> {
  const result = await env.DB.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  if (!result.meta.changes) return error("Task not found.", 404);
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}

async function taskStats(env: Env, user: SessionUser): Promise<Response> {
  const row = await env.DB.prepare(
    "SELECT COUNT(*) AS total, COALESCE(SUM(completed), 0) AS completed FROM tasks WHERE user_id = ?",
  )
    .bind(user.id)
    .first<{ total: number; completed: number }>();
  const total = row?.total ?? 0;
  const completed = row?.completed ?? 0;
  return json({ total, completed, active: total - completed });
}

async function handleApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === "/api/health" && method === "GET") {
    await env.DB.prepare("SELECT 1 AS ok").first();
    return json({ status: "ok" });
  }
  if (path === "/api/auth/register" && method === "POST") return register(request, env);
  if (path === "/api/auth/login" && method === "POST") return login(request, env);
  if (path === "/api/auth/logout" && method === "POST") return logout(request, env);

  const taskMatch = path.match(/^\/api\/tasks\/([\da-f-]+)$/i);
  const protectedRoute =
    (path === "/api/auth/me" && method === "GET") ||
    (path === "/api/tasks" && ["GET", "POST"].includes(method)) ||
    (path === "/api/tasks/stats" && method === "GET") ||
    (taskMatch !== null && ["PATCH", "DELETE"].includes(method));
  if (!protectedRoute) return error("API route not found.", 404);

  const user = await currentUser(request, env);
  if (path === "/api/auth/me" && method === "GET") {
    return user ? json({ user }) : error("Authentication required.", 401);
  }
  if (!user) return error("Authentication required.", 401);

  if (path === "/api/tasks" && method === "GET") return listTasks(request, env, user);
  if (path === "/api/tasks" && method === "POST") return createTask(request, env, user);
  if (path === "/api/tasks/stats" && method === "GET") return taskStats(env, user);

  if (taskMatch && method === "PATCH") return updateTask(request, env, user, taskMatch[1]!);
  if (taskMatch && method === "DELETE") return deleteTask(env, user, taskMatch[1]!);
  return error("API route not found.", 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env);
      } catch (cause) {
        if (cause instanceof AuthServiceError) return error(cause.message, 503);
        return error("Something went wrong. Please try again.", 500);
      }
    }
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    applySecurityHeaders(headers);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};


