# Automation QA 5: API, Authentication, and Test Data

## Theory

Playwright Test has a request fixture for sending API calls. Use it to check API behavior without depending on page layout. Check both the status and response data: a 200 response containing another user's task is still a failure.

An authenticated API check also needs a session. TaskFlow stores its session in an HTTP-only cookie, which page JavaScript cannot read. To exercise a protected route, sign in an invented account in the test browser and use that page's request context so the browser's cookie is sent with the API request. Never extract, print, or copy the cookie into a report. A saved browser storageState can reuse a session, but it contains authentication data; keep it ignored by Git and never upload it. For early tests, signing in with a fresh account is easier to understand.

**Test data isolation** means one test cannot change another test's result. Use a new account or unique task title for each run, or use a reset that is guaranteed to target local D1 only. Cleanup should remove only data the test created. Do not rely on a database ID that another test or earlier run might reuse.

For example, an unauthenticated GET to the task list should return 401. For an authenticated check, sign in, create a task, and verify that the same account can see it while another account cannot. Keep a smaller UI test as evidence that the browser workflow works; API checks do not prove the page displays the result correctly.

## Practice

1. **Select cases.** Read the TaskFlow [API Reference](../taskflow-qa-lab/README.md#api-reference) and Product Specification. Choose one success case, one validation failure, and one account-isolation check.
2. **Test public routes.** In `taskflow-qa-lab/tests/learner-api-auth.spec.ts`, use Playwright's request fixture to check the health route and unauthenticated task access. Assert status and useful response data.
3. **Test validation.** Send invalid task input and assert both the error status and response body against the specification.
4. **Test isolation.** Sign in an invented first account in a browser page, use that page's request context to create and read a task, then use a second invented account and confirm it cannot read the first task. Do not copy or print the session cookie.
5. **Keep data safe.** Use unique test data and cleanup that targets only local test-created data. Check saved auth state is ignored by Git; keep passwords, cookies, and tokens out of reports/logs.
6. **Run and submit.** Run each test alone and with the suite. Save `automation-qa/submissions/api-auth-notes.md` with test results and a simple explanation of how data was created, isolated, and removed.
