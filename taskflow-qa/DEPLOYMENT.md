# Deployment Readiness

TaskFlow uses Cloudflare Workers and D1 for the app and task data. Supabase Auth manages account passwords and access tokens. Preview is live at `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev`; production is live at `https://taskflow-qa-lab.taskflow-qa-lab.workers.dev`. Each environment has its own D1 database. Both health endpoints return `200 {"status":"ok"}`.

## Supabase Auth setup

1. The Supabase Free project is already created. Its project URL and publishable key are public configuration values in `wrangler.jsonc`; local `.dev.vars` may override them and is ignored by Git. Never add a Supabase secret or service-role key to this app or repository.
2. Email sign-up is enabled and Confirm Email is disabled for practice accounts. This lets invented accounts sign in without a mailbox. Use only dummy data; if the project is ever used with real personal data, enable email confirmation and configure appropriate email delivery first.
3. Use invented, syntactically valid example addresses such as `qa@example.com` and practice-only passwords. Do not enter real personal information. The hosted project's built-in email service has restrictive delivery limits; custom SMTP is needed for sending confirmation email to arbitrary addresses.
4. On October 31, 2026, live Preview API checks passed for registration, current user, login/logout, invalid input, task create/edit/complete/delete, filtering, statistics, persistence across sign-in, and account isolation. Temporary task rows were deleted. Test Auth identities use reserved example addresses and have no usable mailbox.
5. Production's two D1 migrations have been applied, and the Worker has been deployed and health-checked. Cloudflare Workers Builds is connected to `thiagoburg/qa-engineering`. Its configured root directory is still `taskflow-qa-lab`; change that setting to `taskflow-qa` before the next deployment. The integration uses `main` as the production branch, `npx wrangler deploy` as the deploy command, and `npx wrangler preview` as the Preview command. Preview builds are enabled. The first `main` push after connection triggered a production deployment, and its health check passed.

Supabase's Free plan currently lists 50,000 monthly active users and pauses projects after a week of inactivity. This is adequate for a learning prototype but means a Preview may need to be resumed after inactivity. See [Supabase pricing](https://supabase.com/pricing).

## Cloudflare environments

- `main` is the only production deployment branch and binds the production D1 database.
- Worker Previews use the separate preview D1 database configured under `previews` in `wrangler.jsonc`.
- The `preview` Wrangler environment exists so `wrangler d1 migrations apply DB --remote --env preview` targets only the preview database.
- The local reset command is hard-coded to `--local`; it cannot target either Cloudflare database.
- The stable app and training releases must not share user/task data. Use invented practice accounts only; the app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare Workers Builds for deployment.

## Release status

- Preview API checks passed on October 31, 2026 for auth, validation, task workflows, filtering, statistics, persistence, and account isolation. Temporary task rows were removed.
- Production D1 migrations are applied, and production health is verified. Production user workflows have not been exercised; continue those checks on Preview.
- GitHub Actions tests the code and retains failure artifacts. Cloudflare Workers Builds deploys commits from `main` and creates Preview builds for branches and pull requests.
- Do not use real personal data. The public app is a practice environment, not a production service with user-data support.






