# Manual QA 3: Requirements, Stories, and Risk

## Theory

A **requirement** describes a behavior or rule the product should follow. A **user story** describes a user's goal, often in the form “As a user, I want to do something so that I get a benefit.” **Acceptance criteria** add observable conditions that say when the goal is met. A strong criterion is clear enough that two people can agree whether it passed. “Filtering should be easy” is unclear; “Selecting Active shows only incomplete tasks” can be checked.

Reading requirements before using the app is **static review**. It helps find missing answers early. Write unanswered questions instead of inventing expectations. For example, if a task title rule says how many characters are allowed but does not say what happens to extra spaces, ask whether those spaces are removed or only ignored during length checking.

Testing time is limited, so use **risk** to choose what to check first. Risk considers both likelihood (how likely a problem is) and impact (how much harm it would cause). A login problem may affect every user; a small spacing issue may affect appearance only. For practice, assign each one a score from 1 (low) to 3 (high) for likelihood and impact, then multiply them. This simple score helps compare ideas; it is not a precise prediction and does not make low-scored requirements unimportant.

A useful plan states its feature scope, requirement source, environment, assumptions and questions, likely failures, test order, and exclusions. Explain why you ranked a risk high or low. Include an open question as an uncertainty, not as a test result.

## Practice

1. Open the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) and focus on task creation.
2. Write a short user story for task creation, then list observable acceptance criteria using only the specification. Copy the exact requirement text you will test. List unclear details as questions and say whether each question blocks the planned test.
3. List at least five ways task creation could fail. For each, write a short reason, likelihood score, impact score, and multiplied score.
4. Order your planned test areas by risk. Include an ordinary user-flow risk, an invalid-input risk, and an ownership or access-control risk. Explain the order.
5. State what is in scope, what is out of scope, and which environment and dummy data you will use. Do not invent test results.

Use a Markdown editor and the [test plan template](templates/test-plan-template.md). Save manual-qa/submissions/task-creation-test-plan.md with the user story and acceptance criteria, scope, source requirements, environment, questions, risk list, test order, and exclusions. Keep the plan small enough to run in one session.
