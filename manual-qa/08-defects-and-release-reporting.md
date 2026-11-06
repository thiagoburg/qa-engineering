# Manual QA 8: Defects, Retesting, and Release Reporting

## Theory

A **defect** is a mismatch between an agreed expectation and observed behavior. A report needs a specific title, environment, preconditions, steps, expected result, actual result, and evidence. Keep one issue per report and remove private information.

**Severity** describes impact on the product/user; **priority** describes how soon the team should address it. A crash that blocks all users is likely high in both. A rare typo may be low severity, while a legally required text correction could have high priority. **Triage** is the team's review of a finding to decide its validity, priority, owner, and next step; explain your reasoning rather than assigning the team's decision as fact.

A test result is **Pass** when observed behavior matches the expectation, **Fail** when it does not, **Blocked** when something prevents completing the check, and **Not run** when the check was deliberately not attempted. A typical defect flow is New → Triaged → In Progress → Ready for Retest → Closed or Reopened. After a fix, repeat the failing steps (**retest**) and check nearby behavior (**regression**). A release report states scope, environment, execution results, known defects, and residual risk. “No critical failures observed in the tested scope” is more accurate than “the release has no bugs.”

Title: “Completed tasks reappear in Active filter after reload.” Steps identify the account state, task, action, and reload. Expected and actual are separate. A screenshot of the filter plus API response can establish evidence; do not attach a screenshot alone if it hides the reproduction steps.

## Practice

1. **Choose a finding.** Use a mismatch you actually observed in local TaskFlow. If you found none, create a clearly labeled hypothetical example and do not describe it as an observed defect.
2. **Write the report.** Fill the [bug report template](templates/bug-report-template.md) with environment, preconditions, exact steps, expected and actual results, and sanitized evidence.
3. **Assess impact and urgency.** Give severity (impact on users/system) and priority (how soon the team should act) separately, with a short reason for each.
4. **Show ticket progress honestly.** Record the current status and a short triage decision. Add a status history using New → Triaged → In Progress → Ready for Retest → Closed or Reopened. Mark steps that have not happened as planned or hypothetical; never claim a fix occurred when it did not.
5. **Plan retesting and release reporting.** State how to retest the issue and the smallest nearby regression set. Use the [test execution template](templates/test-execution-template.csv) to count Pass, Fail, Blocked, and Not run cases. A retest repeats a failed check after a fix; regression checks nearby behavior for unintended change.
6. **Submit your report.** Save `manual-qa/submissions/defect-and-release-report.md` with the report, severity/priority reasons, honest status history, retest/regression plan, and a one-page release summary stating scope, environment, result counts, open findings, and remaining risk.
