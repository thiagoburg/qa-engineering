# Manual QA 5: Exploratory and Web Testing

## Theory

A scripted test case checks a known expectation. **Exploratory testing** is different: while you use the product, you learn how it works, decide what to check next, and observe the results. It is still planned. A **charter** gives the session a goal, such as “Explore task editing for lost changes and confusing feedback.” A **time box** is the amount of time you agree to spend. Write actions and observations as you go so an interesting result is not lost.

A **smoke test** is a short check that the most important parts of an app still work. A **regression test** checks that behavior which used to work still works after a change. These names describe the purpose and scope of the checks, not a quality rating. State exactly what you checked; a small smoke test does not prove the whole app is safe.

**Responsive testing** checks whether content and controls remain usable at different screen sizes. **Usability** asks whether people can understand and complete a task. **Accessibility** asks whether people with different abilities can use the product. A beginner check can inspect whether controls have clear labels, keyboard focus is visible and moves in a sensible order, text is readable, and status changes are announced. These checks can reveal barriers, but a short manual pass is not a full accessibility audit.

For example, a task-editing charter could ask whether a user can edit, cancel, and reload without losing the saved title. You could repeat one critical path at a wide and narrow viewport and use only the keyboard. Record browser, viewport, steps, and evidence so another person can repeat what you did.

## Practice

1. Start local TaskFlow with a dummy account. Choose task editing or filtering and write a charter about one risk.
2. Spend 20 minutes exploring. Try an ordinary sequence, a boundary or unusual sequence, and one recovery action such as cancel or reload. Record each action and observation.
3. At a wide and narrow viewport, check whether the main controls remain visible and usable. Record both viewport sizes.
4. Use only the keyboard for one task journey. Note the focus order, visible focus, labels, and any action you could not complete.
5. Write one short smoke path for a critical TaskFlow journey. Identify one existing behavior you would check as regression after a change.
6. Repeat the smoke path in a second browser if available; otherwise record the limitation. Capture sanitized screenshots or Network/Console evidence only when it helps explain an observation.

Use a timer, browser Developer Tools, and the [test execution template](templates/test-execution-template.csv). Save your notes in manual-qa/submissions/exploratory-session.md with your charter, time box, environment/browser/viewport, actions and observations, smoke/regression path, responsive and keyboard findings, open questions, and remaining risks. For an observed mismatch, use the [bug report template](templates/bug-report-template.md); do not present a suspicion as a confirmed defect.
