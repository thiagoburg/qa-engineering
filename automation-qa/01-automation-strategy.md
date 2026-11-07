# Automation QA 1: Choosing What to Automate

## Theory

An automated check runs instructions and reports whether an observed result matches an assertion (a check against an expected value or state). Good candidates are repeated, stable, deterministic (the same setup and input normally give the same result), and valuable when run often. Poor candidates include one-time investigations, subjective visual judgments without agreed criteria, unstable prototypes, or checks whose setup costs more than the evidence is worth.

Choose the lowest layer that gives trustworthy evidence: API checks are usually faster for data rules; UI checks cover real user workflows; manual exploration is better for discovering unexpected behavior and usability issues. The “test pyramid” is a reminder to avoid relying only on slow UI checks, not a required ratio. Automation can also produce false alarms (test fails while product is correct) or false confidence (check passes but misses the risk).

Before coding, state the requirement, risk, layer, setup/data, assertion, and maintenance cost. A **coverage gap** is an important behavior or risk that the planned checks do not cover. A useful check has one clear reason to exist and can run repeatedly without depending on leftover state.

Automate that an unauthenticated `GET /api/tasks` returns `401` as an API check. Automate the full sign-in/create/complete journey at UI level because it verifies browser integration. Explore whether error text is understandable manually; a fixed string assertion cannot assess clarity by itself.

## Practice

1. **Create your strategy file.** Create `automation-qa/submissions/automation-strategy.md` with a decision table headed `behavior | requirement/risk | repeat frequency | stability | layer | value/cost | possible false alarm | possible missed risk`. Add headings `First three to automate`, `Keep manual`, and `Coverage gaps`.
2. **Choose behaviors.** Read the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification). Add eight important behaviors to the table, each tied to a user or data risk.
3. **Compare candidates.** For each row, consider how often it repeats, whether the result is stable, and whether manual, API, or UI testing gives the best evidence. Note a possible false alarm (test fails while product is correct) and a possible missed risk (test passes but misses a problem) for each candidate.
4. **Prioritize.** Choose three checks to automate first and explain their value and maintenance cost under `First three to automate`. Choose two manual checks under `Keep manual` and explain what human judgment they require.
5. **Review coverage.** Under `Coverage gaps`, list important behavior your candidates do not check and how you would keep an eye on it. Include test-data isolation for selected checks. The test pyramid is a reminder to use fast lower-level checks where useful while retaining a few user-level checks; do not treat it as a required ratio.
