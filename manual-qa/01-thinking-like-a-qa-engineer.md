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

1. **Set up the app.** Follow [First-time local setup (Windows)](../taskflow-qa-lab/README.md#first-time-local-setup-windows), open the printed local address, and sign in with an invented account. Use local D1 only.
2. **Review the expectation.** Read the title rules in [Product Specification](../taskflow-qa-lab/README.md#product-specification). The specification says an empty title is invalid but does not give the exact message. Write this open question before testing: “What message should TaskFlow show when a title is empty?”
3. **Try four inputs.** Create a normal title, then try an empty title, spaces only, and real text with spaces around it. Do not change the app. Record the exact input and what the page does after each attempt.
4. **Compare and classify.** For each attempt, write the expected behavior from the specification and the actual behavior you observed. Mark **Pass** when they match, **Fail** when they differ, or **Blocked** when you could not complete the check (for example, the local app would not start). If the specification does not answer the question, record it as an open question instead of guessing. Add exact steps or sanitized evidence for any failure.
5. **Submit your work.** In `manual-qa/submissions/`, create `task-title-checks.csv` with columns `case_id,scenario,input,expected,actual,status,evidence`, and `review-notes.md` with your unanswered question. Put only observed behavior in `actual`; if setup prevents an observation, write `Not observed` and explain why.
