# Deployment Readiness

The public repository and Cloudflare account are connected. Separate preview and production D1 databases have been created and their IDs are recorded in `wrangler.jsonc`. The preview schema is applied. The preview Worker has been uploaded, but its URL is not reachable until a `workers.dev` account subdomain is registered in the Cloudflare dashboard.

## Required separation

- `main` is the only production deployment branch.
- Pull request previews must bind to a separate preview D1 database; never allow a preview to write to production data.
- The stable app and training releases must not share user data.
- Use invented practice accounts only. This app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare's Git integration for deployment.

## Password-hash CPU check

The application uses 600,000 PBKDF2-HMAC-SHA-256 iterations, matching the current OWASP recommendation. Cloudflare Workers Free currently allows 10 ms CPU per HTTP request; an authentication request may exceed that limit. Verify registration and sign-in on the intended account before exposing the URL. If the Worker exceeds the Free CPU limit, do not weaken the hash. Use a reviewed paid CPU allowance or choose another suitable authentication architecture. No paid resources are created by this repository.

## Release checklist

1. Register an account `workers.dev` subdomain in the Cloudflare dashboard so the preview URL resolves.
2. Verify registration and sign-in CPU time, then run the browser/API checks and account-isolation exercise against preview.
3. Configure Cloudflare Workers Builds for `main`, using the production D1 binding for production deployments and the preview binding for branch previews.
4. Apply the migration to production using the production environment only after preview verification.
5. Confirm the Playwright workflow is green before merging to `main`.
6. Verify the public production URL and document the live build. Do not include test passwords or personal data in evidence.

