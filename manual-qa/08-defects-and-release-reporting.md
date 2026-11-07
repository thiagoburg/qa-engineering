# Manual QA 8: Defects, Retesting, and Release Reporting

## Theory

A **defect** is a mismatch between an agreed expectation and observed behavior. A report needs a specific title, environment, preconditions, steps, expected result, actual result, and evidence. Keep one issue per report and remove private information.

**Severity** describes impact on the product/user; **priority** describes how soon the team should address it. A crash that blocks all users is likely high in both. A rare typo may be low severity, while a legally required text correction could have high priority. **Triage** is the team's review of a finding to decide its validity, priority, owner, and next step; explain your reasoning rather than assigning the team's decision as fact.

A test result is **Pass** when observed behavior matches the expectation, **Fail** when it does not, **Blocked** when something prevents completing the check, and **Not run** when the check was deliberately not attempted. A typical defect flow is New → Triaged → In Progress → Ready for Retest → Closed or Reopened. After a fix, repeat the failing steps (**retest**) and check nearby behavior (**regression**). A release report states scope, environment, execution results, known defects, and residual risk. “No critical failures observed in the tested scope” is more accurate than “the release has no bugs.”

Title: “Completed tasks reappear in Active filter after reload.” Steps identify the account state, task, action, and reload. Expected and actual are separate. A screenshot of the filter plus API response can establish evidence; do not attach a screenshot alone if it hides the reproduction steps.

## Practice

1. **Create both work files.** Copy `manual-qa/templates/bug-report-template.md` to `manual-qa/submissions/defect-and-release-report.md`. Copy `manual-qa/templates/test-execution-template.csv` to `manual-qa/submissions/defect-release-execution.csv`. Start with these files and fill them as you go.
2. **Choose a finding.** Use a mismatch you actually observed in local TaskFlow. If you found none, label a hypothetical example clearly; do not describe it as observed. Fill the bug report with environment, preconditions, exact steps, expected/actual results, and sanitized evidence.
3. **Assess impact and urgency.** In the report, give severity (impact on users/system) and priority (how soon the team should act) separately, with a reason for each.
4. **Describe triage and status.** Record a suggested triage decision and the finding's current status. Add a history using New → Triaged → In Progress → Ready for Retest → Closed or Reopened. Mark future steps as planned/hypothetical; never claim a fix occurred if it did not.
5. **Plan retest and release summary.** Describe the retest and smallest nearby regression set in the report. Use the CSV to record execution results and count Pass, Fail, Blocked, and Not run; Blocked means unable to complete, Not run means deliberately not attempted. Add a release summary to the report with scope, environment, counts, open findings, and remaining risk.
