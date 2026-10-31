# TaskFlow QA Lab

A small task manager used for manual and automated QA practice.

## Requirements

- Node.js 20 or later
- npm

## Run locally

From this folder:

```powershell
npm install
Copy-Item .dev.vars.example .dev.vars
# Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to .dev.vars
npm run db:migrate:local
npm run dev
```

Create a Supabase project and use its URL and publishable key in `.dev.vars`. Supabase Auth manages account credentials; TaskFlow D1 stores the account ID/email mapping and tasks. Open the local address printed by Wrangler (normally `http://localhost:8787`). The local D1 database is separate from the Cloudflare databases. Use invented training accounts; do not enter real credentials or personal information.

To delete local training rows while keeping the schema, run:

```powershell
npm run db:reset:local
```

The reset command is hard-coded to Wrangler's local database mode and does not accept a remote database or extra flags.

## Run checks

```powershell
npm run typecheck
npm test
```

The Playwright suite launches a local Worker, local D1 binding, and a test-only mock of the Supabase Auth API. It does not require Supabase credentials, deploy, or contact a production database. The mock is used only by the test stack.

## API and product behavior

See [PRODUCT_SPEC.md](PRODUCT_SPEC.md). Migrations are versioned under `migrations/`.

## Deployment status

The Preview Worker is live at `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev` and uses its separate preview D1 database. The Supabase project URL and publishable key are configured for local development and Preview. Live API checks for auth, validation, task workflows, persistence, and account isolation passed with dummy data. See [DEPLOYMENT.md](DEPLOYMENT.md) for the verification notes and remaining production setup. This project is for invented training data only.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the eventual deployment checklist and environment separation requirements.



