# Manual QA 5: Exploratory and Web Testing

## Introduction

A scripted case checks known expectations. Exploratory testing uses a focused question and observations to find risks the script did not anticipate.

## Learning objectives

- Run a time-boxed exploratory session.
- Distinguish smoke, sanity, and regression checks.
- Check responsive behavior, usability, and basic accessibility.
- Record evidence and environment so another person can reproduce an observation.

## Concise theoretical explanation

**Exploratory testing** is simultaneous learning, test design, and execution. A **charter** sets a goal, such as “Explore task editing for data loss and confusing feedback.” A **session** is a short time box; record actions, observations, questions, and defects. It complements scripted tests rather than replacing them.

A **smoke test** checks whether critical paths are usable after a change. A **sanity check** is a narrow check around a particular change. **Regression testing** checks that existing behavior still works after a change. These labels depend on scope; document what you actually checked.

Responsive testing checks layout and usable controls at different viewport sizes. Usability checks whether users can understand and complete tasks. Accessibility is the ability of people with different needs to use the app. For a junior check, inspect visible labels, keyboard focus/order, action names, contrast/readability, and announced status messages; do not claim a full accessibility audit from a quick scan.

## Practical examples

For a task edit charter, create, edit, cancel, reload, and try long text with keyboard and mouse. At narrow width, check that the task actions remain reachable without horizontal scrolling. Browser zoom and viewport width are different conditions; record which you used.

## Guided practice

1. Start the local app and use a dummy account.
2. Set a 20-minute timer and write a charter with one risk focus.
3. Explore with normal, boundary, and unexpected action sequences; keep notes as you go.
4. Repeat one critical path at desktop width and a narrow mobile viewport.
5. Repeat one smoke path in a second browser when available; record browser/version or say why cross-browser comparison was not possible.
6. Use keyboard only for sign-in, create, complete, edit, and delete; note focus visibility and any blocked action.
7. Capture exact environment details, screenshots, and relevant Network/Console evidence for anomalies.

## Assignment

**Tools:** Two browsers if available, Developer Tools, timer, and the [test execution template](../templates/test-execution-template.csv). **Deliverable:** `submissions/manual-qa/exploratory-session.md` with charter, time box, environment/browser/viewport, actions and observations, covered smoke/regression checks, responsive and cross-browser comparison (or a stated constraint), accessibility/usability notes, and open risks. If you find a defect, use the separate [bug report template](../templates/bug-report-template.md); do not label an unconfirmed suspicion as a defect. **Submission location:** `submissions/manual-qa/`.

## Definition of Done

- Session notes can guide a second person to repeat the exploration.
- At least one keyboard and one narrow viewport path are recorded.
- Smoke, sanity, or regression labels describe the actual scope.
- Claims about usability/accessibility stay within the evidence gathered.

## Submission instructions

Share the session note and any redacted evidence in the project chat. Include one useful question the session raised for product clarification. Never include real personal information or tokens in screenshots.

## Optional extra credit

Ask another learner to replay your session charter and compare findings. Note which exploration paths differed.
