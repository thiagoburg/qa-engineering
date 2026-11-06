# Manual QA 3: Requirements, Stories, and Risk

## Theory

A **requirement** describes a behavior or rule the product should follow. A **user story** describes a user's goal, often in the form “As a user, I want to do something so that I get a benefit.” **Acceptance criteria** add observable conditions that say when the goal is met. A strong criterion is clear enough that two people can agree whether it passed. “Filtering should be easy” is unclear; “Selecting Active shows only incomplete tasks” can be checked.

Reading requirements before using the app is **static review**. It helps find missing answers early. Write unanswered questions instead of inventing expectations. For example, the specification says a task description is trimmed before it is saved, but does not say whether repeated spaces inside the description are preserved. Record that as an open question; do not treat the app's current behavior as the expected behavior until the requirement is clarified.

Testing time is limited, so use **risk** to choose what to check first. Risk considers both likelihood (how likely a problem is) and impact (how much harm it would cause). A login problem may affect every user; a small spacing issue may affect appearance only. For practice, assign each one a score from 1 (low) to 3 (high) for likelihood and impact, then multiply them. This simple score helps compare ideas; it is not a precise prediction and does not make low-scored requirements unimportant.

A useful plan states its feature scope, requirement source, environment, assumptions and questions, likely failures, test order, and exclusions. Explain why you ranked a risk high or low. Include an open question as an uncertainty, not as a test result.

## Practice

1. **Choose the source.** Open the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) and read the task-creation requirements. Copy the exact text you plan to use; do not add behavior that is not specified.
2. **Write the story and checks.** Write one user story in the form “As a …, I want …, so that …”. List observable acceptance criteria beneath it. Add unanswered details as questions and say whether each question prevents a particular check from being planned.
3. **List and score risks.** Write at least five ways task creation could fail. Give each likelihood and impact a score from 1 (low) to 3 (high), multiply the scores, and explain your reason. A risk score helps order investigation; it is not a precise prediction.
4. **Set scope and order.** Order checks from highest to lowest score. Include a normal creation flow, invalid input, and ownership/access risk. State what is in scope, what is excluded, and that you will use the local app with invented data. Do not invent results.
5. **Submit your plan.** Use the [test plan template](templates/test-plan-template.md) and save `manual-qa/submissions/task-creation-test-plan.md`. Include the story, criteria, source requirements, questions, risk scores/reasons, test order, scope, environment, and exclusions.
