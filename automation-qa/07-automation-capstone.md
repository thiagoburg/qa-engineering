# Automation QA 7: TaskFlow Automation Capstone

## Theory

Automation capstone quality is measured by trustworthy evidence and maintainability, not test count. Select stable, repeatable high-risk checks; use API checks for contract/validation behavior and UI checks for a few critical user journeys. Use accessible locators, web-first assertions, unique data, and explicit setup. Keep a manual exploratory list for judgments automation cannot make.

The suite should run locally with the project scripts and in GitHub Actions. A test should fail when the specified behavior is wrong and pass when it is correct. If TaskFlow differs from the Product Specification, report the mismatch and preserve evidence; do not weaken an assertion to match the observed behavior. Protect auth state, environment configuration, and test data.

An efficient suite may include health, unauthenticated access, title validation, task creation/complete/filter, persistence after reload, and account isolation. Avoid rechecking the same condition at every layer unless the extra evidence justifies its runtime and maintenance.

## Practice

1. **Create the capstone files.** Create `taskflow-qa-lab/tests/learner-capstone.spec.ts`. Create `automation-qa/submissions/capstone/` and these files: `strategy-matrix.md`, `manual-only-checks.md`, `run-instructions.md`, `execution-summary.md`, and `ci-reliability-review.md`. In `strategy-matrix.md`, add a table with columns `check | specification requirement | risk | layer (API/UI/manual) | rationale | setup/data/isolation | assertion | cleanup`. Add headings `## Manual checks and human judgment` to `manual-only-checks.md`, `## Commands and environment` to `run-instructions.md`, `## Results and diagnosis` to `execution-summary.md`, and `## CI result and reliability limits` to `ci-reliability-review.md`.
2. **Select and map candidates.** Use your Manual QA capstone to select 8–12 high-risk checks. Add one row per check to the table in `strategy-matrix.md`, filling `check`, `specification requirement`, `risk`, `layer`, and `rationale`.
3. **Plan data and manual checks.** For each automated row in `strategy-matrix.md`, fill `setup/data/isolation`, `assertion`, and `cleanup`. Under `## Manual checks and human judgment` in `manual-only-checks.md`, list checks left manual and the human judgment each requires.
4. **Build the suite.** In `learner-capstone.spec.ts`, implement API checks first and then two high-value UI journeys. Use local Worker/D1, accessible locators, awaited assertions, and no arbitrary sleeps. Ensure at least eight meaningful automated API/UI checks map to the matrix.
5. **Run and diagnose.** Run each case alone and the suite, then typecheck and GitHub Actions. Under `## Commands and environment` in `run-instructions.md`, record commands and environment. Under `## Results and diagnosis` in `execution-summary.md`, record results, failures/diagnoses, artifacts, coverage, and untested behavior. Under `## CI result and reliability limits` in `ci-reliability-review.md`, record the CI result and reliability limits.
6. **Review the portfolio package.** Confirm each automated check maps to a requirement/risk and can be repeated. In `strategy-matrix.md`, add links to the learner-authored test file and submission documents. Remove passwords, cookies, tokens, and personal data from every file and artifact.
