# Automation QA 7: TaskFlow Automation Capstone

## Theory

Automation capstone quality is measured by trustworthy evidence and maintainability, not test count. Select stable, repeatable high-risk checks; use API checks for contract/validation behavior and UI checks for a few critical user journeys. Use accessible locators, web-first assertions, unique data, and explicit setup. Keep a manual exploratory list for judgments automation cannot make.

The suite should run locally with the project scripts and in GitHub Actions. A test should fail when the specified behavior is wrong and pass when it is correct. If TaskFlow differs from the Product Specification, report the mismatch and preserve evidence; do not weaken an assertion to match the observed behavior. Protect auth state, environment configuration, and test data.

An efficient suite may include health, unauthenticated access, title validation, task creation/complete/filter, persistence after reload, and account isolation. Avoid rechecking the same condition at every layer unless the extra evidence justifies its runtime and maintenance.

## Practice

1. **Create your capstone files.** Create `taskflow-qa-lab/tests/learner-capstone.spec.ts`. Create `automation-qa/submissions/capstone/` with `strategy-matrix.md`, `manual-only-checks.md`, `run-instructions.md`, `execution-summary.md`, and `ci-reliability-review.md`. Add headings or tables before starting.
2. **Select candidates.** Use your Manual QA capstone to choose 8–12 high-risk checks. Map each to a Product Specification requirement and mark API, UI, or manual in `strategy-matrix.md`.
3. **Plan implementation and data.** For each automated check, record setup, unique data/isolation, assertion, and cleanup in the matrix. Explain checks kept manual and their human judgment in `manual-only-checks.md`.
4. **Build the suite.** Implement API checks first, then two high-value UI journeys in `learner-capstone.spec.ts`. Use local Worker/D1, accessible locators, awaited assertions, and no arbitrary sleeps.
5. **Run and diagnose.** Run each case alone and as a suite, then run typecheck and GitHub Actions. Record commands, environment, results, failures/diagnoses, and artifacts in `run-instructions.md`, `execution-summary.md`, and `ci-reliability-review.md` as appropriate. If all checks pass, state what was covered and what remains untested.
6. **Review the portfolio evidence.** Ensure at least eight meaningful API/UI checks are present, each maps to a requirement/risk, and the suite is repeatable. Remove passwords, cookies, tokens, and personal data; link the submission docs to the learner-authored test file.
