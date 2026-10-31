# Deployment Readiness

Deployment comes after local verification. Do not publish a Worker until the public repository exists, the Cloudflare account is connected, and a separate preview D1 database is available.

## Required separation

- `main` is the only production deployment branch.
- Pull request previews must bind to a separate preview D1 database; never allow a preview to write to production data.
- The stable app and training releases must not share user data.
- Use invented practice accounts only. This app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare's Git integration for deployment.

## Password-hash CPU check

The application uses 600,000 PBKDF2-HMAC-SHA-256 iterations, matching the current OWASP recommendation. Cloudflare Workers Free currently allows 10 ms CPU per HTTP request; an authentication request may exceed that limit. Verify registration and sign-in on the intended account before exposing the URL. If the Worker exceeds the Free CPU limit, do not weaken the hash. Use a reviewed paid CPU allowance or choose another suitable authentication architecture. No paid resources are created by this repository.

## Release checklist

1. Create the production and preview D1 databases and record their IDs in the deployment environment; do not commit credentials.
2. Configure Cloudflare Workers Builds for `main`, with a distinct preview binding and branch previews.
3. Apply migrations to each intended database using the correct environment.
4. Verify registration, sign-in, sign-out, task CRUD, validation, filtering, persistence, API responses, and account isolation on the preview URL.
5. Confirm the Playwright workflow is green before merging to `main`.
6. Verify the public production URL and document the live build. Do not include test passwords or personal data in evidence.
