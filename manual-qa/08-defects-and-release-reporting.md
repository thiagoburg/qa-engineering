# Manual QA 8: Defects, Retesting, and Release Reporting

## Theory

A **defect** is a mismatch between an agreed expectation and observed behavior. A report needs a specific title, environment, preconditions, steps, expected result, actual result, and evidence. Keep one issue per report and remove private information.

**Severity** describes impact on the product/user; **priority** describes how soon the team should address it. A crash that blocks all users is likely high in both. A rare typo may be low severity, while a legally required text correction could have high priority. **Triage** is the team's review of a finding to decide its validity, priority, owner, and next step; explain your reasoning rather than assigning the team's decision as fact.

A test result is **Pass** when observed behavior matches the expectation, **Fail** when it does not, **Blocked** when something prevents completing the check, and **Not run** when the check was deliberately not attempted. A typical defect flow is New → Triaged → In Progress → Ready for Retest → Closed or Reopened. After a fix, repeat the failing steps (**retest**) and check nearby behavior (**regression**). A release report states scope, environment, execution results, known defects, and residual risk. “No critical failures observed in the tested scope” is more accurate than “the release has no bugs.”

Title: “Completed tasks reappear in Active filter after reload.” Steps identify the account state, task, action, and reload. Expected and actual are separate. A screenshot of the filter plus API response can establish evidence; do not attach a screenshot alone if it hides the reproduction steps.

## Practice

1. **Create the report files.** Copy `manual-qa/templates/bug-report-template.md` to `manual-qa/submissions/defect-and-release-report.md`. Below its existing sections, add headings `## Triage and history`, `## Retest and regression`, and `## Release summary`. Copy `manual-qa/templates/test-execution-template.csv` to `manual-qa/submissions/defect-release-execution.csv`; keep the template unchanged.
2. **Choose and describe a finding.** Use a mismatch you observed in local TaskFlow. If you observed none, label any example `Hypothetical—not observed`. In the copied report, replace each template prompt with the environment, preconditions, exact steps, expected result, actual result, and sanitized evidence for your finding.
3. **Assess impact and urgency.** In the report, fill `**Severity:**` with the user/system impact and `**Priority:**` with how soon the team should act. Add a separate reason for each.
4. **Record triage and history.** Under `## Triage and history` in the report, write the suggested triage decision, current status, and history using New → Triaged → In Progress → Ready for Retest → Closed or Reopened. Mark future states as planned; do not claim a fix occurred if it did not.
5. **Plan retesting and summarize.** Under `## Retest and regression`, describe the retest and smallest nearby regression set. In the CSV, add execution rows using its header and count Pass, Fail, Blocked (unable to complete), and Not run (deliberately not attempted). Under `## Release summary`, record scope, environment, counts, open findings, and remaining risk.
