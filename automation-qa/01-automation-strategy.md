# Automation QA 1: Choosing What to Automate

## Theory

An automated check runs instructions and reports whether an observed result matches an assertion. Good candidates are repeated, stable, deterministic, and valuable when run often. Poor candidates include one-time investigations, subjective visual judgments without agreed criteria, unstable prototypes, or checks whose setup costs more than the evidence is worth.

Choose the lowest layer that gives trustworthy evidence: API checks are usually faster for data rules; UI checks cover real user workflows; manual exploration is better for discovering unexpected behavior and usability issues. The “test pyramid” is a reminder to avoid relying only on slow UI checks, not a required ratio. Automation can also produce false alarms (test fails while product is correct) or false confidence (check passes but misses the risk).

Before coding, state the requirement, risk, layer, setup/data, assertion, and maintenance cost. A useful check has one clear reason to exist and can run repeatedly without depending on leftover state.

Automate that an unauthenticated `GET /api/tasks` returns `401` as an API check. Automate the full sign-in/create/complete journey at UI level because it verifies browser integration. Explore whether error text is understandable manually; a fixed string assertion cannot assess clarity by itself.

## Practice

1. Select eight behaviors from TaskFlow's product spec.
2. For each, record risk, repeat frequency, stability, likely layer (manual/API/UI), and expected cost.
3. Choose three to automate first and explain why.
4. Identify two checks to keep manual and state what human judgment they need.
5. Define the data reset/isolation method so each run is independent.

Use [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification), spreadsheet or Markdown. Create `automation-qa/submissions/automation-strategy.md` with an eight-row decision table, top-three automation backlog, manual-only rationale, coverage gaps, and one explicit limitation per chosen check.

Save the deliverable in automation-qa/submissions/.

Before saving, check that:
- Each candidate maps to a named requirement and risk.
- Layer choice and automation value are justified.
- Test data and isolation are considered.
- The plan recognizes both false alarms and missed defects as risks.
