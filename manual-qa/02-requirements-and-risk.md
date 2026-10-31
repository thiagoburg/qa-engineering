# Manual QA 2: Requirements, Stories, and Risk

## Introduction

Good testing starts before a feature is built. This lesson turns a short request into clear, testable expectations and a small risk-focused plan.

## Learning objectives

- Separate a user story from its acceptance criteria.
- Find ambiguity and missing cases through static review.
- Rank test ideas by likelihood and impact.
- Write a compact test plan linked to the product specification.

## Concise theoretical explanation

A **requirement** describes a product behavior or constraint. A **user story** expresses a goal from a user's point of view; **acceptance criteria** define observable conditions for accepting it. A useful criterion is specific, testable, and has one clear interpretation. Static review means examining text before running software.

Risk combines the chance a problem occurs with the harm it could cause. A simple scale is Low, Medium, High. A login failure may be high risk because many users cannot reach the app; a minor spacing difference may be low. Risk helps choose coverage when time is limited. It does not justify ignoring agreed requirements.

Example story: “As a signed-in user, I want to filter my tasks so I can focus on work that remains.” Criteria should say which filter values are valid, how counts behave, whether filters persist, and what an empty result looks like. If the specification does not answer a question, record it as an open question rather than inventing expected behavior.

## Practical examples

In `PRODUCT_SPEC.md`, “a title from 1 through 120 characters after trimming” gives boundaries. A task belonging to another account returning `404` is a security and isolation expectation. The same issue can have both likelihood and impact; record why you ranked it high instead of treating the label as self-evident.

## Guided practice

1. Open `taskflow-qa-lab/PRODUCT_SPEC.md` and choose task creation or account registration.
2. Copy the exact requirements you intend to test into a short plan; do not rewrite them as broader promises.
3. List missing details as questions. Mark each as blocking or non-blocking for the current test.
4. Brainstorm failures, assign likelihood and impact from 1 (low) to 3 (high), and multiply them for a simple risk score.
5. Choose the highest-risk checks first and explain the order.

## Assignment

**Tools:** Markdown editor and `templates/test-plan-template.md`. **Deliverable:** `submissions/manual-qa/task-filter-test-plan.md`, containing scope, source requirements, environment, assumptions/questions, at least five risks with likelihood/impact/score, prioritized test areas, and out-of-scope items. Keep the plan small enough to execute in one sitting. **Submission location:** `submissions/manual-qa/`; share it in the project chat for review before committing.

## Definition of Done

- Every planned expectation links to the product specification or is labeled an open question.
- Risks include a reason and separate likelihood from impact.
- The plan prioritizes at least one security, one boundary, and one ordinary user-flow risk where applicable.
- Scope and exclusions are explicit; no test result is invented.

## Submission instructions

Save the Markdown deliverable at the stated path. In your review request, identify the requirement with the most ambiguity and the risk you chose to test first. Correct review findings before marking the lesson complete.

## Optional extra credit

Ask a reviewer to change one product assumption. Update the risk ranking and explain why the test order changed.
