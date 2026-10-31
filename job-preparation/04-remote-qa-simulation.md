# Job Preparation 4: Remote QA Collaboration and Workday Simulation

## Introduction

Remote QA work depends on visible progress, useful written handoffs, and timely communication. This simulation combines a small change request with async collaboration.

## Learning objectives

- Turn a change request into a focused test plan.
- Send clear async updates and defect reports.
- Collaborate with developers without blame.
- Make and communicate a release recommendation based on evidence.

## Concise theoretical explanation

An async update should answer: what changed, what you tested, what happened, what is blocked, and what you need next. Keep facts separate from interpretation. A good defect message describes impact and reproduction steps without blaming the person who wrote the code. State time zone and response needs when coordinating across regions; do not assume everyone is online at once.

For a release recommendation, describe evidence, severity of open issues, tested scope, and residual risk. Recommendations are not guarantees. If requirements or environment are unclear, ask a precise question and continue safe independent work. Keep test data dummy and evidence sanitized.

## Practical examples

“I completed the task filter checks on local build [commit]. 7/8 passed; one mismatch: Completed filter shows an active task after reload. Repro and sanitized response are in [link]. I have not checked Safari. Can you confirm whether the filter should persist across reload? I recommend holding this change until the mismatch is understood.”

## Guided practice

1. Use this simulated change request: “Task counts are now visible beside each filter. Verify the change and report whether it is ready.” Treat it as incomplete; list questions about count meaning and update timing.
2. Write a short risk-based test plan before using the application.
3. Execute related checks, including task state changes, reload, empty states, and narrow viewport.
4. File a report for any observed discrepancy; otherwise report “none observed in tested scope.”
5. Write an async stand-up update, one developer handoff, and a release recommendation with coverage limits.

## Assignment

**Tools:** TaskFlow local, browser, Markdown, timer. **Deliverable:** `submissions/job-preparation/remote-workday.md` with requirement questions, test plan, execution summary, one async update, one defect/developer handoff (or a no-defect finding), and a release recommendation. **Submission location:** `submissions/job-preparation/`.

## Definition of Done

- Updates are concise, factual, and understandable without a live meeting.
- Open questions, blockers, and next actions are named.
- Developer communication is respectful and reproducible.
- Release recommendation cites evidence and residual risk.

## Submission instructions

Save the simulation report under `submissions/job-preparation/` and share it for final competency review. Revise any unsupported release claim or unclear handoff.

## Optional extra credit

Rewrite the update for a teammate in a different time zone: add the needed handoff context without making it longer than necessary.
