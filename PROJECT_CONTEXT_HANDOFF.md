# QA Engineering Project — Context Handoff

This file is a handoff for future chats or agents working in this repository. Read the root-level [master prompt](MASTER_PROMPT.md) for the original requirements. The latest learner direction in this handoff and `ROADMAP.md` supersedes conflicting curriculum details in the original prompt. The current checkout is `C:\Users\thiago\Syncthing\qa-engineerring`; the public GitHub repository is [`thiagoburg/qa-engineering`](https://github.com/thiagoburg/qa-engineering).

## Purpose

The project is a practical, milestone-based path for an absolute beginner in Argentina to build evidence for a first junior QA Engineer role, especially remote international roles. It is a learning environment, not a promise of employment. Keep all project material in English, concise, original, beginner-friendly, role-focused, and practice-first. Teach technical topics only to the depth needed for junior QA work; do not turn this into general developer training.

## Decisions that supersede the original prompt

The original prompt listed Python + Playwright/pytest as an initial candidate. The learner later approved a planning direction selecting **TypeScript + Playwright Test**. Continue with that single automation stack. Teach just enough TypeScript to read, write, debug, and maintain QA tests.

The learner also selected **Supabase Auth** after Cloudflare Workers rejected the proposed PBKDF2 iteration count. Keep Cloudflare Workers + D1 for the app/API/task persistence, and Supabase Auth for credential handling and tokens. Never weaken password hashing to fit an unsupported implementation.

The latest agreed course stages are:

1. Manual QA
2. Automation QA
3. Job Preparation

There is no standalone Foundations stage. The learner does not want a Windows Terminal lesson. Web/browser fundamentals were moved into Manual QA immediately after the introductory QA lesson. Git, GitHub, and Markdown were moved into Automation QA immediately before TypeScript and test-code work; teach this with GitHub Desktop so it does not become a separate command-line course. The original `MASTER_PROMPT.md` is preserved, but these newer decisions supersede its old Foundation-stage sequence.

Lessons are self-contained Markdown files and follow nine sections: Introduction, Learning objectives, Concise theoretical explanation, Practical examples, Guided practice, Assignment, Definition of Done, Submission instructions, and Optional extra credit. Every assignment should state tools, deliverables, and the path under `submissions/`. Progress is competency-based; reading or finishing a lesson does not pass a checkpoint.

## Repository map

- `MASTER_PROMPT.md` — original full project prompt, now published at the repository root.
- `ROADMAP.md` — linked course sequence, checkpoints, market evidence, and practice safety.
- `PROGRESS.md` — current learner position and milestone status.
- `PROJECT_BRIEF.md` — compact purpose, approach, technical direction, and success criteria.
- `manual-qa/` — nine lessons: QA thinking, web/browser fundamentals, requirements/risk, test design, exploratory/web testing, API/Postman, SQL/data checks, defects/release reporting, and independent capstone.
- `automation-qa/` — seven lessons: strategy, Git/GitHub/Markdown, TypeScript, Playwright UI, API/auth/test data, debugging/CI, and automation capstone.
- `job-preparation/` — four lessons: portfolio, English CV/LinkedIn, interviews/take-home work, and remote QA simulation.
- `taskflow-qa-lab/` — the practice web app, product specification, API guide, migrations, local setup, tests, and deployment notes.
- `templates/` — test plan, test case/execution CSV, and defect report templates.
- `submissions/` — learner-authored artifacts, kept separate from course/app materials.
- `portfolio/` — portfolio guidance, provenance, and contribution log.
- `.github/workflows/taskflow-qa.yml` — GitHub Actions workflow for TypeScript checks, Playwright tests, and failure artifacts.

## TaskFlow QA Lab

TaskFlow is a deliberately small task-management app. `taskflow-qa-lab/PRODUCT_SPEC.md` is the source of truth for expected behavior. It covers registration/sign-in/sign-out, task creation/editing/completion/deletion, filters, statistics, API behavior, validation, persistence, accessibility basics, and user isolation. Report differences from the specification; do not silently change expected behavior to match the implementation.

Architecture and tools:

- Cloudflare Worker serves the frontend and same-origin JSON API.
- Cloudflare D1 stores provider user mappings and user-owned tasks; SQL migrations are versioned.
- Supabase Auth manages passwords and sessions.
- TypeScript and Wrangler are used for the Worker/local app.
- Playwright Test is used for browser/API automation.
- GitHub Actions runs checks; Cloudflare Workers Builds handles deployment from Git integration.
- Local D1 is the learning environment. The reset command is `npm run db:reset:local` from `taskflow-qa-lab/`; it must remain local-only. Never run a training reset against a remote DB.
- Use only invented accounts and dummy task data. Do not use real credentials or personal/sensitive information.

Local startup is documented in `taskflow-qa-lab/README.md`. Local Auth configuration uses the ignored `.dev.vars` file, populated from `.dev.vars.example`; never commit it or expose secrets. The Supabase publishable key is public configuration; no service-role/secret key belongs in the frontend or Worker vars.

## Deployment and current infrastructure

The Supabase project is named “TaskFlow QA Lab” (project ref `yjhabgqboalukhzezwpc`; URL `https://yjhabgqboalukhzezwpc.supabase.co`). Email confirmation was disabled for the training project at the learner's request so invented accounts can be used immediately. Account security/project settings may change, so recheck them if auth behavior changes.

Cloudflare Workers Builds is connected to `thiagoburg/qa-engineering`, production branch `main`, app root `taskflow-qa-lab`, with Preview builds enabled. GitHub Actions is for tests and reports; Cloudflare owns Git-based deployment. D1 migrations have been applied separately to preview and production databases.

Previously verified public app endpoints:

- Production: `https://taskflow-qa-lab.taskflow-qa-lab.workers.dev`
- Preview: `https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev`

Both health endpoints returned `{"status":"ok"}` in the previous setup session. The Preview API was exercised with reserved dummy accounts, including auth, task CRUD, filters/stats, persistence, validation, and cross-account isolation. Those checks were against Preview; production received a health check, not the same full API exercise. A few disposable Supabase test identities may remain from the verification run; do not claim they were deleted.

## Git and branch safety

At the last verified sync before the latest course reorganization:

- `main` and `origin/main` were at `6f9a7197669a0df7b7bc7d05c1cd94b2d63062cd` (`Publish complete project backup and recovery guide`). This is the stable, learner-facing baseline; check the current `main` ref after later commits.
- `training/taskflow-release-01` and its remote are both at `e1c2bb6612b229bed4b1e45db1fe1661e20e7dfc` (`Add isolated Manual QA training release`).
- GitHub Actions run [`41242821692`](https://github.com/thiagoburg/qa-engineering/actions/runs/41242821692) for the curriculum commit completed successfully.
- The working checkout was returned to `main`. The master prompt and Obsidian vault settings are now published for backup. `.dev.vars`, `.wrangler`, `node_modules`, and generated test artifacts remain excluded because they are local configuration/state or reproducible output.

The training branch contains one intentionally introduced behavior mismatch for the Manual QA capstone. Its details are deliberately absent from learner instructions and this handoff. Do not merge it into `main` or deploy it to production. The learner should use that branch only when reaching the capstone, against fresh local D1. Preserve its reproducibility; if correcting it for review, use a separate fix branch. If the learner asks for feedback before submitting their own findings, do not spoil the exercise defect.

GitHub may show “Compare and pull request” after the training branch push. That is an automatic prompt, not an instruction to create a PR. No PR is needed for this standalone exercise branch.

## Learner progress and next action

`PROGRESS.md` says the learner starts at **Manual QA 1: Thinking like a QA Engineer**; no assignments or mastery checkpoints have been completed/reviewed. The course materials and app environment are ready; personal learning outcomes are not complete. The next step is to complete `manual-qa/01-thinking-like-a-qa-engineer.md`, save its deliverables under `submissions/manual-qa/`, and request a review. Do not mark progress complete without reviewing actual learner work and requiring corrections where needed.

## Provenance and collaboration

The initial app, curriculum drafts, templates, and documentation were AI-assisted. `portfolio/CONTRIBUTION_LOG.md` records this and states that the learner has not yet completed submissions. Keep that distinction accurate. A learner may present only work they can explain and reproduce independently; portfolio facts must be based on actual evidence, not placeholders or invented results.

When continuing work, read this handoff and the master prompt first, check `git status` and current remote refs, preserve the stable/training branch boundary, and make focused changes. Do not claim app tests were manually run unless they actually were; a passing GitHub Actions run is evidence only for the checks configured in that workflow.
