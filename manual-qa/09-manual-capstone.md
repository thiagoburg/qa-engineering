# Manual QA 9: TaskFlow Manual QA Capstone

## Introduction

This capstone combines requirements review, risk-based design, execution, API/data checks, defect reporting, and release communication. Work independently and use the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) as the expected-behavior source.

## Learning objectives

- Scope a test effort from product requirements and risk.
- Design and execute a balanced manual test set.
- Preserve reproducible, privacy-safe evidence.
- Communicate results and residual risk to a remote team.

## Concise theoretical explanation

A capstone is a practical assessment, not a memory quiz. Start with the requirement source, decide what matters most, record what you tested, and report what remains unknown. Use the product specification as the release oracle. If you find a mismatch, document the exact build, steps, and evidence; do not alter expected behavior to match the app.

For this checkpoint, a useful set covers critical user journeys and failure conditions: registration/sign-in, task lifecycle, validation, filters/statistics, API errors, persistence, and user isolation. Prioritize authentication, data loss, and cross-account exposure above minor presentation issues. Use local D1 and invented accounts. Avoid remote destructive testing or real credentials. Report observed mismatches against the Product Specification; “none observed” is acceptable when supported by the scope and evidence.

The final report separates **executed**, **passed**, **failed**, **blocked**, and **not run**. Residual risk is specific: what behavior or environment remains untested and why it matters.

## Practical examples

Journey: register → create task → complete → filter completed → reload → sign out → sign in → confirm persistence. Add invalid title and second-account isolation checks as separate cases; a happy path alone does not cover these risks.

## Guided practice

1. Complete the earlier Manual QA lessons first. Start TaskFlow locally using the app README and record the app version, browser, and viewport.
2. Create a one-page scope and prioritize risks; identify test data and reset boundaries.
3. Design cases for every required feature area. Include positive, negative, boundary, state, API, persistence, and isolation checks.
4. Execute the cases against local TaskFlow, recording exact actual results. Stop before any unsafe remote or irreversible action.
5. Report any defect using the [bug report template](templates/bug-report-template.md); retest corrected behavior if a correction is available.
6. Summarize coverage, defect status, and remaining risk for a product manager.

## Assignment

**Tools:** TaskFlow on `main` with local D1, product specification, browser DevTools, Postman, local read-only D1 queries, and the [test plan](templates/test-plan-template.md), [test case](templates/test-case-template.csv), [execution](templates/test-execution-template.csv), and [bug report](templates/bug-report-template.md) templates. **Deliverables:** `manual-qa/submissions/capstone/` containing `test-plan.md`, `test-cases.csv`, `execution.csv`, `bug-reports/` (or an explicit “none observed” note), and `release-summary.md`. Include at least 20 well-chosen cases across the scope, but prioritize risk over raw count. This is an independent-practice assessment; lesson hints should not be needed during execution. **Submission location:** stated capstone folder; share the folder contents for competency review.

## Definition of Done

- All required TaskFlow areas are mapped to tests or clearly excluded with reasons.
- At least 20 cases include a balanced mix of valid, invalid, boundary, API, persistence, and isolation scenarios.
- Execution evidence is factual, sanitized, and reproducible.
- Defects distinguish observed facts from impact assessment; “none observed” is not treated as proof of no defects.
- The release summary includes execution counts, open findings, and residual risk.

## Submission instructions

Submit all five artifact types in the capstone folder. Ask the reviewer to evaluate independence, coverage, evidence, prioritization, and communication. Correct critical gaps and repeat affected checks before moving to Automation QA. The reviewer records the checkpoint result in this README; reading the lesson does not pass the checkpoint.

## Optional extra credit

Present a five-minute release handoff in writing: decision requested, strongest evidence, largest unresolved risk, and recommended next action.
