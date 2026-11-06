# Automation QA 7: TaskFlow Automation Capstone

## Theory

Automation capstone quality is measured by trustworthy evidence and maintainability, not test count. Select stable, repeatable high-risk checks; use API checks for contract/validation behavior and UI checks for a few critical user journeys. Use accessible locators, web-first assertions, unique data, and explicit setup. Keep a manual exploratory list for judgments automation cannot make.

The suite should run locally with the project scripts and in GitHub Actions. A test should fail when the specified behavior is wrong and pass when it is correct. If TaskFlow differs from the Product Specification, report the mismatch and preserve evidence; do not weaken an assertion to match the observed behavior. Protect auth state, environment configuration, and test data.

An efficient suite may include health, unauthenticated access, title validation, task creation/complete/filter, persistence after reload, and account isolation. Avoid rechecking the same condition at every layer unless the extra evidence justifies its runtime and maintenance.

## Practice

1. **Select candidates.** Use your completed Manual QA capstone and choose 8–12 checks by risk. Map each to a product requirement and classify it as API, UI, or manual.
2. **Plan data and coverage.** For each automated check, define setup, unique data/isolation, assertion, and cleanup. Keep checks that require human judgment in a manual list.
3. **Build the suite.** Add API checks first, then two high-value UI journeys in `taskflow-qa-lab/tests/learner-capstone.spec.ts`. Use TypeScript, Playwright Test, and local Worker/D1; avoid arbitrary sleeps.
4. **Run and diagnose.** Run each check alone and as a suite, then run typecheck and the GitHub Actions workflow. Investigate a failure; if all are green, state exactly what you checked and what remains untested.
5. **Review evidence.** Inspect reports/logs and remove any credential, cookie, token, or private data. Keep the test suite reproducible on another run.
6. **Submit the portfolio package.** Save `automation-qa/submissions/capstone/` with a strategy matrix linked to the learner suite, manual-only checks, run instructions, execution summary, and CI/reliability review. Include at least eight meaningful API/UI checks across the suite and document limitations.
