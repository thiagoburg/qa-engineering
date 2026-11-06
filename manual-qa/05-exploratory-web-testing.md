# Manual QA 5: Exploratory and Web Testing

## Theory

A scripted test case checks a known expectation. **Exploratory testing** is different: while you use the product, you learn how it works, decide what to check next, and observe the results. It is still planned. A **charter** gives the session a goal, such as “Explore task editing for lost changes and confusing feedback.” A **time box** is the amount of time you agree to spend. Write actions and observations as you go so an interesting result is not lost.

A **smoke test** is a short check that the most important parts of an app still work. A **regression test** checks that behavior which used to work still works after a change. These names describe the purpose and scope of the checks, not a quality rating. State exactly what you checked; a small smoke test does not prove the whole app is safe.

**Responsive testing** checks whether content and controls remain usable at different screen sizes. **Usability** asks whether people can understand and complete a task. **Accessibility** asks whether people with different abilities can use the product. A beginner check can inspect whether controls have clear labels, keyboard focus is visible and moves in a sensible order, text is readable, and status changes are announced. These checks can reveal barriers, but a short manual pass is not a full accessibility audit.

For example, a task-editing charter could ask whether a user can edit, cancel, and reload without losing the saved title. You could repeat one critical path at a wide and narrow viewport and use only the keyboard. Record browser, viewport, steps, and evidence so another person can repeat what you did.

## Practice

1. **Choose a risk.** Start local TaskFlow with an invented account. Pick task editing or filtering and write a one-sentence exploration charter describing a risk to investigate.
2. **Explore for 20 minutes.** Try an ordinary sequence, a boundary or unusual sequence, and a recovery action such as cancel or reload. Record actions and observations as you go. A charter keeps exploration focused; the time limit prevents one area from consuming the whole session.
3. **Check responsive behavior.** At a wide and a narrow viewport, check whether the main controls remain visible and usable. Record both viewport sizes and any observed issue.
4. **Check keyboard use.** Complete one task journey using only the keyboard. Note focus order, visible focus, labels, and any action you could not complete. Do not claim an accessibility standard violation unless you have checked its criteria.
5. **Plan smoke and regression checks.** Write one short smoke path for a critical journey and one nearby existing behavior to check after a change. Smoke testing checks that a key path works; regression testing checks that a change did not break nearby behavior.
6. **Submit your session.** Save `manual-qa/submissions/exploratory-session.md` with charter, time box, browser/viewport, actions and observations, smoke/regression path, responsive and keyboard findings, open questions, and remaining risks. Use the [test execution template](templates/test-execution-template.csv) for results; if you report a mismatch, use the [bug report template](templates/bug-report-template.md) and label assumptions clearly.
