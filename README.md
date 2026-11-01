# QA Engineer Roadmap

A practical, milestone-based path from beginner to junior QA Engineer, with a small web application for hands-on practice.

## Start here

1. Read [the roadmap](ROADMAP.md) and [project brief](PROJECT_BRIEF.md).
2. Begin with [Foundations 1: Your QA workspace](foundations/01-your-qa-workspace.md).
3. Follow each lesson's assignment and save your work in `submissions/` under the relevant stage.
4. Ask for a review in the project chat before moving past a mastery checkpoint. Lessons are ready-to-use, but checkpoints are passed only after practical evidence is reviewed.

For a fresh clone or local recovery, follow [Backup and Recovery](BACKUP_AND_RECOVERY.md). The original requirements are in [the master prompt](master-prompt-qa-engineering.md), and [the context handoff](PROJECT_CONTEXT_HANDOFF.md) records project decisions and status.

## Learning stages

| Stage | Focus | Status |
| --- | --- | --- |
| Foundations | Your workspace, command line, Git, web basics, browser tools, and HTTP | Lessons ready; learner progress active |
| Manual QA | Requirements, risk, test design, execution, web/API/data checks, defects, and capstone | Lessons ready; gated by Foundations mastery |
| Automation QA | TypeScript, Playwright Test, reliable browser/API checks, debugging, and CI | Lessons ready; gated by Manual QA mastery |
| Job Preparation | Portfolio, CV, interviews, and remote-team practice | Lessons ready; gated by Automation QA mastery |

## TaskFlow QA Lab

TaskFlow is a deliberately small task manager used to practise QA. Its behavior is defined in [the product specification](taskflow-qa-lab/PRODUCT_SPEC.md). Run it locally with `npm install`, `npm run db:migrate:local`, and `npm run dev` from `taskflow-qa-lab/`.

Use invented email addresses and passwords in this public learning project. Do not enter real credentials or personal information.

Reusable [test plan, test case, execution, and bug report templates](templates/) are provided for assignments.

## Portfolio integrity

Do not present AI-assisted application code or lesson content as work you completed independently. Record your contribution and assistance in [the portfolio provenance guide](portfolio/PROVENANCE.md). Learner submissions belong in the stage-specific `submissions/` directory.

## Current checkpoint

All roadmap lessons are authored. The first assignment is [Foundations 1](foundations/01-your-qa-workspace.md); save its artifact in `submissions/foundations/` and request review. Current learner status and checkpoint gates are in [PROGRESS.md](PROGRESS.md). All app expectations come from [PRODUCT_SPEC.md](taskflow-qa-lab/PRODUCT_SPEC.md); the stable app contains no intentional defects.
