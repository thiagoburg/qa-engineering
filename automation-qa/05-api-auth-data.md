# Automation QA 5: API, Authentication, and Test Data

## Theory

Playwright Test provides **fixtures**, ready-to-use tools for each test. Its `request` fixture sends API calls without depending on page layout. Check both status and response data: a 200 response containing another user's task is still a failure.

An authenticated API check also needs a session. TaskFlow stores its session in an HTTP-only cookie, which page JavaScript cannot read. To exercise a protected route, sign in an invented account in the test browser and use that page's request context so the browser's cookie is sent with the API request. Never extract, print, or copy the cookie into a report. A saved browser storageState can reuse a session, but it contains authentication data; keep it ignored by Git and never upload it. For early tests, signing in with a fresh account is easier to understand.

**Test data isolation** means one test cannot change another test's result. Use a new account or unique task title for each run, or use a reset that is guaranteed to target local D1 only. Cleanup should remove only data the test created. Do not rely on a database ID that another test or earlier run might reuse.

For example, an unauthenticated GET to the task list should return 401. For an authenticated check, sign in, create a task, and verify that the same account can see it while another account cannot. Keep a smaller UI test as evidence that the browser workflow works; API checks do not prove the page displays the result correctly.

## Practice

1. **Create your code and report files.** From the repository root, create `taskflow-qa-lab/tests/learner-api-auth.spec.ts` with an empty Playwright test. Create `automation-qa/submissions/api-auth-notes.md` with headings `Cases`, `Account isolation`, and `Data lifecycle`.
2. **Choose the expected behavior.** Read TaskFlow's [API Reference](../taskflow-qa-lab/README.md#api-reference) and Product Specification. Under `Cases`, list a health success, unauthenticated access, and invalid task input with expected status and useful response data.
3. **Implement the public checks.** In the test file, use Playwright's request fixture for health and unauthenticated task access. Assert status and response data; record what each assertion checks under `Cases`.
4. **Add validation and isolation.** Add an invalid task-input check. Copy `register`, `uniqueEmail`, and the practice password constant from `tests/taskflow.spec.ts`; also copy its `Page` type import. Sign in the first invented user in one browser context, create/read a task with that page's request context, then sign in a second invented user in a separate context and verify it cannot read the first task. Record setup and expected outcome under `Account isolation`; never copy or print session cookies.
5. **Protect and run the data.** Use unique test data and cleanup that targets only test-created local data. Explain creation/isolation/cleanup under `Data lifecycle`. Check saved authentication state is ignored by Git and keep passwords, cookies, and tokens out of logs/reports.
6. **Run the checks.** Run each test alone and with the suite. Add observed results to the notes. Keep the source test under `taskflow-qa-lab/tests/` so local runs and CI discover it.
