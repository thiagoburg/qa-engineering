# QA Engineer Roadmap

A practical, milestone-based path from beginner to junior QA Engineer, with a small web application for hands-on practice.

## Start here

1. Read [the roadmap](ROADMAP.md) and [project brief](PROJECT_BRIEF.md).
2. Begin with [Manual QA 1: Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md).
3. Follow each lesson's assignment and save your work in `submissions/` under the relevant stage.
4. Ask for a review in the project chat before moving past a mastery checkpoint. Lessons are ready-to-use, but checkpoints are passed only after practical evidence is reviewed.

For a fresh clone or local recovery, follow [Backup and Recovery](BACKUP_AND_RECOVERY.md). The original requirements are in [the master prompt](MASTER_PROMPT.md), and [the context handoff](PROJECT_CONTEXT_HANDOFF.md) records project decisions and status.

## Learning stages

| Stage | Focus | Status |
| --- | --- | --- |
| Manual QA | QA thinking, web/browser basics, requirements, risk, test design, execution, API/data checks, defects, and capstone | Lessons ready; learner progress active |
| Automation QA | Strategy, Git/GitHub, TypeScript, Playwright Test, browser/API checks, debugging, and CI | Lessons ready; gated by Manual QA mastery |
| Job Preparation | Portfolio, CV, interviews, and remote-team practice | Lessons ready; gated by Automation QA mastery |

## TaskFlow QA Lab

TaskFlow is a deliberately small task manager used to practise QA. Its behavior is defined in [the product specification](taskflow-qa-lab/PRODUCT_SPEC.md). Run it locally with `npm ci`, `npm run db:migrate:local`, and `npm run dev` from `taskflow-qa-lab/`.

Use invented email addresses and passwords in this public learning project. Do not enter real credentials or personal information.

Templates: [test plan](templates/test-plan-template.md), [test case](templates/test-case-template.csv), [test execution](templates/test-execution-template.csv), and [bug report](templates/bug-report-template.md).

## Portfolio integrity

Do not present AI-assisted application code or lesson content as work you completed independently. Record your contribution and assistance in [the portfolio provenance guide](portfolio/PROVENANCE.md). Learner submissions belong in the stage-specific `submissions/` directory.

## Current checkpoint

All roadmap lessons are authored. Begin with [Manual QA 1](manual-qa/01-thinking-like-a-qa-engineer.md), save the assignment under `submissions/manual-qa/`, and request review. Current learner status and checkpoint gates are in [PROGRESS.md](PROGRESS.md). All app expectations come from [PRODUCT_SPEC.md](taskflow-qa-lab/PRODUCT_SPEC.md); the stable app contains no intentional defects.
