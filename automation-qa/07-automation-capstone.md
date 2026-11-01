# Automation QA 7: TaskFlow Automation Capstone

## Introduction

Build a small, maintainable test suite for the TaskFlow practice app. Choose checks by risk and explain what automation can and cannot tell the team.

## Learning objectives

- Turn a manual test strategy into a balanced automated suite.
- Implement isolated UI and API checks using TypeScript and Playwright Test.
- Diagnose failures and preserve useful, safe evidence.
- Communicate coverage, limitations, and CI status.

## Concise theoretical explanation

Automation capstone quality is measured by trustworthy evidence and maintainability, not test count. Select stable, repeatable high-risk checks; use API checks for contract/validation behavior and UI checks for a few critical user journeys. Use accessible locators, web-first assertions, unique data, and explicit setup. Keep a manual exploratory list for judgments automation cannot make.

The suite should run locally with the project scripts and in GitHub Actions. A test should fail when the specified behavior is wrong and pass when it is correct. If TaskFlow differs from the Product Specification, report the mismatch and preserve evidence; do not weaken an assertion to match the observed behavior. Protect auth state, environment configuration, and test data.

## Practical examples

An efficient suite may include health, unauthenticated access, title validation, task creation/complete/filter, persistence after reload, and account isolation. Avoid rechecking the same condition at every layer unless the extra evidence justifies its runtime and maintenance.

## Guided practice

1. Revisit the reviewed Manual QA capstone and choose 8–12 automation candidates by risk.
2. Mark each UI, API, or manual and define data isolation before coding.
3. Implement the API cases first, then two high-value UI journeys.
4. Run each case alone and as a suite, then run typecheck and CI workflow.
5. Investigate one failure or document why the suite is clean; capture trace/screenshot only on failure.
6. Review artifacts and logs for leaked credentials or private data.

## Assignment

**Tools:** TypeScript, Playwright Test, local Worker/D1, GitHub Actions. **Deliverables:** `automation-qa/submissions/capstone/` with strategy matrix, automated specs, manual-only checks, run instructions, execution summary, and a short CI/reliability review. Include at least eight meaningful checks across API/UI; use no fixed arbitrary sleeps. **Submission location:** stated capstone folder; request an independent competency review.

## Definition of Done

- Every automated case maps to a requirement and risk.
- At least eight checks cover API and UI behavior, including validation and isolation.
- Tests are independent, repeatable, and use safe test data.
- Local run and CI evidence are recorded; failures are diagnosed rather than hidden.
- Manual coverage and suite limitations are explicit.

## Submission instructions

Submit the capstone folder plus the relevant CI run link or sanitized output. Request review for coverage, test quality, isolation, readability, and diagnosis. Fix critical findings and rerun affected tests before the checkpoint is marked passed.

## Optional extra credit

Add one focused accessibility assertion using a suitable library only if it is already approved for the project; otherwise propose the check manually and explain the tradeoff.
