# Manual QA 4: Test Cases and Test Design

## Theory

A **test case** is a repeatable check with a starting condition, an action or input, and an expected result that someone can observe. Give each case a unique ID. Keep the expected result separate from the actual result you record after execution. “The app works” is too broad; “with a signed-in user and no completed tasks, choose Completed and confirm the empty-state message appears” gives a clear setup, action, and result.

**Equivalence partitioning** divides inputs into groups expected to behave in the same way. You do not need to try every value; choose a representative from each group. If a title can have 1–120 Unicode code points after trimming, useful groups are empty/only spaces, valid lengths, and too long. Code points are the text units used for counting: a standalone emoji is one, while a combined emoji can be several. **Boundary value analysis** checks values at and immediately around a limit because mistakes often happen there. For this rule, lengths 0, 1, 2, 119, 120, and 121 check both edges. Emoji can help reveal whether the browser and API count text the same way.

A **decision table** lays out combinations of conditions and their expected outcomes. For example, task creation might depend on whether the title is valid and whether the optional description is within its limit. The table helps you check each meaningful combination rather than choosing combinations at random.

**State transition testing** checks the states a feature can be in and the actions that move it between states. A task can move from Active to Completed and back to Active; Delete moves it to a state where it is absent. Check the result after each action, and include reload when persistence is part of the requirement.

Choose a small set that covers important partitions, limits, conditions, and state changes. Cases should be independent where possible; one case should not rely on another case having passed.

## Practice

1. **Create the case files.** In `manual-qa/submissions/`, create `task-design.csv` with the exact columns `case_id,scenario,preconditions,steps,test_data,expected_result,open_question`. Create `task-state-map.md` with headings `## Task states` and `## Actions`; leave space under both.
2. **Record the rules.** Read the title, description, and task-state rules in the [Product Specification](../taskflow-qa-lab/README.md#product-specification). Under `## Task states` in `task-state-map.md`, write the exact title/description limits and the specified task states.
3. **Design title cases.** In `task-design.csv`, add cases for empty, spaces-only, valid, and too-long titles. Include title lengths 0, 1, 2, 119, 120, and 121; use a repeated non-space character such as `a` to make each exact length. Fill `test_data` with the input, `expected_result` from the specification, and use one row per case.
4. **Combine input conditions.** Add CSV cases combining valid/invalid titles with valid/too-long descriptions. Enter the setup in `preconditions`, actions in `steps`, and any unanswered requirement in `open_question`; do not invent an expected result where the specification is silent.
5. **Map state transitions.** Under `## Actions` in `task-state-map.md`, show how create, complete, reopen, edit, delete, and reload affect Active and Completed tasks. Include the matching CSV `case_id` beside each transition. Give every case enough preconditions and steps to run independently.
