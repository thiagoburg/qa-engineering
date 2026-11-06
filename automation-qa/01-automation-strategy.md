# Automation QA 1: Choosing What to Automate

## Theory

An automated check runs instructions and reports whether an observed result matches an assertion (a check against an expected value or state). Good candidates are repeated, stable, deterministic (the same setup and input normally give the same result), and valuable when run often. Poor candidates include one-time investigations, subjective visual judgments without agreed criteria, unstable prototypes, or checks whose setup costs more than the evidence is worth.

Choose the lowest layer that gives trustworthy evidence: API checks are usually faster for data rules; UI checks cover real user workflows; manual exploration is better for discovering unexpected behavior and usability issues. The “test pyramid” is a reminder to avoid relying only on slow UI checks, not a required ratio. Automation can also produce false alarms (test fails while product is correct) or false confidence (check passes but misses the risk).

Before coding, state the requirement, risk, layer, setup/data, assertion, and maintenance cost. A **coverage gap** is an important behavior or risk that the planned checks do not cover. A useful check has one clear reason to exist and can run repeatedly without depending on leftover state.

Automate that an unauthenticated `GET /api/tasks` returns `401` as an API check. Automate the full sign-in/create/complete journey at UI level because it verifies browser integration. Explore whether error text is understandable manually; a fixed string assertion cannot assess clarity by itself.

## Practice

1. **Choose behaviors.** Read the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) and list eight behaviors that matter to users or data safety.
2. **Compare options.** For each behavior, record risk, how often it repeats, how stable the expected result is, the likely layer (manual, API, or UI), and the effort to maintain an automated check. API checks call the service directly; UI checks exercise the browser; some checks need human judgment and should stay manual.
3. **Set priorities.** Choose three checks to automate first and explain the value. Name two checks to keep manual and the human judgment they need.
4. **Plan isolation.** State how each automated run will use unique test data or safe local cleanup. Identify coverage gaps and one limitation for each selected check.
5. **Submit your strategy.** Save `automation-qa/submissions/automation-strategy.md` with an eight-row decision table, top-three backlog, manual-only reasons, data-isolation plan, coverage gaps, and limitations.
