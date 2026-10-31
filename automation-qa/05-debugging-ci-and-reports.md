# Automation QA 5: Debugging, Reliability, and CI

## Introduction

An automated test is useful only if failures are understandable and reruns are trustworthy. This lesson practices diagnosis, evidence, and continuous integration.

## Learning objectives

- Debug a failure by separating product, test, data, and environment causes.
- Use Playwright traces and screenshots as evidence.
- Recognize and reduce flaky behavior.
- Read a GitHub Actions test result and report its limits.

## Concise theoretical explanation

A **flaky test** passes and fails without a relevant product change. Common causes include arbitrary sleeps, shared data, order dependence, ambiguous locators, and assumptions about network timing. Fix the cause; repeated retries can hide it. A **trace** records actions, DOM snapshots, and network details for diagnosis. A screenshot captures a moment but usually gives less context. Treat both as sensitive; never retain tokens or private data.

To investigate, reproduce locally, identify the first meaningful failure, inspect the trace around it, and classify the cause: product defect, test defect, data, or environment. Update the test only when the requirement is still correctly represented. Do not simply change expected results to make CI green.

Continuous Integration (CI) runs checks automatically after changes. GitHub Actions workflow files define triggers, jobs, and steps. Review the commit, environment, test summary, and artifacts. A green workflow means only the configured checks passed on that run; it does not prove complete product quality. A red workflow needs triage, not a blind rerun.

## Practical examples

If a test times out finding “Save,” inspect the page and accessible name. If it passes alone but fails in the suite, inspect shared account/task data. If it fails only in CI, compare browser version, base URL, secrets/configuration, and captured trace.

## Guided practice

1. Run one UI check and intentionally make its expected text wrong in a temporary local edit.
2. Inspect the failure output, screenshot, and trace; identify the first useful evidence.
3. Restore the assertion and replace any fixed sleep or shared state you find.
4. Open `.github/workflows/taskflow-qa.yml` and explain its trigger, environment, commands, and artifact retention.
5. Review a successful and (if available) failed workflow run; write what each result proves and does not prove.

## Assignment

**Tools:** Playwright CLI, trace viewer, GitHub Actions. **Deliverable:** `submissions/automation-qa/ci-investigation.md` with one diagnosed failure (intentional local failure is acceptable), its evidence, root-cause category, correction, rerun result, workflow summary, and one limitation of the CI suite. **Submission location:** `submissions/automation-qa/`. Do not upload secrets or unredacted auth state.

## Definition of Done

- Failure evidence supports the diagnosis.
- The correction addresses the cause rather than masking it.
- The rerun result and environment are stated.
- CI conclusions are limited to configured tests and that run.

## Submission instructions

Save the investigation note and any sanitized screenshot/trace reference. Share it for review. Remove generated traces with sensitive data before committing or uploading.

## Optional extra credit

Propose a pull-request gate that balances runtime and risk; justify which slow checks run later.
