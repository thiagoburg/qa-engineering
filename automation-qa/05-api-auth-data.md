# Automation QA 5: API, Authentication, and Test Data

## Introduction

API checks are quick for rules and error responses. UI checks prove a user workflow. Combining them thoughtfully gives evidence without making every test slow.

## Learning objectives

- Send API requests with Playwright's `request` fixture.
- Assert status and response data.
- Handle authentication state safely.
- Keep test data isolated and make cleanup reliable.

## Concise theoretical explanation

Playwright's API request fixture can call an endpoint and return a response. Check both status and body: a `200` with another user's data is still a failure. Keep API checks independent of UI styling; keep a smaller UI journey for browser integration.

Authentication can be established through the UI or API. Browser `storageState` can reuse a session, but it contains credentials/tokens and must be generated for test use, ignored by Git, and never uploaded as an artifact. TaskFlow uses an HTTP-only cookie; page JavaScript cannot read it. Do not try to extract or log it. The simplest safe approach for early exercises is a fresh invented account and sign-in in each test. Later, reuse state only if you can explain its lifecycle.

Isolation means one test cannot change another test's result. Use unique task titles and accounts or a local test reset that is guaranteed not to reach remote D1. Cleanup in `finally`/teardown should remove only test-created local data. Avoid depending on row IDs that another run can reuse.

## Practical examples

```ts
test('task list requires authentication', async ({ request }) => {
  const response = await request.get('/api/tasks');
  expect(response.status()).toBe(401);
});
```

For an authenticated call, create a test account through the supported flow and retain its session only for that run. Assert returned task ownership through visibility and API shape; never print the cookie.

## Guided practice

1. Read the API contract and list one success, one validation failure, and one access-control check.
2. Write API tests for health and unauthenticated task access.
3. Add a task validation test with a boundary input and assert both status and error body.
4. Create a per-run unique task title; ensure a rerun does not collide with prior test data.
5. If exploring storage state, confirm its path is ignored by Git and cleanup removes it after the run.

## Assignment

**Tools:** Playwright `request` fixture and local TaskFlow. **Deliverable:** `automation-qa/submissions/api-auth.spec.ts` with three API checks (health, unauthenticated access, invalid task input) plus one authenticated data-isolation check, and a note explaining test-data lifecycle. **Submission location:** `automation-qa/submissions/`.

## Definition of Done

- Each check asserts status and relevant response data.
- Authenticated and unauthenticated behavior are distinguished.
- Data is unique or cleaned up safely; no remote reset is used.
- Logs and artifacts contain no passwords, session cookies, or access tokens.

## Submission instructions

Run against local D1 only and save the report alongside the spec. Share the files for review. If auth cannot be established in the selected fixture, document the blocker and revise the setup rather than weakening the assertion.

## Optional extra credit

Compare API setup with UI setup for one scenario and describe the best layer for the assertion and why.
