# Manual QA 3: Requirements, Stories, and Risk

## Theory

A **requirement** describes a behavior or rule the product should follow. A **user story** describes a user's goal, often in the form “As a user, I want to do something so that I get a benefit.” **Acceptance criteria** add observable conditions that say when the goal is met. A strong criterion is clear enough that two people can agree whether it passed. “Filtering should be easy” is unclear; “Selecting Active shows only incomplete tasks” can be checked.

Reading requirements before using the app is **static review**. It helps find missing answers early. Write unanswered questions instead of inventing expectations. For example, the specification says a task description is trimmed before it is saved, but does not say whether repeated spaces inside the description are preserved. Record that as an open question; do not treat the app's current behavior as the expected behavior until the requirement is clarified.

Testing time is limited, so use **risk** to choose what to check first. Risk considers both likelihood (how likely a problem is) and impact (how much harm it would cause). A login problem may affect every user; a small spacing issue may affect appearance only. For practice, assign each one a score from 1 (low) to 3 (high) for likelihood and impact, then multiply them. This simple score helps compare ideas; it is not a precise prediction and does not make low-scored requirements unimportant.

A useful plan states its feature scope, requirement source, environment, assumptions and questions, likely failures, test order, and exclusions. Explain why you ranked a risk high or low. Include an open question as an uncertainty, not as a test result.

## Practice

1. **Create your plan file.** Copy `manual-qa/templates/test-plan-template.md` to `manual-qa/submissions/task-creation-test-plan.md`. Work in this copy from the start.
2. **Read the source.** Open the [Product Specification](../taskflow-qa-lab/README.md#product-specification). In your plan, fill in the specification/story field with the task-creation requirement, quoting the exact rule you will use.
3. **Write a story and criteria.** In `Objective and risks`, write one user story (“As a…, I want…, so that…”) and observable acceptance criteria. Under `Open questions and residual risk`, record unanswered details and say if each question prevents a planned check.
4. **Score the risks.** List at least five ways task creation could fail in `Objective and risks`. Score likelihood and impact from 1 (low) to 3 (high), multiply them, and briefly justify the scores. Use the scores to order the checks; they help compare risks but are not precise predictions.
5. **Complete the plan.** Fill `Scope`, `Approach`, `Entry and exit conditions`, and `Deliverables and reporting`. State the local environment and invented data, include ordinary, invalid-input, and ownership/access risks, and explain any exclusions. Do not write test results before testing.
