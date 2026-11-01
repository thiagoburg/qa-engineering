# Manual QA 4: Test Cases and Test Design

## Introduction

Testing every possible input is usually impossible. Test design techniques help select a small set of inputs that covers meaningful behavior and boundaries.

## Learning objectives

- Write reproducible test cases with expected results.
- Apply equivalence partitioning and boundary value analysis.
- Use decision tables for combinations of conditions.
- Model a feature with states and transitions.

## Concise theoretical explanation

A **test case** states a precondition, action/input, and observable expected result. **Equivalence partitioning** groups inputs expected to behave alike; test a representative from each group. **Boundary value analysis** checks values at and around limits, where mistakes are common. For a title length of 1–120, useful lengths are 0, 1, 2, 119, 120, and 121.

A **decision table** lists condition combinations and expected outcomes. For registration, conditions may include valid email and valid password; the table helps avoid forgetting one invalid/valid combination. **State transition testing** checks both states and the actions that move between them. A task can move Active → Completed → Active; deleting it moves to Absent. Verify invalid actions and persistence where relevant.

Keep cases observable and independent. “The app works” is not a test. “With a signed-in user and no tasks, select Completed; the list shows the empty-state message and completed count is zero” is reproducible.

## Practical examples

For a required title, partitions are empty/whitespace, valid 1–120 trimmed characters, and over 120. Boundaries focus on 0/1/2 and 120/121. For task status, draw states and transitions, then cover create, complete, reopen, edit while completed, delete, and reload.

## Guided practice

1. Choose task title validation in `PRODUCT_SPEC.md`.
2. Create a table of input partitions and one representative input per partition.
3. Add the boundary values around 1 and 120 characters.
4. Build a small decision table for title valid/invalid and description valid/too long.
5. Draw task states and label transitions with user actions.
6. Convert each high-value row/transition into a test case with setup, action, expected result, and case ID.

## Assignment

**Tools:** Markdown or CSV and the [test case template](templates/test-case-template.csv). **Deliverable:** `manual-qa/submissions/task-validation-test-cases.csv` with at least 10 cases: partitions, key boundaries, two condition combinations, and all task state transitions. Add a short Markdown note explaining which combinations you intentionally did not test and why. **Submission location:** `manual-qa/submissions/`; share both artifacts for review.

## Definition of Done

- Cases have unique IDs, setup, action/input, and observable expected results.
- Boundary values match the specification, including trimming behavior.
- Cases cover valid and invalid conditions and task state transitions.
- Expected results are traceable to the specification; unresolved behavior is marked as a question.

## Submission instructions

Save the CSV and note under `manual-qa/submissions/`. In the review request, point to one boundary case and one state transition. Update unclear or redundant cases after feedback.

## Optional extra credit

Estimate the execution cost of each case, then propose the smallest set that still covers every high-risk partition and transition.
