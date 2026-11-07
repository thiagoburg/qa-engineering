# Automation QA 6: Debugging, Reliability, and CI

## Theory

A **flaky test** passes and fails without a relevant product change. Common causes include arbitrary sleeps, shared data, order dependence, ambiguous locators, and assumptions about network timing. Fix the cause; repeated retries can hide it. A **trace** records actions, snapshots of the page structure, and network details for diagnosis. A screenshot captures a moment but usually gives less context. Treat both as sensitive; never retain tokens or private data.

To investigate, reproduce locally, identify the first meaningful failure, inspect the trace around it, and classify the cause: product defect, test defect, data, or environment. Update the test only when the requirement is still correctly represented. Do not simply change expected results to make CI green.

Continuous Integration (CI) runs checks automatically after changes. GitHub Actions workflow files define triggers, jobs, and steps. Review the commit, environment, test summary, and artifacts. A green workflow means only the configured checks passed on that run; it does not prove complete product quality. A red workflow needs triage, not a blind rerun.

If a test times out finding “Save,” inspect the page and accessible name. If it passes alone but fails in the suite, inspect shared account/task data. If it fails only in CI, compare browser version, base URL, secrets/configuration, and captured trace.

## Practice

1. **Create the investigation file.** Create `automation-qa/submissions/ci-investigation.md` with exact headings `## Environment`, `## Controlled failure`, `## Evidence and diagnosis`, `## Correction and rerun`, and `## CI review`.
2. **Record a baseline.** From `taskflow-qa-lab`, run one existing UI check. Under `## Environment`, record the exact command, browser, and observed pass/fail result.
3. **Cause a temporary test failure.** In the test you ran, change one expected text value so the assertion should fail. Do not commit this temporary edit. Rerun the check and under `## Controlled failure`, record the changed expectation, command, and observed failure clue.
4. **Diagnose the evidence.** Read the failure output and any screenshot/trace. Under `## Evidence and diagnosis`, record the first useful clue and classify the likely cause as product, test, data, or environment. Say whether you found an ambiguous locator, fixed wait, shared data, order assumption, or timing assumption. A trace includes action/page/network context; a screenshot shows one moment.
5. **Restore and rerun.** Restore the original expected value. If you found a reliability risk, describe or make one focused correction such as unique data, a user-facing locator, or an assertion that waits for state. Rerun and under `## Correction and rerun`, record the correction (or `None found`), command, and result.
6. **Review CI.** Read `.github/workflows/taskflow-qa.yml` and one successful GitHub Actions run; inspect a failed run if one exists. Under `## CI review`, record the workflow trigger, environment, commands, saved artifacts, and one limit of what the result proves. If no failed run exists, label the controlled local failure as local only.
