# TaskFlow API

The API is same-origin, JSON-based, and defined by [PRODUCT_SPEC.md](PRODUCT_SPEC.md). Protected routes require the HTTP-only access-token cookie set during registration or sign-in. Supabase Auth verifies the token; D1 stores only the Supabase user ID and email mapping. No CORS access is enabled.

## Endpoints

| Method | Path | Auth | Success |
| --- | --- | --- | --- |
| GET | `/api/health` | No | `200 {"status":"ok"}` |
| POST | `/api/auth/register` | No | `201 {"user":{"id":"…","email":"…"}}`; or `202 {"confirmationRequired":true}` |
| POST | `/api/auth/login` | No | `200 {"user":{"id":"…","email":"…"}}` |
| POST | `/api/auth/logout` | No | `200 {"ok":true}` |
| GET | `/api/auth/me` | Yes | `200 {"user":{"id":"…","email":"…"}}` |
| GET | `/api/tasks?status=all\|active\|completed` | Yes | `200 {"tasks":[…]}` |
| POST | `/api/tasks` | Yes | `201 {"task":…}` |
| PATCH | `/api/tasks/:id` | Yes | `200 {"task":…}` |
| DELETE | `/api/tasks/:id` | Yes | `204` with no body |
| GET | `/api/tasks/stats` | Yes | `200 {"total":0,"completed":0,"active":0}` |

## Request examples

Send `Content-Type: application/json` on JSON requests.

Create an account:

```json
{"email":"qa@example.com","password":"Practice-only-456!"}
```

Create a task:

```json
{"title":"Check task filtering","description":"Verify active and completed views."}
```

Update a task:

```json
{"completed":true}
```

## Errors

Errors use `{ "error": "A short user-facing message." }`. Common statuses are `400` for invalid input, `401` for missing/invalid authentication, `404` for a missing task or API route, and `409` for an already registered email. Do not include passwords, session tokens, SQL details, or stack traces in a response.

## Authentication configuration

The Worker requires `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Use `.dev.vars.example` for local setup and keep real project values in the ignored `.dev.vars` file or Cloudflare environment variables. Never use a Supabase secret or service-role key in this app. Use invented, syntactically valid example addresses such as `qa@example.com`. For training accounts to sign in immediately, disable email confirmation in the Supabase Auth email provider settings; if confirmation remains enabled, registration returns `202` and the interface asks the user to confirm their email.

## Practice safety

Use invented data. Postman collections and screenshots must not contain real credentials or personal information. The local database reset affects only Wrangler's local D1 state.


