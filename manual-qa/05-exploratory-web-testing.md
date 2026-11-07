# Manual QA 5: Exploratory and Web Testing

## Theory

A scripted test case checks a known expectation. **Exploratory testing** is different: while you use the product, you learn how it works, decide what to check next, and observe the results. It is still planned. A **charter** gives the session a goal, such as “Explore task editing for lost changes and confusing feedback.” A **time box** is the amount of time you agree to spend. Write actions and observations as you go so an interesting result is not lost.

A **smoke test** is a short check that the most important parts of an app still work. A **regression test** checks that behavior which used to work still works after a change. These names describe the purpose and scope of the checks, not a quality rating. State exactly what you checked; a small smoke test does not prove the whole app is safe.

**Responsive testing** checks whether content and controls remain usable at different screen sizes. **Usability** asks whether people can understand and complete a task. **Accessibility** asks whether people with different abilities can use the product. A beginner check can inspect whether controls have clear labels, keyboard focus is visible and moves in a sensible order, and text is readable. These checks can reveal barriers, but a short manual pass is not a full accessibility audit.

For example, a task-editing charter could ask whether a user can edit, cancel, and reload without losing the saved title. You could repeat one critical path at a wide and narrow viewport and use only the keyboard. Record browser, viewport, steps, and evidence so another person can repeat what you did.

## Practice

1. **Create your session log.** Create `manual-qa/submissions/exploratory-session.md` with headings `Charter`, `Environment and time box`, `Actions and observations`, `Responsive and keyboard checks`, `Smoke and regression checks`, and `Questions and risks`. Under `Actions and observations`, add a table with columns `time | action | observation | evidence`.
2. **Set your charter and environment.** Start local TaskFlow with an invented account. Choose task editing or filtering, write one risk-focused charter, and record browser and viewport under `Environment and time box`. Set a 20-minute limit.
3. **Explore and log.** During the time box, try a normal sequence, a boundary or unusual sequence, and a recovery action such as cancel or reload. Add each action and what you observed to `Actions and observations` as you go. Note any step that was confusing or stopped you from completing the task; this is a usability observation.
4. **Check screen sizes and keyboard use.** At wide and narrow viewports, check whether the main controls remain usable and record the sizes/findings under `Responsive and keyboard checks`. Then complete one task journey by keyboard and record focus order, visible focus, labels, and any action you could not complete.
5. **Plan smoke and regression checks.** Write a short critical journey to recheck after a change and one nearby behavior that could be affected. A smoke check is a short check of key functions; a regression check asks whether a change broke behavior that used to work. Record both under `Smoke and regression checks`.
6. **Finish the log.** Record open questions and remaining risks. If you report a mismatch, add reproduction details using the [bug report template](templates/bug-report-template.md); distinguish what you observed from what you suspect.
