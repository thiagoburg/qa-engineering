# QA Engineer Roadmap

A practical learning path for a beginner, built around Manual QA and QA Automation. TaskFlow QA Lab is the practice application.

## Start here

1. Read the [roadmap](ROADMAP.md) and [project brief](PROJECT_BRIEF.md).
2. Begin with [Manual QA 1: Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md).
3. Save each assignment in the `submissions/` folder inside its section.
4. Request a review before moving past a mastery checkpoint. Reading lessons alone does not pass a checkpoint.

For a fresh clone or recovery, see [Backup and Recovery](BACKUP_AND_RECOVERY.md). The original requirements are in [MASTER_PROMPT.md](MASTER_PROMPT.md); the [context handoff](PROJECT_CONTEXT_HANDOFF.md) records current decisions.

## Sections

| Section | Focus |
| --- | --- |
| [1. Manual QA](manual-qa/) | QA thinking, web and browser basics, requirements, risk, test design, execution, API/data checks, defects, and capstone |
| [2. QA Automation](automation-qa/) | Automation strategy, Git/GitHub, TypeScript, Playwright, API checks, debugging, CI, and capstone |

## TaskFlow QA Lab

TaskFlow is a small task manager for practice. Its expected behavior is defined in the [product specification](taskflow-qa-lab/PRODUCT_SPEC.md). Run it locally with `npm ci`, `npm run db:migrate:local`, and `npm run dev` from `taskflow-qa-lab/`.

Use invented accounts and dummy data only. Do not enter real credentials or personal information.

Manual QA templates: [test plan](manual-qa/templates/test-plan-template.md), [test case](manual-qa/templates/test-case-template.csv), [test execution](manual-qa/templates/test-execution-template.csv), and [bug report](manual-qa/templates/bug-report-template.md).

## Project integrity and progress

The application and learning materials were AI-assisted. Learner submissions must reflect work the learner can explain and reproduce. Keep that distinction clear, and never include credentials or private data in this public repository.

Begin with [Manual QA 1](manual-qa/01-thinking-like-a-qa-engineer.md) and save work in `manual-qa/submissions/`. Current learner status and checkpoint gates are in [PROGRESS.md](PROGRESS.md). The stable app follows [PRODUCT_SPEC.md](taskflow-qa-lab/PRODUCT_SPEC.md) and contains no intentional defects.
