# Manual QA 6: API Testing with HTTP and Postman

## Introduction

An API lets software exchange data without using the page controls. Testing it directly can isolate whether a problem is in the interface, the API, or both.

## Learning objectives

- Build and inspect HTTP requests in Postman.
- Select methods, headers, query parameters, and JSON bodies.
- Check status codes, response data, and error behavior.
- Test authentication and user isolation without exposing secrets.

## Concise theoretical explanation

HTTP is a request/response protocol. A request includes a method, URL, headers, and sometimes a body. `GET` reads, `POST` creates or submits, `PATCH` partially updates, and `DELETE` removes. A **header** carries metadata, such as `Content-Type: application/json`. A **query parameter** filters a URL, e.g. `?status=active`. JSON is a structured text body.

Common statuses here: `200` success, `201` created, `204` success with no response body, `400` invalid input, `401` not authenticated, and `404` missing or not-owned resource. A status alone is not enough: check the response shape and side effects. Postman collections can save requests; environments hold base URLs and variables. Do not save real credentials, access tokens, or secrets in a shared collection.

TaskFlow's [API Reference](../taskflow-app/README.md#api-reference) documents the routes; [PRODUCT_SPEC.md](../taskflow-app/PRODUCT_SPEC.md) defines expected behavior. Test one request at a time, vary one important condition, and record response status/body plus the resulting app state.

## Practical examples

`GET /api/tasks?status=active` should return only the signed-in user's active tasks. `POST /api/tasks` needs JSON such as `{"title":"Review release"}` and should return `201`. A request after logout should return `401`; deleting an existing task should return `204` with no body.

## Guided practice

1. Install/open Postman and create a collection named `TaskFlow QA Lab — local`.
2. Set a collection variable `baseUrl` to `http://localhost:8787`; use `{{baseUrl}}/api/health` to confirm connectivity.
3. Register a reserved dummy email using a password created only for this local exercise. Keep credentials in a local-only variable and do not export/share it.
4. Send requests for current user, create task, list filters, stats, update, delete, invalid title, unknown filter, and unauthenticated access. Use the app's authentication flow/cookie handling rather than copying a token into a report.
5. Compare method, URL, request body, status, response JSON, and database-visible behavior to the docs.

## Assignment

**Tools:** Postman and TaskFlow API documentation. **Deliverable:** `manual-qa/submissions/taskflow-api-checks.md` with a sanitized collection outline or screenshots, at least eight request/expected/observed rows spanning success and errors, and a short conclusion on what the API evidence localizes. Do not submit credentials or token-bearing headers. **Submission location:** `manual-qa/submissions/`; share for review.

## Definition of Done

- At least eight cases include route, method, input, expected status/shape, observed status/shape, and result.
- Coverage includes create/read/update/delete, validation, and unauthenticated access.
- Evidence contains no credentials, tokens, or real user data.
- `204` is checked as an empty response and user ownership is considered.

## Submission instructions

Save the sanitized report under `manual-qa/submissions/`. Share the report and, only if safe, a collection export with all secrets removed. Correct any mismatch before calling the checks complete.

## Optional extra credit

Add a Postman assertion that checks one stable response property and explain what the assertion still cannot prove.
