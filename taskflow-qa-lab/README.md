# TaskFlow QA Lab

A small task manager used for manual and automated QA practice.

## Requirements

- Node.js 20 or later
- npm

## Run locally

From this folder:

```powershell
npm ci
npm run db:migrate:local
npm run dev
```

The repository's `wrangler.jsonc` contains the public Supabase project URL and publishable key needed by the app. A `.dev.vars` file is optional; create one from `.dev.vars.example` only when you need local overrides, then replace both placeholder values. Never put a Supabase secret or service-role key in `.dev.vars`. Supabase Auth manages account credentials; TaskFlow D1 stores the account ID/email mapping and tasks. Open the local address printed by Wrangler (normally `http://localhost:8787`). The local D1 database is separate from the Cloudflare databases. Use invented training accounts; do not enter real credentials or personal information.

To delete local training rows while keeping the schema, run:

```powershell
npm run db:reset:local
```

The reset command is hard-coded to Wrangler's local database mode and does not accept a remote database or extra flags.

## Read-only local D1 queries

Run queries from this `taskflow-qa-lab` folder. The `DB` name below is the local D1 binding from `wrangler.jsonc`; `--local` ensures Wrangler uses the local training database. For example, to inspect a dummy account's tasks:

```powershell
npm exec wrangler -- d1 execute DB --local --command "SELECT id, title, completed, user_id FROM tasks WHERE user_id = (SELECT id FROM users WHERE email = 'qa@example.com');"
```

Replace `qa@example.com` with the invented email you used in TaskFlow. Use only `SELECT` queries in this lesson; never add `--remote` or `--preview`. The current schema is produced by applying the migrations in order: `0001_initial_schema.sql` shows the original account and task tables, and `0002_supabase_auth.sql` removes the password and session tables now managed by Supabase Auth. TaskFlow keeps the user's ID and email mapping plus tasks in D1.

## Run checks

```powershell
npm run typecheck
npm test
```

The Playwright suite launches a local Worker, local D1 binding, and a test-only mock of the Supabase Auth API. It does not require Supabase credentials, deploy, or contact a production database. The mock is used only by the test stack.

Each test run labels its own accounts and removes only that run's matching rows from local D1 after the suite. Learner-created local practice data is preserved. This cleanup always uses Wrangler's `--local` mode.

## API and product behavior

See [Product Specification](#product-specification). Migrations are versioned under `migrations/`.

## Deployment status

The Preview Worker is live at `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev`; production is live at `https://taskflow-qa-lab.taskflow-qa-lab.workers.dev`. Each has a separate D1 database. Preview API checks for auth, validation, task workflows, persistence, and account isolation passed with dummy data. Cloudflare Workers Builds is connected to deploy `main`; GitHub Actions runs the test suite. See the Deployment section below for environment details. This project is for invented training data only.

---

## API Reference

The API is same-origin, JSON-based, and defined by [Product Specification](#product-specification). Protected routes require the HTTP-only access-token cookie set during registration or sign-in. Supabase Auth verifies the token; D1 stores only the Supabase user ID and email mapping. No CORS access is enabled.

## Endpoints

| Method | Path | Auth | Success |
| --- | --- | --- | --- |
| GET | `/api/health` | No | `200 {"status":"ok"}` |
| POST | `/api/auth/register` | No | `201 {"user":{"id":"…","email":"…"}}`; or `202 {"confirmationRequired":true}` |
| POST | `/api/auth/login` | No | `200 {"user":{"id":"…","email":"…"}}` |
| POST | `/api/auth/logout` | No | `200 {"ok":true,"providerRevoked":true\|false}`; the TaskFlow cookie is cleared either way |
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

The Worker requires `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. These are public client configuration values defined in `wrangler.jsonc`; local `.dev.vars` may override them and is ignored by Git. Never use a Supabase secret or service-role key in this app. Use invented, syntactically valid example addresses such as `qa@example.com`. For training accounts to sign in immediately, disable email confirmation in the Supabase Auth email provider settings; if confirmation remains enabled, registration returns `202` and the interface asks the user to confirm their email.

## Practice safety

Use invented data. Postman collections and screenshots must not contain real credentials or personal information. The local database reset affects only Wrangler's local D1 state.

---

## Deployment and Environment Notes

TaskFlow uses Cloudflare Workers and D1 for the app and task data. Supabase Auth manages account passwords and access tokens. Preview is live at `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev`; production is live at `https://taskflow-qa-lab.taskflow-qa-lab.workers.dev`. Each environment has its own D1 database. Both health endpoints last returned `200 {"status":"ok"}` when checked on November 2, 2026; live status can change.

## Supabase Auth setup

1. The Supabase Free project is already created. Its project URL and publishable key are public configuration values in `wrangler.jsonc`; local `.dev.vars` may override them and is ignored by Git. Never add a Supabase secret or service-role key to this app or repository.
2. At the last settings check on October 31, 2026, email sign-up was enabled and Confirm Email was disabled for practice accounts. Check the current Supabase Auth settings before relying on this; with confirmation enabled, use an email address you can access. Use only dummy data.
3. Use invented, syntactically valid example addresses such as `qa@example.com` and practice-only passwords. Do not enter real personal information. Email delivery limits and setup can change; check current Supabase guidance if confirmation emails are needed.
4. On October 31, 2026, live Preview API checks passed for registration, current user, login/logout, invalid input, task create/edit/complete/delete, filtering, statistics, persistence across sign-in, and account isolation. Temporary task rows were deleted. Test Auth identities use reserved example addresses and have no usable mailbox.
5. Production's two D1 migrations have been applied, and the Worker has been deployed and health-checked. Cloudflare Workers Builds is connected to `thiagoburg/qa-engineering`. Its root directory is `taskflow-qa-lab`, matching this folder. The integration uses `main` as the production branch, `npx wrangler deploy` as the deploy command, and `npx wrangler preview` as the Preview command. Preview builds are enabled. The first `main` push after connection triggered a production deployment, and its health check passed.

The Cloudflare dashboard configuration above was last reviewed on October 31, 2026. Check the current Worker settings before changing deployment behavior.

Provider pricing, quotas, and inactivity policies can change. Check [current Supabase pricing and limits](https://supabase.com/pricing) before relying on hosted practice; local automated tests use a test-only auth mock and do not depend on the hosted Supabase project.

## Cloudflare environments

- `main` is the only production deployment branch and binds the production D1 database.
- Worker Previews use the separate preview D1 database configured under `previews` in `wrangler.jsonc`.
- The `preview` Wrangler environment exists so `wrangler d1 migrations apply DB --remote --env preview` targets only the preview database.
- The local reset command is hard-coded to `--local`; it cannot target either Cloudflare database.
- Use local D1 and invented practice accounts for exercises; the public app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare Workers Builds for deployment.

## Release status

- Preview API checks passed on October 31, 2026 for auth, validation, task workflows, filtering, statistics, persistence, and account isolation. Temporary task rows were removed.
- Production D1 migrations are applied. Production and Preview health endpoints returned `200` when checked on November 2, 2026. Production user workflows have not been exercised; continue those checks on Preview.
- GitHub Actions tests the code and retains failure artifacts. Cloudflare Workers Builds deploys commits from `main` and creates Preview builds for branches and pull requests.
- Do not use real personal data. The public app is a practice environment, not a production service with user-data support.

---

## Manual QA practice

Use the app from `main` with local D1 for all Manual QA exercises. Compare observed behavior with the [Product Specification](#product-specification), preserve factual evidence, and use invented accounts. Do not use the public Preview or production database for destructive test runs.

---

### Product Specification

This section is the source of truth for expected behavior. If the app and this document disagree, record the difference as a defect; do not silently change an expectation during execution.

### Purpose and audience

TaskFlow is a small practice app for QA learning. Users create invented accounts and manage personal tasks. It is not a production task manager and must not receive real personal or sensitive information.

### Account behavior

- A user can create an account with a valid email and a password from 12 through 256 UTF-8 bytes. Supabase Auth handles credential storage and password verification; TaskFlow never stores the password or its hash.
- Email matching ignores leading/trailing spaces and letter case. Each normalized email belongs to one account.
- Successful registration signs the user in when email confirmation is disabled. If confirmation is enabled, the API returns a confirmation-required response and the interface tells the user to confirm before signing in.
- A user can sign in with the registered email and password.
- Incorrect email/password returns a general authentication error without revealing which field was wrong.
- Sign out clears the TaskFlow cookie and asks Supabase Auth to end the session. The response says whether Supabase confirmed revocation; the interface reports if it could not. A subsequent protected request requires sign-in to TaskFlow.
- The Supabase access token is held in an HTTP-only, same-site cookie for no longer than the token's lifetime. HTTPS responses mark the cookie Secure.
- TaskFlow does not refresh access tokens. After the token expires, the learner must sign in again.

### Task behavior

- Only a signed-in user can list, create, edit, complete, or delete tasks.
- A task has a required title from 1 through 120 Unicode code points after trimming surrounding whitespace and an optional description up to 1,000 Unicode code points after trimming surrounding whitespace. The trimmed text is saved. A standalone emoji counts as one code point; combined emoji may contain several.
- New tasks are active and have an empty description when none is supplied.
- A user can edit a task title and description, mark it completed or active, and delete it.
- A task owned by another account behaves as not found. User A cannot read, update, or delete user B's task.
- Task filters are `all`, `active`, and `completed`; an unknown filter returns a validation error.
- Statistics report that user's total, active, and completed task counts. `active + completed = total`.
- Task data persists after a page reload and a new sign-in.

### API behavior

All API responses use JSON except a successful delete, which returns `204 No Content`.

| Method and path | Expected behavior |
| --- | --- |
| `GET /api/health` | `200` and `{ "status": "ok" }` |
| `POST /api/auth/register` | Validate account input and create account through Supabase Auth; return `201` with a session or `202` when email confirmation is required |
| `POST /api/auth/login` | Create a session, return `200`; invalid credentials return `401` |
| `POST /api/auth/logout` | Clear the TaskFlow cookie and ask Supabase Auth to end the session; return `200` with `providerRevoked: true` when confirmed or `false` when the provider cannot confirm it |
| `GET /api/auth/me` | Return current user or `401` |
| `GET /api/tasks?status=all\|active\|completed` | List only current user's matching tasks |
| `POST /api/tasks` | Validate and create a task, return `201` |
| `PATCH /api/tasks/:id` | Validate and update supplied title, description, and/or completion state |
| `DELETE /api/tasks/:id` | Delete current user's task, return `204` |
| `GET /api/tasks/stats` | Return current user's counts |

Validation failures return `400`; unauthenticated protected requests return `401`; missing or other-user task IDs return `404`. Error messages are visible in the interface and do not contain secrets or stack traces.

### Accessibility and interface behavior

- Every input has a visible programmatic label.
- All account, task, filter, edit, and delete actions work with a keyboard.
- Validation and status messages are visible and announced to assistive technology.
- User-provided task text is displayed as text, never interpreted as HTML.
- The interface reflows for narrow screens and keeps actions available without horizontal scrolling.

### Data and security boundaries

- Supabase Auth stores credentials and issues access tokens. TaskFlow validates tokens with Supabase Auth and stores only the provider user ID and email in D1.
- TaskFlow's access-token cookie is HTTP-only and expires with the provider token; the token is not stored in D1.
- SQL statements bind user input as parameters; task queries always include the authenticated owner ID.
- The app does not implement password reset, MFA, account deletion, or abuse controls. Email confirmation and email delivery are managed by the Supabase project. This is not a production support promise.
- Do not use real credentials, personal data, or confidential data. This is a public practice app only.

### Current implementation scope

The app includes account registration/sign-in/sign-out, task create/edit/complete/delete, filters, counts, local persistence, and the API. Use the Product Specification as the expected-behavior source for manual and automated checks.
