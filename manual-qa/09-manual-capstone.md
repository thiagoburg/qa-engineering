# Manual QA 9: TaskFlow Manual QA Capstone

## Theory

A capstone is a practical assessment, not a memory quiz. Start with the requirement source, decide what matters most, record what you tested, and report what remains unknown. Use the Product Specification as the source for expected behavior when reporting release results. If you find a mismatch, document the exact build, steps, and evidence; do not alter expected behavior to match the app.

For this checkpoint, a useful set covers critical user journeys and failure conditions: registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Prioritize authentication, data loss, and cross-account exposure above minor presentation issues. Use local D1 and invented accounts. Avoid remote destructive testing or real credentials. Report observed mismatches against the Product Specification; “none observed” is acceptable when supported by the scope and evidence.

The final report separates **executed**, **passed**, **failed**, **blocked**, and **not run**. A check is **Blocked** when something prevents completing it; it is **Not run** when it was deliberately not attempted. Residual risk is specific: what behavior or environment remains untested and why it matters.

Journey: register → create task → complete → filter completed → reload → sign out → sign in → confirm persistence. Add invalid title and second-account isolation checks as separate cases; a happy path alone does not cover these risks.

## Practice

1. **Prepare the capstone files.** Create `manual-qa/submissions/capstone/`. Copy the test-plan template to `test-plan.md`, test-case template to `test-cases.csv`, and execution template to `execution.csv`. Create `release-summary.md` with headings `## Results`, `## Coverage`, and `## Remaining risk`. Create `bug-reports/none-observed.md` containing `Placeholder: replace this note if a defect is observed.`
2. **Set environment and scope.** Start TaskFlow from `main` with local D1 and invented accounts. In `test-plan.md`, fill `**Version/build:**` and `**Approach**` with app version, browser, viewport, test data, and local reset boundaries. Use the [Product Specification](../taskflow-qa-lab/README.md#product-specification) to fill `**Scope**` and rank risks in `## Objective and risks`.
3. **Design the cases.** In `test-cases.csv`, add at least 20 risk-focused cases covering registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Include valid, invalid, boundary, state, API, persistence, and isolation cases. In the plan’s `**Out of scope:**` field, explain justified exclusions.
4. **Execute safely.** Use Developer Tools, Postman, and local read-only D1 queries where useful. For each case, add its result and evidence to the matching `execution.csv` row. Never use Preview or production for destructive checks. Mark Blocked if something prevented completion; mark Not run if you deliberately skipped a case and explain why in its row.
5. **Report findings and limits.** For every observed mismatch, replace the placeholder with a sanitized report based on the bug-report template, one file per defect in `bug-reports/`. If none are observed, keep `none-observed.md` and replace its text with the tested scope and a statement that no mismatch was observed within that scope. Fill `release-summary.md`: counts and open findings under `## Results`, tested areas under `## Coverage`, and untested areas/remaining risk under `## Remaining risk`. Do not claim that no defects exist.
