# Manual QA 9: TaskFlow Manual QA Capstone

## Theory

A capstone is a practical assessment, not a memory quiz. Start with the requirement source, decide what matters most, record what you tested, and report what remains unknown. Use the product specification as the release oracle. If you find a mismatch, document the exact build, steps, and evidence; do not alter expected behavior to match the app.

For this checkpoint, a useful set covers critical user journeys and failure conditions: registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Prioritize authentication, data loss, and cross-account exposure above minor presentation issues. Use local D1 and invented accounts. Avoid remote destructive testing or real credentials. Report observed mismatches against the Product Specification; “none observed” is acceptable when supported by the scope and evidence.

The final report separates **executed**, **passed**, **failed**, **blocked**, and **not run**. A check is **Blocked** when something prevents completing it; it is **Not run** when it was deliberately not attempted. Residual risk is specific: what behavior or environment remains untested and why it matters.

Journey: register → create task → complete → filter completed → reload → sign out → sign in → confirm persistence. Add invalid title and second-account isolation checks as separate cases; a happy path alone does not cover these risks.

## Practice

1. **Set the environment.** Complete earlier Manual QA lessons. Start TaskFlow on `main` with local D1 and invented accounts. Record app version, browser, and viewport in your plan.
2. **Set scope and risks.** Use the [Product Specification](../taskflow-qa-lab/README.md#product-specification) and [test plan template](templates/test-plan-template.md). Prioritize risks and define test data and reset boundaries before execution.
3. **Design coverage.** Use the [test case template](templates/test-case-template.csv) to create at least 20 risk-focused cases across registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Include valid, invalid, boundary, state, API, persistence, and isolation checks; explain exclusions.
4. **Execute safely.** Use browser DevTools, Postman, and local read-only D1 queries where useful. Record actual results and evidence. Do not use Preview/production for destructive actions. Mark **Blocked** if you cannot complete a check and **Not run** if you choose not to attempt it; explain both.
5. **Report findings.** Use the [bug report template](templates/bug-report-template.md) for observed mismatches. If none are observed, say so and describe the tested scope; do not claim there are no defects. Retest a fix only if one is available.
6. **Submit the capstone.** Create `manual-qa/submissions/capstone/` containing `test-plan.md`, `test-cases.csv`, `execution.csv`, `bug-reports/` (or an explicit “none observed” note), and `release-summary.md`. Include coverage, execution counts, open findings, and remaining risk in the summary. This capstone is independent practice; earlier lessons provide the methods, but not the answers.
