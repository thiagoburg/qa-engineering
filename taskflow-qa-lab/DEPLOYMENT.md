# Deployment Readiness

TaskFlow uses Cloudflare Workers and D1 for the app and task data. Supabase Auth manages account passwords and access tokens. The Cloudflare Preview and separate preview/production D1 databases exist; production remains unpublished until Supabase credentials are configured and the preview flow passes.

## Supabase Auth setup

1. Create a Supabase project on the Free plan and copy its project URL and publishable key.
2. In Auth settings, enable Email and disable email confirmation for this dummy-data training app. If confirmation stays enabled, registration returns `202` and users must confirm through the configured email provider before sign-in.
3. For local development, copy `.dev.vars.example` to `.dev.vars` and enter the project URL and publishable key. `.dev.vars` is ignored by Git.
4. For Cloudflare, configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as Worker environment variables for both production and Previews. Do not add a Supabase secret or service-role key to this project.
5. Keep using invented `example.test` addresses and passwords. Do not enter real personal information.

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

