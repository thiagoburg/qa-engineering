# Manual QA 4: Test Cases and Test Design

## Theory

A **test case** is a repeatable check with a starting condition, an action or input, and an expected result that someone can observe. Give each case a unique ID. Keep the expected result separate from the actual result you record after execution. “The app works” is too broad; “with a signed-in user and no completed tasks, choose Completed and confirm the empty-state message appears” gives a clear setup, action, and result.

**Equivalence partitioning** divides inputs into groups expected to behave in the same way. You do not need to try every value; choose a representative from each group. If a title can have 1–120 characters after trimming, useful groups are empty/only spaces, valid lengths, and too long. **Boundary value analysis** checks values at and immediately around a limit because mistakes often happen there. For this rule, lengths 0, 1, 2, 119, 120, and 121 check both edges.

A **decision table** lays out combinations of conditions and their expected outcomes. For example, task creation might depend on whether the title is valid and whether the optional description is within its limit. The table helps you check each meaningful combination rather than choosing combinations at random.

**State transition testing** checks the states a feature can be in and the actions that move it between states. A task can move from Active to Completed and back to Active; Delete moves it to a state where it is absent. Check the result after each action, and include reload when persistence is part of the requirement.

Choose a small set that covers important partitions, limits, conditions, and state changes. Cases should be independent where possible; one case should not rely on another case having passed.

## Practice

1. Use the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) to identify the title and description limits and the task status actions.
2. Make an equivalence-partition table for title input and choose one representative input per group.
3. Add title lengths 0, 1, 2, 119, 120, and 121. State how you will create a string of each exact length.
4. Make a decision table for a valid/invalid title and a valid/too-long description. Record the expected outcome for each combination from the specification.
5. Draw the task states and label the actions that create, complete, reopen, edit, delete, and reload a task.
6. Turn the meaningful rows and transitions into cases with unique IDs, setup, action/input, and observable expected results. Mark any unanswered specification detail as a question.

Use Markdown or CSV and the [test case template](templates/test-case-template.csv). Save at least 10 cases in manual-qa/submissions/task-validation-test-cases.csv. Add manual-qa/submissions/test-design-notes.md explaining which combinations you did not include and why. Base expected results on the specification.
