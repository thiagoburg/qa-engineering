# Manual QA 8: Defects, Retesting, and Release Reporting

## Theory

A **defect** is a mismatch between an agreed expectation and observed behavior. A report needs a specific title, environment, preconditions, steps, expected result, actual result, and evidence. Keep one issue per report and remove private information.

**Severity** describes impact on the product/user; **priority** describes how soon the team should address it. A crash that blocks all users is likely high in both. A rare typo may be low severity, while a legally required text correction could have high priority. The team owns final triage; explain your rationale rather than assigning labels as facts.

A typical defect flow is New → Triaged → In Progress → Ready for Retest → Closed or Reopened. After a fix, repeat the failing steps (**retest**) and check nearby behavior (**regression**). A release report states scope, environment, execution results, known defects, and residual risk. “No critical failures observed in the tested scope” is more accurate than “the release has no bugs.”

Title: “Completed tasks reappear in Active filter after reload.” Steps identify the account state, task, action, and reload. Expected and actual are separate. A screenshot of the filter plus API response can establish evidence; do not attach a screenshot alone if it hides the reproduction steps.

## Practice

1. Use a discrepancy you observed while testing TaskFlow. If you have not observed one, use a clearly labeled hypothetical example.
2. Fill the [bug report template](templates/bug-report-template.md) with exact steps and expected/actual results.
3. Rank severity and priority separately, with a short reason for each.
4. Treat the report like a team ticket: record its current status, a short triage decision, and what should happen before it can be retested and closed. Add a brief status history for New → Triaged → In Progress → Ready for Retest → Closed or Reopened. Mark future steps as planned or hypothetical unless you actually observed them; do not claim a fix happened when it did not.
5. Define the retest and the smallest adjacent regression set.
6. Complete the [test execution template](templates/test-execution-template.csv) and summarize pass/fail/blocked/not-run counts.

Use the bug report and execution templates; no Jira account or separate tool is needed. Create `manual-qa/submissions/defect-and-release-report.md` with one report (observed or clearly marked hypothetical), severity/priority rationale, ticket status history, retest/regression plan, and a one-page release summary that states scope, environment, counts, open defects, and residual risk.

Save the deliverable in `manual-qa/submissions/`.

Before saving, check that:
- A reader can reproduce the issue without guessing.
- Expected and actual behavior are distinct and traceable.
- Severity and priority have separate rationale.
- Release summary reports scope and limitations without claiming bug-free software.
