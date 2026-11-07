# Automation QA 5: API, Authentication, and Test Data

## Theory

Playwright Test provides **fixtures**, ready-to-use tools for each test. Its `request` fixture sends API calls without depending on page layout. Check both status and response data: a 200 response containing another user's task is still a failure.

An authenticated API check also needs a session. TaskFlow stores its session in an HTTP-only cookie, which page JavaScript cannot read. To exercise a protected route, sign in an invented account in the test browser and use that page's request context so the browser's cookie is sent with the API request. Never extract, print, or copy the cookie into a report. A saved browser storageState can reuse a session, but it contains authentication data; keep it ignored by Git and never upload it. For early tests, signing in with a fresh account is easier to understand.

**Test data isolation** means one test cannot change another test's result. Use a new account or unique task title for each run, or use a reset that is guaranteed to target local D1 only. Cleanup should remove only data the test created. Do not rely on a database ID that another test or earlier run might reuse.

For example, an unauthenticated GET to the task list should return 401. For an authenticated check, sign in, create a task, and verify that the same account can see it while another account cannot. Keep a smaller UI test as evidence that the browser workflow works; API checks do not prove the page displays the result correctly.

## Practice

1. **Create code and notes.** From the repository root, create `taskflow-qa-lab/tests/learner-api-auth.spec.ts` with an empty Playwright test. Create `automation-qa/submissions/api-auth-notes.md` with exact headings `## Cases`, `## Account isolation`, and `## Data lifecycle`. Under `## Cases`, add a table with columns `case | expected status | expected response data | observed result`.
2. **Write expected API outcomes.** Read the app README’s [API Reference](../taskflow-qa-lab/README.md#api-reference) and [Product Specification](../taskflow-qa-lab/README.md#product-specification). Under `## Cases`, add rows for health success, unauthenticated task access, and invalid task input.
3. **Implement public-route checks.** In the test file, use Playwright’s request fixture to check health and unauthenticated task access. Assert status and useful response data. In the matching rows under `## Cases`, record which response fields/status your assertions check.
4. **Implement validation and isolation.** Add a test for invalid task input. Copy `register`, `uniqueEmail`, the practice password constant, and the `Page` type import from `taskflow-qa-lab/tests/taskflow.spec.ts`. Sign in one invented user in one browser context, create/read a task with that page’s request context, then sign in a second invented user in a separate context and verify it cannot read the first task. Under `## Account isolation`, record each setup and expected/observed outcome; never copy or print session cookies.
5. **Protect test data.** Use unique data and cleanup that targets only test-created local records. Under `## Data lifecycle`, describe how the test creates, isolates, and cleans up data. Confirm saved auth state is ignored by Git; do not put passwords, cookies, or tokens in notes or logs.
6. **Run and report.** From `taskflow-qa-lab`, run each learner test alone, then run the full suite. Add command and observed result to the matching row under `## Cases` or `## Account isolation`. Keep the test file in `taskflow-qa-lab/tests/` so local runs and CI discover it.
