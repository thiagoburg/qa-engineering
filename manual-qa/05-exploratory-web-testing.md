# Manual QA 5: Exploratory and Web Testing

## Theory

A scripted test case checks a known expectation. **Exploratory testing** is different: while you use the product, you learn how it works, decide what to check next, and observe the results. It is still planned. A **charter** gives the session a goal, such as “Explore task editing for lost changes and confusing feedback.” A **time box** is the amount of time you agree to spend. Write actions and observations as you go so an interesting result is not lost.

A **smoke test** is a short check that the most important parts of an app still work. A **regression test** checks that behavior which used to work still works after a change. These names describe the purpose and scope of the checks, not a quality rating. State exactly what you checked; a small smoke test does not prove the whole app is safe.

**Responsive testing** checks whether content and controls remain usable at different screen sizes. **Usability** asks whether people can understand and complete a task. **Accessibility** asks whether people with different abilities can use the product. A beginner check can inspect whether controls have clear labels, keyboard focus is visible and moves in a sensible order, and text is readable. These checks can reveal barriers, but a short manual pass is not a full accessibility audit.

For example, a task-editing charter could ask whether a user can edit, cancel, and reload without losing the saved title. You could repeat one critical path at a wide and narrow viewport and use only the keyboard. Record browser, viewport, steps, and evidence so another person can repeat what you did.

## Practice

1. **Create the session log.** Create `manual-qa/submissions/exploratory-session.md` with exact headings `## Charter`, `## Environment and time box`, `## Actions and observations`, `## Responsive and keyboard checks`, `## Smoke and regression checks`, and `## Questions and risks`. Under `## Actions and observations`, add a table with columns `time | action | observation | evidence`.
2. **Set the session.** Start local TaskFlow with an invented account. Choose task editing or filtering. Under `## Charter`, write one sentence describing what you will explore and the risk you want to learn about. Under `## Environment and time box`, record browser, viewport, and a 20-minute limit.
3. **Explore and record as you go.** During the 20 minutes, try a normal sequence, a boundary or unusual sequence, and a recovery action such as cancel or reload. Add one row per action to the table under `## Actions and observations`, recording only what happened. Note confusing or blocking steps as usability observations.
4. **Check responsive layout and keyboard access.** Test the main controls at a wide and a narrow viewport. Under `## Responsive and keyboard checks`, record both viewport sizes and whether controls remained usable. Then complete one task journey by keyboard and record focus order, visible focus, labels, and any action you could not complete.
5. **Write regression checks.** Under `## Smoke and regression checks`, list a short critical journey to repeat after a change and one nearby behavior that change might affect. State which is the smoke check and which is the regression check.
6. **Record limits and findings.** Under `## Questions and risks`, list open questions and remaining risks. For an observed mismatch, add reproduction steps and sanitized evidence to a separate report based on [the bug report template](templates/bug-report-template.md); clearly separate observed facts from suspected causes.
