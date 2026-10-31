# Job Preparation 3: Interviews and Take-Home Exercises

## Introduction

Interview preparation is practice explaining decisions, testing a small problem, and being clear about uncertainty. Memorized definitions are less useful than a concrete example.

## Learning objectives

- Answer common QA questions with structured examples.
- Perform a short risk-based test exercise.
- Plan a take-home assignment and communicate scope.
- Explain gaps honestly and ask useful clarifying questions.

## Concise theoretical explanation

For experience questions, use **Situation, Task, Action, Result (STAR)**. Practice-project examples are valid when labeled as practice; do not claim they happened at an employer. For a test design question: clarify expected behavior, identify risks, partition inputs, choose cases, state evidence, and report limitations. For a bug: give concise steps, expected/actual behavior, impact, and evidence.

For a take-home, first confirm scope, deadline, target environment, allowed tools, and how to submit. Write a short plan before testing. Prioritize critical paths and high-risk failures, record actual results, and deliver a clear report. Ask about unclear requirements rather than inventing them. Respect the employer's instructions and do not upload confidential assignment material to a public repository.

## Practical examples

Question: “What would you test on a login form?” Begin with valid sign-in, invalid credentials, empty fields, boundaries, error feedback, keyboard/accessibility, session/logout, rate/abuse expectations if specified, and API status. Explain prioritization and unknown requirements; don't claim the list is exhaustive.

## Guided practice

1. Choose five questions: testing vs QA, severity vs priority, regression, a difficult bug, and automation choice.
2. Draft answers in plain English; support each with an actual project example or label it hypothetical.
3. Complete a 30-minute take-home simulation on a small TaskFlow requirement using a test plan and 8–10 cases.
4. Record what you did not test and why.
5. Present a two-minute handoff and ask a reviewer what was unclear.

## Assignment

**Tools:** timer, `PRODUCT_SPEC.md`, templates, Markdown. **Deliverable:** `submissions/job-preparation/interview-practice.md` with five STAR/structured answers, one take-home mini-plan and execution summary, unanswered questions, and a two-minute written handoff. **Submission location:** `submissions/job-preparation/`.

## Definition of Done

- Answers use clear examples and distinguish practice from employment.
- Take-home scope prioritizes risk and records evidence/results.
- Limitations and open questions are explicit.
- No employer-confidential material or unsupported claims are included.

## Submission instructions

Save the practice artifact in the stated folder. Ask for review on clarity, technical accuracy, prioritization, and honesty. Re-record or rewrite answers that rely on memorized jargon without an example.

## Optional extra credit

Do a mock interview with a peer and log one improvement to make after each answer.
