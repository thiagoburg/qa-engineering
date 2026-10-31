# Manual QA 1: Thinking Like a QA Engineer

## Introduction

Testing is a way to gather evidence about software and reduce uncertainty. In this first guided exercise, you will review a requirement, try the feature, and report what you observed without assuming that one successful example proves everything works.

## Learning objectives

- Explain the difference between testing and proving a product has no defects.
- Review a requirement before execution.
- Write a small set of positive, negative, and boundary checks.
- Record observed results without presenting guesses as facts.

## Concise theory

**Quality Assurance (QA)** is the work of preventing and finding problems throughout delivery. **Testing** evaluates a product by reviewing it, exercising it, or checking its results. A **defect** is behavior that differs from an agreed expectation.

Testing cannot prove that software has no defects; it can show what was checked, what happened, and what risk remains. **Static testing** means reviewing a requirement, design, or code without running the software. It is useful because ambiguity can be found before implementation.

The Software Development Life Cycle (SDLC) describes work from idea through delivery and maintenance. The Software Testing Life Cycle (STLC) describes QA work within that flow: analyze, plan, design, prepare, execute, report, and close. Teams often repeat these activities within each Agile sprint.

## Practical example

Requirement: “A task title is required.”

Before testing, ask whether spaces count as a title and what feedback should appear. A focused initial set is: submit a normal title; submit an empty value; submit spaces only. Record the exact expected behavior from the specification and compare it with the actual result.

## Guided practice

1. Read the task creation rules in [TaskFlow's product specification](../taskflow-qa-lab/PRODUCT_SPEC.md).
2. Before opening the app, list any unclear details about the title field. This is static review.
3. Register an invented training account and log in.
4. Try creating a task with a normal title, an empty title, and a spaces-only title.
5. For each attempt, record the input, expected result from the specification, actual result, and pass/fail.
6. If actual behavior is unclear or differs from the specification, capture the evidence and note the environment. Do not edit the app to make the test pass.

## Assignment

Create `submissions/manual-qa/task-title-checks.csv` with columns `case_id,scenario,input,expected,actual,status,evidence`. Include the three checks above and at least one additional check you designed. In `submissions/manual-qa/review-notes.md`, record one ambiguity you found during static review.

## Definition of Done

- CSV headers match the required columns.
- Each expected result is traceable to the specification or labeled as an open question.
- Actual results are based on execution, not assumptions.
- Evidence makes any failure reproducible.

## Submission instructions

Save both artifacts under `submissions/manual-qa/`. Share them in the project chat for review. Correct any findings before treating this checkpoint as complete.

## Optional extra credit

Repeat the checks in a second browser and note whether any result changes.
