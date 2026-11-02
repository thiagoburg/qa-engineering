# Automation QA 5: API, Authentication, and Test Data

## Theory

Playwright Test has a request fixture for sending API calls. Use it to check API behavior without depending on page layout. Check both the status and response data: a 200 response containing another user's task is still a failure.

An authenticated API check also needs a session. TaskFlow stores its session in an HTTP-only cookie, which page JavaScript cannot read. To exercise a protected route, sign in an invented account in the test browser and use that page's request context so the browser's cookie is sent with the API request. Never extract, print, or copy the cookie into a report. A saved browser storageState can reuse a session, but it contains authentication data; keep it ignored by Git and never upload it. For early tests, signing in with a fresh account is easier to understand.

**Test data isolation** means one test cannot change another test's result. Use a new account or unique task title for each run, or use a reset that is guaranteed to target local D1 only. Cleanup should remove only data the test created. Do not rely on a database ID that another test or earlier run might reuse.

For example, an unauthenticated GET to the task list should return 401. For an authenticated check, sign in, create a task, and verify that the same account can see it while another account cannot. Keep a smaller UI test as evidence that the browser workflow works; API checks do not prove the page displays the result correctly.

## Practice

1. Read the TaskFlow [API Reference](../taskflow-qa-lab/README.md#api-reference) and Product Specification. Choose a success case, a validation failure, and an access-control check.
2. Write tests for the health route and unauthenticated task access using Playwright's request fixture. Assert status and useful response data.
3. Test invalid task input and check the error status and response body.
4. For the isolation check, create and sign in an invented account in the browser, use that page's request context to create and read a task, then sign in a second invented account and confirm it cannot see the first task.
5. Use unique test data. Keep cleanup local. Check that any saved auth state is ignored by Git, and make sure reports and logs do not expose passwords, cookies, or tokens.
6. Run each test alone and with the suite. Record the results and explain how the test data is created and removed.

Use Playwright Test and local TaskFlow. Create taskflow-qa-lab/tests/learner-api-auth.spec.ts with health, unauthenticated access, invalid task input, and authenticated data-isolation checks. Save automation-qa/submissions/api-auth-notes.md explaining the test-data lifecycle and results.
