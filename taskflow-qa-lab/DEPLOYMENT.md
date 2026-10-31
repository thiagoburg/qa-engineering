# Deployment Readiness

The public repository exists, and the Cloudflare account is authenticated. Separate preview and production D1 databases have been created and their IDs are recorded in `wrangler.jsonc`. The preview schema is applied. A Worker Preview is reachable on `workers.dev`, and its health check can query the preview D1 database. Registration and sign-in currently return HTTP 500 because Cloudflare Workers rejects the configured 600,000 PBKDF2 iterations: the runtime reports that counts above 100,000 are unsupported. Increasing the CPU plan alone will not resolve this Web Crypto API limit. Keep production unpublished until authentication uses a suitable supported implementation without lowering the password-hash work factor.

## Required separation

- `main` is the only production deployment branch.
- Pull request previews must bind to a separate preview D1 database; never allow a preview to write to production data.
- The stable app and training releases must not share user data.
- Use invented practice accounts only. This app has no production support or user-data retention guarantee.
- Keep GitHub Actions responsible for tests and artifacts. Use Cloudflare's Git integration for deployment.

## Password-hash CPU check

The application uses 600,000 PBKDF2-HMAC-SHA-256 iterations, matching the current OWASP recommendation. Cloudflare Workers Free currently allows 10 ms CPU per HTTP request; an authentication request may exceed that limit. Verify registration and sign-in on the intended account before exposing the URL. If the Worker exceeds the Free CPU limit, do not weaken the hash. Use a reviewed paid CPU allowance or choose another suitable authentication architecture. No paid resources are created by this repository.

## Release checklist

1. Resolve the PBKDF2 compatibility failure without lowering the password-hash work factor; use a security-reviewed implementation supported by Workers or a suitable authentication service.
2. Run registration, sign-in, sign-out, task CRUD, validation, filtering, persistence, API responses, and account-isolation checks on preview.
3. Connect the Worker to this GitHub repository with Cloudflare Workers Builds, using `main` for production and the isolated `previews` D1 binding for branch previews.
4. Apply the migration to production only after preview verification.
5. Confirm the Playwright workflow is green before merging to `main`.
6. Verify the public production URL and document the live build. Do not include test passwords or personal data in evidence.



