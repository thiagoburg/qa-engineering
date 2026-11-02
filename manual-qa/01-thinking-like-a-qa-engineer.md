# Manual QA 1: Thinking Like a QA Engineer

## Theory

A QA engineer helps a team build confidence that a product behaves as people need it to. QA work includes asking questions about requirements, choosing checks, looking for problems, and sharing clear evidence. Testing is one part of QA; it does not prove that a product has no defects. It shows what was checked, what happened, and what is still unknown.

A **requirement** is an agreed description of what the product should do. It gives a tester an expected result to compare with the actual result. If the requirement is missing or unclear, do not guess and report your guess as a defect. Write an open question so the team can clarify it.

**Static review** means reading a requirement, design, or test without running the product. It can reveal unclear words or missing cases early. **Dynamic testing** means using the running product and observing what it does. Both are useful: static review finds questions; dynamic testing gathers evidence about behavior.

A **defect** is a difference between an agreed expectation and the behavior you observed. A useful test record separates:
- **Expected:** what the requirement says should happen.
- **Actual:** what you observed.
- **Evidence:** details that help another person check the result, such as exact steps, input, browser, and a screenshot or response.
- **Result:** pass when behavior matches the expectation, fail when it does not, or blocked when you could not complete the check.

One passing check only supports that specific expectation and input. Creating one task with a normal title does not show that empty titles are handled correctly. Choose different inputs that matter, and keep facts separate from assumptions.

The [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) says a task title must contain 1–120 Unicode code points after trimming whitespace. These are text units used for counting: a standalone emoji counts as one, while a combined emoji can count as several. The app trims surrounding whitespace before saving a title.

## Practice

1. Start TaskFlow locally using the [app setup instructions](../taskflow-qa-lab/README.md#run-locally). Use local D1 and an invented account.
2. Read the task-title requirement in the [Product Specification](../taskflow-qa-lab/README.md#product-specification). Before using the form, write one question about anything it does not make clear.
3. Create a task with a normal title, submit an empty title, submit spaces only, and try a title with spaces around real text. Use one account and record each attempt separately.
4. For every attempt, write the input, expected behavior based on the specification, actual behavior, result (pass/fail/blocked), and evidence. If the result depends on an unanswered question, mark the question instead of calling it a defect.
5. Do not change the app to make a check pass.

Use the local TaskFlow app, a browser, the Product Specification, and a Markdown or CSV editor. Create `manual-qa/submissions/task-title-checks.csv` with columns `case_id,scenario,input,expected,actual,status,evidence`, and `manual-qa/submissions/review-notes.md` with the unanswered question from your requirement review. Save both files in `manual-qa/submissions/`. Make each actual result something you observed, and include enough evidence for someone to repeat any failed check.
