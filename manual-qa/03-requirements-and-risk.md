# Manual QA 3: Requirements, Stories, and Risk

## Theory

A **requirement** describes a behavior or rule the product should follow. A **user story** describes a user's goal, often in the form “As a user, I want to do something so that I get a benefit.” **Acceptance criteria** add observable conditions that say when the goal is met. A strong criterion is clear enough that two people can agree whether it passed. “Filtering should be easy” is unclear; “Selecting Active shows only incomplete tasks” can be checked.

Reading requirements before using the app is **static review**. It helps find missing answers early. Write unanswered questions instead of inventing expectations. For example, the specification says a task description is trimmed before it is saved, but does not say whether repeated spaces inside the description are preserved. Record that as an open question; do not treat the app's current behavior as the expected behavior until the requirement is clarified.

Testing time is limited, so use **risk** to choose what to check first. Risk considers both likelihood (how likely a problem is) and impact (how much harm it would cause). A login problem may affect every user; a small spacing issue may affect appearance only. For practice, assign each one a score from 1 (low) to 3 (high) for likelihood and impact, then multiply them. This simple score helps compare ideas; it is not a precise prediction and does not make low-scored requirements unimportant.

A useful plan states its feature scope, requirement source, environment, assumptions and questions, likely failures, test order, and exclusions. Explain why you ranked a risk high or low. Include an open question as an uncertainty, not as a test result.

## Practice

1. **Create the plan.** Copy `manual-qa/templates/test-plan-template.md` to `manual-qa/submissions/task-creation-test-plan.md`. Fill this copy only; the template remains unchanged.
2. **Set the source requirement.** Open the [Product Specification](../taskflow-qa-lab/README.md#product-specification). In the plan’s `**Specification or story:**` field, quote the exact task-creation rule you will test.
3. **Describe purpose and questions.** Under `## Objective and risks`, write one user story (“As a…, I want…, so that…”) and observable acceptance criteria. Under `## Open questions and residual risk`, list unanswered details and say whether each one prevents a planned check.
4. **Rank task-creation risks.** Still under `## Objective and risks`, list at least five possible failures. For each, score likelihood and impact from 1 (low) to 3 (high), multiply the scores, and briefly explain them. Use the scores to order your planned checks; they are comparisons, not precise predictions.
5. **Finish the plan sections.** Complete `## Scope`, `## Approach`, `## Entry and exit conditions`, and `## Deliverables and reporting`. Name local TaskFlow, invented data, ordinary and invalid inputs, ownership/access risks, and exclusions. Do not enter test results before execution.
