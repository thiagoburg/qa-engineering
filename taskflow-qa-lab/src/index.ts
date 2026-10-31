interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  password_salt: string;
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
const PASSWORD_ITERATIONS = 600_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUMMY_SALT = new TextEncoder().encode("TaskFlow-QA-Lab-dummy-salt");

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

function encodeBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function decodeBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return encodeBase64(new Uint8Array(digest));
}

async function derivePassword(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const result = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt.slice().buffer as ArrayBuffer, iterations: PASSWORD_ITERATIONS },
    key,
    256,
  );
  return new Uint8Array(result);
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index]! ^ right[index]!;
  return difference === 0;
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

async function parseJson(request: Request): Promise<Record<string, unknown> | null> {
  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > 8_192) return null;
  if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) return null;
  try {
    const value: unknown = await request.json();
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
  const tokenHash = await sha256(token);
  return env.DB.prepare(
    `SELECT users.id, users.email
       FROM sessions JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = ? AND sessions.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
  )
    .bind(tokenHash)
    .first<SessionUser>();
}

async function register(request: Request, env: Env): Promise<Response> {
  const body = await parseJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string") {
    return error("Enter a valid email address and password.", 400);
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;
  if (password.length < 12 || new TextEncoder().encode(password).length > 256) {
    return error("Password must be between 12 and 256 bytes.", 400);
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordHash = await derivePassword(password, salt);
  const userId = crypto.randomUUID();
  try {
    await env.DB.prepare(
      "INSERT INTO users (id, email, password_hash, password_salt) VALUES (?, ?, ?, ?)",
    )
      .bind(userId, email, encodeBase64(passwordHash), encodeBase64(salt))
      .run();
  } catch {
    const duplicate = await env.DB.prepare("SELECT 1 AS found FROM users WHERE email = ?").bind(email).first();
    if (duplicate) return error("An account with that email already exists.", 409);
    throw new Error("Account could not be created.");
  }

  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(tokenHash, userId, expiresAt)
    .run();

  const headers = new Headers({ "Set-Cookie": cookieHeader(request, token, SESSION_SECONDS) });
  return json({ user: { id: userId, email } }, 201, headers);
}

async function login(request: Request, env: Env): Promise<Response> {
  const body = await parseJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string") {
    return error("Enter your email address and password.", 400);
  }

  const user = await env.DB.prepare("SELECT id, email, password_hash, password_salt FROM users WHERE email = ?")
    .bind(body.email.trim().toLowerCase())
    .first<UserRow>();
  const salt = user ? decodeBase64(user.password_salt) : DUMMY_SALT;
  const submittedHash = await derivePassword(body.password, salt);
  const passwordMatches = user
    ? sameBytes(submittedHash, decodeBase64(user.password_hash))
    : false;
  if (!user || !passwordMatches) return error("Email or password is incorrect.", 401);

  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(tokenHash, user.id, expiresAt)
    .run();
  const headers = new Headers({ "Set-Cookie": cookieHeader(request, token, SESSION_SECONDS) });
  return json({ user: { id: user.id, email: user.email } }, 200, headers);
}

async function logout(request: Request, env: Env): Promise<Response> {
  const token = cookieValue(request);
  if (token) {
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  }
  const headers = new Headers({ "Set-Cookie": cookieHeader(request, "", 0) });
  return json({ ok: true }, 200, headers);
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

  const user = await currentUser(request, env);
  if (path === "/api/auth/me" && method === "GET") {
    return user ? json({ user }) : error("Authentication required.", 401);
  }
  if (!user) return error("Authentication required.", 401);

  if (path === "/api/tasks" && method === "GET") return listTasks(request, env, user);
  if (path === "/api/tasks" && method === "POST") return createTask(request, env, user);
  if (path === "/api/tasks/stats" && method === "GET") return taskStats(env, user);

  const taskMatch = path.match(/^\/api\/tasks\/([\da-f-]+)$/i);
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
      } catch {
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

