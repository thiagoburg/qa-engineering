# Deployment Readiness

TaskFlow uses Cloudflare Workers and D1 for the app and task data. Supabase Auth manages account passwords and access tokens. The Preview Worker is deployed at `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev`, uses the isolated preview D1 database, and has the Supabase project URL and publishable key configured. Its public health endpoint returns `200 {"status":"ok"}`. Production is not deployed.

## Supabase Auth setup

1. The Supabase Free project is already created, and its project URL and publishable key are configured locally in ignored `.dev.vars` and on the Cloudflare Preview Worker. Never commit these values or use a Supabase secret or service-role key in this app.
2. Email sign-up is enabled. Confirm Email is currently enabled, so registration requires email confirmation and has not yet been verified end to end. For this dummy-data training app, disable Confirm Email under Authentication → Sign In / Providers → Email. If confirmation remains enabled, registration returns `202` and users must confirm through the email provider before sign-in.
3. Use invented, syntactically valid example addresses such as `qa@example.com` and practice-only passwords. Do not enter real personal information. The hosted project's built-in email service has restrictive delivery limits; custom SMTP is needed for sending confirmation email to arbitrary addresses.
4. Production credentials and deployment remain unconfigured until Preview authentication and product flows have been verified.

Supabase's Free plan currently lists 50,000 monthly active users and pauses projects after a week of inactivity. This is adequate for a learning prototype but means a Preview may need to be resumed after inactivity. See [Supabase pricing](https://supabase.com/pricing).

## Cloudflare environments

- `main` is the only production deployment branch and binds the production D1 database.
- Worker Previews use the separate preview D1 database configured under `previews` in `wrangler.jsonc`.
- The `preview` Wrangler environment exists so `wrangler d1 migrations apply DB --remote --env preview` targets only the preview database.
- The local reset command is hard-coded to `--local`; it cannot target either Cloudflare database.
- The stable app and training releases must not share user/task data. Use invented practice accounts only; the app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare Workers Builds for deployment.

## Release checklist

1. Configure Supabase Auth and its Worker variables for local development and Cloudflare Previews.
2. Apply D1 migrations to Preview with `npm run db:migrate:preview`; verify the schema before publishing Preview builds.
3. Confirm the GitHub Actions workflow is green.
4. Connect the `taskflow-qa-lab` Worker to `thiagoburg/qa-engineering` with Cloudflare Workers Builds. Set the repository root directory to `taskflow-qa-lab`, production branch to `main`, production command to `npx wrangler deploy`, and Preview command to `npx wrangler preview`. Keep automatic production deployment disabled until Preview verification is complete.
5. Enable Preview builds and confirm they use the isolated `previews.d1_databases` binding. Configure the Supabase project URL and publishable key for Preview.
6. Test registration, sign-in, sign-out, task CRUD, validation, filtering, persistence, API responses, and account isolation on a Worker Preview.
7. Apply the D1 migration to production only after Preview verification and immediately before enabling the first production code deployment. Then configure the Supabase project URL and publishable key for production.
8. Enable deployment from `main`, verify the public production URL, and document the live build. Do not include credentials or personal data in evidence.


