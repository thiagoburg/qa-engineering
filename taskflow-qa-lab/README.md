# TaskFlow QA Lab

A small task manager used for manual and automated QA practice.

## Requirements

- Node.js 20 or later
- npm

## Run locally

From this folder:

```powershell
npm install
npm run db:migrate:local
npm run dev
```

Open the local address printed by Wrangler (normally `http://localhost:8787`). The local D1 database is separate from the Cloudflare database. Create an invented training account; do not enter real credentials or personal information.

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

The Playwright suite launches a local Worker and uses the local D1 binding. It does not deploy or contact a production database.

## API and product behavior

See [PRODUCT_SPEC.md](PRODUCT_SPEC.md). Migrations are versioned under `migrations/`.

## Deployment status

Deployment is intentionally not configured with live credentials. Before publishing, check the Cloudflare account and Worker CPU limits: OWASP's current PBKDF2-HMAC-SHA-256 recommendation is 600,000 iterations, while Workers Free allows 10 ms CPU per request. Do not lower the password work factor just to fit a limit; use a paid CPU allowance or another reviewed architecture if the deployed hash exceeds the free limit. This project must remain for invented training data only.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the eventual deployment checklist and environment separation requirements.
