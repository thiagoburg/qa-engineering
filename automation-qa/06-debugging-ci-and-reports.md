# Automation QA 6: Debugging, Reliability, and CI

## Theory

A **flaky test** passes and fails without a relevant product change. Common causes include arbitrary sleeps, shared data, order dependence, ambiguous locators, and assumptions about network timing. Fix the cause; repeated retries can hide it. A **trace** records actions, DOM snapshots, and network details for diagnosis. A screenshot captures a moment but usually gives less context. Treat both as sensitive; never retain tokens or private data.

To investigate, reproduce locally, identify the first meaningful failure, inspect the trace around it, and classify the cause: product defect, test defect, data, or environment. Update the test only when the requirement is still correctly represented. Do not simply change expected results to make CI green.

Continuous Integration (CI) runs checks automatically after changes. GitHub Actions workflow files define triggers, jobs, and steps. Review the commit, environment, test summary, and artifacts. A green workflow means only the configured checks passed on that run; it does not prove complete product quality. A red workflow needs triage, not a blind rerun.

If a test times out finding “Save,” inspect the page and accessible name. If it passes alone but fails in the suite, inspect shared account/task data. If it fails only in CI, compare browser version, base URL, secrets/configuration, and captured trace.

## Practice

1. **Create a controlled failure.** Run a UI check locally and temporarily change one expected text value so the assertion should fail. Do not commit this temporary change.
2. **Read the evidence.** Inspect the failure output and, if created, screenshot/trace. Record the first useful clue and what it supports; a trace contains action/page/network details, while a screenshot captures one moment.
3. **Restore and improve.** Restore the correct assertion. If you find a fixed sleep or shared state, explain why it is risky and describe a safer condition or isolated data. Do not change a correct requirement to get a green result.
4. **Read the workflow.** Open `.github/workflows/taskflow-qa.yml`. Record its trigger, environment, commands, and saved artifacts. A CI result applies only to the checks configured for that run.
5. **Review and submit.** Review one successful workflow run and a failed run if available. Save `automation-qa/submissions/ci-investigation.md` with the failure, evidence, likely category (product, test, data, or environment), correction, rerun result, workflow summary, and one limitation. If no real failed workflow is available, label your controlled local failure clearly.
