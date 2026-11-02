import { randomUUID } from "node:crypto";
import { createServer } from "node:http";

const accounts = new Map();
const sessions = new Map();
const publishableKey = "taskflow-playwright-mock-key";
let failNextLogout = false;

function send(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(body === null ? "" : JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 8_192) throw new Error("Request body too large.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function session(user) {
  const accessToken = randomUUID();
  sessions.set(accessToken, user);
  return { access_token: accessToken, expires_in: 3600, token_type: "bearer", user };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health" && request.method === "GET") {
    send(response, 200, { status: "ok" });
    return;
  }
  if (url.pathname === "/__test/fail-next-logout" && request.method === "POST") {
    failNextLogout = true;
    send(response, 200, { ok: true });
    return;
  }
  if (request.headers.apikey !== publishableKey) {
    send(response, 401, { message: "Invalid API key." });
    return;
  }
  if (url.pathname === "/auth/v1/signup" && request.method === "POST") {
    try {
      const body = await readBody(request);
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (!email || typeof body.password !== "string") {
        send(response, 400, { message: "Email and password are required." });
        return;
      }
      if (accounts.has(email)) {
        send(response, 422, { code: "user_already_exists", msg: "User already registered" });
        return;
      }
      const user = { id: randomUUID(), email };
      accounts.set(email, { ...user, password: body.password });
      if (email.endsWith("@confirm.example.test")) {
        send(response, 200, { user });
        return;
      }
      send(response, 200, session(user));
    } catch {
      send(response, 400, { message: "Invalid request body." });
    }
    return;
  }

  if (url.pathname === "/auth/v1/token" && url.searchParams.get("grant_type") === "password" && request.method === "POST") {
    try {
      const body = await readBody(request);
      const account = typeof body.email === "string" ? accounts.get(body.email.trim().toLowerCase()) : undefined;
      if (!account || account.password !== body.password) {
        send(response, 400, { code: "invalid_credentials", msg: "Invalid login credentials" });
        return;
      }
      const { id, email } = account;
      send(response, 200, session({ id, email }));
    } catch {
      send(response, 400, { message: "Invalid request body." });
    }
    return;
  }

  if (url.pathname === "/auth/v1/user" && request.method === "GET") {
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
    const user = token ? sessions.get(token) : undefined;
    if (!user) {
      send(response, 401, { message: "Invalid token." });
      return;
    }
    send(response, 200, user);
    return;
  }

  if (url.pathname === "/auth/v1/logout" && request.method === "POST") {
    if (failNextLogout) {
      failNextLogout = false;
      send(response, 503, { message: "Temporary auth service failure." });
      return;
    }
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (token) sessions.delete(token);
    send(response, 204, null);
    return;
  }

  send(response, 404, { message: "Not found." });
});

server.listen(8788, "127.0.0.1", () => console.log("Playwright Supabase Auth mock listening on 127.0.0.1:8788"));

