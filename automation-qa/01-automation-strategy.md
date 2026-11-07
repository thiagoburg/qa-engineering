# Automation QA 1: Choosing What to Automate

## Theory

An automated check runs instructions and reports whether an observed result matches an assertion (a check against an expected value or state). Good candidates are repeated, stable, deterministic (the same setup and input normally give the same result), and valuable when run often. Poor candidates include one-time investigations, subjective visual judgments without agreed criteria, unstable prototypes, or checks whose setup costs more than the evidence is worth.

Choose the lowest layer that gives trustworthy evidence: API checks are usually faster for data rules; UI checks cover real user workflows; manual exploration is better for discovering unexpected behavior and usability issues. The “test pyramid” is a reminder to avoid relying only on slow UI checks, not a required ratio. Automation can also produce false alarms (test fails while product is correct) or false confidence (check passes but misses the risk).

Before coding, state the requirement, risk, layer, setup/data, assertion, and maintenance cost. A **coverage gap** is an important behavior or risk that the planned checks do not cover. A useful check has one clear reason to exist and can run repeatedly without depending on leftover state.

Automate that an unauthenticated `GET /api/tasks` returns `401` as an API check. Automate the full sign-in/create/complete journey at UI level because it verifies browser integration. Explore whether error text is understandable manually; a fixed string assertion cannot assess clarity by itself.

## Practice

1. **Create the strategy file.** Create `automation-qa/submissions/automation-strategy.md`. Add a table with columns `behavior | requirement/risk | repeat frequency | stability | layer | value/cost | possible false alarm | possible missed risk`. Add exact headings `## First three to automate`, `## Keep manual`, and `## Coverage gaps` below the table.
2. **Select behaviors.** Read the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification). Add eight rows to the table, naming one behavior and its user or data risk in each row.
3. **Compare the choices.** Complete the remaining table columns for all eight rows: how often the check repeats, result stability, best layer (manual/API/UI), value versus maintenance cost, one possible false alarm (test fails while product is correct), and one possible missed risk (test passes but misses a problem).
4. **Prioritize checks.** Under `## First three to automate`, name three rows by their `behavior` value and explain value and maintenance cost. Under `## Keep manual`, name two other behaviors and explain the human judgment each needs.
5. **Identify gaps.** Under `## Coverage gaps`, list important specification behavior not covered by your choices and how you would monitor it. Include test-data isolation for automated checks. Use the test pyramid as guidance to consider faster lower-level checks alongside a few user-level checks; no fixed ratio is required.
