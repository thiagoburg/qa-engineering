# Manual QA 9: TaskFlow Manual QA Capstone

## Theory

A capstone is a practical assessment, not a memory quiz. Start with the requirement source, decide what matters most, record what you tested, and report what remains unknown. Use the Product Specification as the source for expected behavior when reporting release results. If you find a mismatch, document the exact build, steps, and evidence; do not alter expected behavior to match the app.

For this checkpoint, a useful set covers critical user journeys and failure conditions: registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Prioritize authentication, data loss, and cross-account exposure above minor presentation issues. Use local D1 and invented accounts. Avoid remote destructive testing or real credentials. Report observed mismatches against the Product Specification; “none observed” is acceptable when supported by the scope and evidence.

The final report separates **executed**, **passed**, **failed**, **blocked**, and **not run**. A check is **Blocked** when something prevents completing it; it is **Not run** when it was deliberately not attempted. Residual risk is specific: what behavior or environment remains untested and why it matters.

Journey: register → create task → complete → filter completed → reload → sign out → sign in → confirm persistence. Add invalid title and second-account isolation checks as separate cases; a happy path alone does not cover these risks.

## Practice

1. **Create the capstone package.** Create `manual-qa/submissions/capstone/`. Copy the test plan template to `test-plan.md`, test-case template to `test-cases.csv`, and execution template to `execution.csv`. Create `release-summary.md` and a `bug-reports/` folder with `none-observed.md` stating that it is a placeholder to replace if you find a defect. These are your working files; fill them through the steps below.
2. **Set environment and scope.** Start TaskFlow on `main` with local D1 and invented accounts. Record app version, browser, viewport, test data, and reset boundaries in `test-plan.md`. Use the [Product Specification](../taskflow-qa-lab/README.md#product-specification) to set scope and prioritize risks.
3. **Design the cases.** In `test-cases.csv`, create at least 20 risk-focused checks for registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Include valid, invalid, boundary, state, API, persistence, and isolation checks; state justified exclusions in the plan.
4. **Execute safely.** Use browser Developer Tools, Postman, and local read-only D1 queries where useful. Record each result/evidence in `execution.csv`. Do not use Preview/production for destructive actions. Mark Blocked if something prevented completion; mark Not run if you chose not to attempt a check, and explain why.
5. **Report findings and limits.** For each observed mismatch, replace `none-observed.md` with a sanitized report based on the bug report template. If none are observed, keep the note and describe the scope you tested in it. Complete `release-summary.md` with result counts, open findings, coverage, and remaining risk; do not claim that no defects exist.
