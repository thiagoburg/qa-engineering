# Manual QA 4: Test Cases and Test Design

## Theory

A **test case** is a repeatable check with a starting condition, an action or input, and an expected result that someone can observe. Give each case a unique ID. Keep the expected result separate from the actual result you record after execution. “The app works” is too broad; “with a signed-in user and no completed tasks, choose Completed and confirm the empty-state message appears” gives a clear setup, action, and result.

**Equivalence partitioning** divides inputs into groups expected to behave in the same way. You do not need to try every value; choose a representative from each group. If a title can have 1–120 Unicode code points after trimming, useful groups are empty/only spaces, valid lengths, and too long. Code points are the text units used for counting: a standalone emoji is one, while a combined emoji can be several. **Boundary value analysis** checks values at and immediately around a limit because mistakes often happen there. For this rule, lengths 0, 1, 2, 119, 120, and 121 check both edges. Emoji can help reveal whether the browser and API count text the same way.

A **decision table** lays out combinations of conditions and their expected outcomes. For example, task creation might depend on whether the title is valid and whether the optional description is within its limit. The table helps you check each meaningful combination rather than choosing combinations at random.

**State transition testing** checks the states a feature can be in and the actions that move it between states. A task can move from Active to Completed and back to Active; Delete moves it to a state where it is absent. Check the result after each action, and include reload when persistence is part of the requirement.

Choose a small set that covers important partitions, limits, conditions, and state changes. Cases should be independent where possible; one case should not rely on another case having passed.

## Practice

1. **Collect the rules.** Read title, description, and task-state rules in the [Product Specification](../taskflow-qa-lab/README.md#product-specification). Copy the exact limits and actions into your notes.
2. **Group title inputs.** Make an equivalence-partition table: group inputs expected to behave alike, such as empty, valid length, and too long. Choose one representative input per group and explain why it represents that group.
3. **Check boundaries.** Add title lengths 0, 1, 2, 119, 120, and 121. State how to create each exact length and the expected outcome. Boundary values test just below, at, and just above a limit.
4. **Combine conditions.** Make a decision table for valid/invalid title and valid/too-long description. Write the expected outcome for each combination; mark missing rules as questions instead of inventing answers.
5. **Map task states.** Draw task states and label create, complete, reopen, edit, delete, and reload actions. Show which actions change state and which should leave it unchanged.
6. **Submit your cases.** Save `manual-qa/submissions/task-design.csv` with unique IDs, setup, input/action, expected result, and open question columns. Save `manual-qa/submissions/task-state-map.md` with your diagram and a short explanation.
