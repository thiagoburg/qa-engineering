# Automation QA 6: Debugging, Reliability, and CI

## Theory

A **flaky test** passes and fails without a relevant product change. Common causes include arbitrary sleeps, shared data, order dependence, ambiguous locators, and assumptions about network timing. Fix the cause; repeated retries can hide it. A **trace** records actions, snapshots of the page structure, and network details for diagnosis. A screenshot captures a moment but usually gives less context. Treat both as sensitive; never retain tokens or private data.

To investigate, reproduce locally, identify the first meaningful failure, inspect the trace around it, and classify the cause: product defect, test defect, data, or environment. Update the test only when the requirement is still correctly represented. Do not simply change expected results to make CI green.

Continuous Integration (CI) runs checks automatically after changes. GitHub Actions workflow files define triggers, jobs, and steps. Review the commit, environment, test summary, and artifacts. A green workflow means only the configured checks passed on that run; it does not prove complete product quality. A red workflow needs triage, not a blind rerun.

If a test times out finding “Save,” inspect the page and accessible name. If it passes alone but fails in the suite, inspect shared account/task data. If it fails only in CI, compare browser version, base URL, secrets/configuration, and captured trace.

## Practice

1. **Create the investigation file.** Create `automation-qa/submissions/ci-investigation.md` with headings `Environment`, `Controlled failure`, `Evidence and diagnosis`, `Correction and rerun`, and `CI review`.
2. **Record the starting point.** Run one existing UI check locally. Record the command, browser, and initial result under `Environment`.
3. **Make one temporary failure.** Change one expected text value in a test so its assertion should fail. Do not commit this temporary change. Run that check and record what failed under `Controlled failure`.
4. **Inspect and diagnose.** Read the failure output and any screenshot/trace. Record the first useful clue and classify the likely cause as product, test, data, or environment under `Evidence and diagnosis`. Check whether the test uses an ambiguous locator, fixed wait, shared data, order assumption, or timing assumption. A trace has action/page/network context; a screenshot shows one moment.
5. **Restore and rerun.** Restore the correct assertion. If you identify a reliability risk, describe or make a focused correction: use a unique dataset, a user-facing locator, or an assertion that waits for the required state. Rerun and record the result under `Correction and rerun`.
6. **Review CI.** Read `.github/workflows/taskflow-qa.yml` and one successful Actions run; review a failed run if one is available. Under `CI review`, summarize trigger, environment, commands, artifacts, and one limit of what that result proves. Label your controlled local failure clearly if there is no failed workflow run.
