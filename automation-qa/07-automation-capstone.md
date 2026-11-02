# Automation QA 7: TaskFlow Automation Capstone

## Theory

Automation capstone quality is measured by trustworthy evidence and maintainability, not test count. Select stable, repeatable high-risk checks; use API checks for contract/validation behavior and UI checks for a few critical user journeys. Use accessible locators, web-first assertions, unique data, and explicit setup. Keep a manual exploratory list for judgments automation cannot make.

The suite should run locally with the project scripts and in GitHub Actions. A test should fail when the specified behavior is wrong and pass when it is correct. If TaskFlow differs from the Product Specification, report the mismatch and preserve evidence; do not weaken an assertion to match the observed behavior. Protect auth state, environment configuration, and test data.

An efficient suite may include health, unauthenticated access, title validation, task creation/complete/filter, persistence after reload, and account isolation. Avoid rechecking the same condition at every layer unless the extra evidence justifies its runtime and maintenance.

## Practice

1. Use the completed Manual QA capstone and choose 8–12 automation candidates by risk.
2. Mark each UI, API, or manual and define data isolation before coding.
3. Implement the API cases first, then two high-value UI journeys in taskflow-qa-lab/tests/learner-capstone.spec.ts.
4. Run each case alone and as a suite, then run typecheck and CI workflow.
5. Investigate one failure or document why the suite is clean; capture trace/screenshot only on failure.
6. Review artifacts and logs for leaked credentials or private data.

Use TypeScript, Playwright Test, local Worker/D1, and GitHub Actions. Keep the executable suite in taskflow-qa-lab/tests/learner-capstone.spec.ts so Playwright and CI can run it. Save automation-qa/submissions/capstone/ with a strategy matrix linking to the suite, manual-only checks, run instructions, execution summary, and CI/reliability review. Include at least eight meaningful API/UI checks with no arbitrary sleeps.


Before saving, check that:
- Every automated case maps to a requirement and risk.
- At least eight checks cover API and UI behavior, including validation and isolation.
- Tests are independent, repeatable, and use safe test data.
- Local run and CI evidence are recorded; failures are diagnosed rather than hidden.
- Manual coverage and suite limitations are explicit.
