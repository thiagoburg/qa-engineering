# QA Engineering Project — Context Handoff

Use this file to continue work in a future chat or agent. Read [MASTER_PROMPT.md](MASTER_PROMPT.md) for the original requirements. The learner's latest directions here and in [ROADMAP.md](ROADMAP.md) define the current course scope. Repository: [thiagoburg/qa-engineering](https://github.com/thiagoburg/qa-engineering). The current local folder is `C:\Users\thiago\Syncthing\qa-engineerring`.

## Purpose and course structure

This is a beginner-friendly, practice-first QA learning project. Keep learner materials in English and focused on skills useful for QA work. The active course has exactly two sections:

1. **Manual QA** — nine lessons covering QA judgment, web/browser basics, requirements, risk, test design, exploratory testing, APIs, data checks, defect reporting, and a capstone.
2. **QA Automation** — seven lessons covering strategy, Git/GitHub, TypeScript, Playwright, API/auth checks, debugging/CI, and a capstone.

Job Preparation and a standalone Foundations section are not part of the active course. The original prompt is preserved as a historical source; newer learner direction supersedes it where scope differs.

Lessons follow nine sections: introduction, objectives, concise theory, examples, guided practice, assignment, Definition of Done, submission instructions, and optional extra credit. Each assignment identifies tools, deliverables, and a path inside its section's `submissions/` folder. Review evidence before advancing or updating progress.

## Repository map

- `README.md`, `ROADMAP.md`, `PROGRESS.md`, `PROJECT_BRIEF.md` — start page, course sequence, learner status, and concise brief.
- `MASTER_PROMPT.md` — original project prompt; preserve its content unless asked to edit it.
- `manual-qa/` — nine lessons, `templates/`, and learner `submissions/`.
- `automation-qa/` — seven lessons and learner `submissions/`.
- `taskflow-qa-lab/` — practice app, product specification, migrations, local setup, tests, and deployment notes.
- `BACKUP_AND_RECOVERY.md` — clone, local setup, backup, and training branch instructions.
- `SOURCES.md` — research and official platform references used during authoring.
- `.github/workflows/` — GitHub Actions checks and failure evidence.

## TaskFlow and safety

`taskflow-qa-lab/PRODUCT_SPEC.md` is the source of truth for app behavior. The app uses Cloudflare Workers, D1, Supabase Auth, TypeScript, and Playwright Test. GitHub Actions runs tests; Cloudflare Git integration deploys from `main`. Develop locally first and use invented accounts and dummy data only.

Keep stable `main` defect-free. The separate `training/taskflow-release-01` branch contains a reproducible intentional defect for the Manual QA capstone. Do not merge it into `main`, deploy it, or disclose its behavior before the learner's review. The local reset command must target only local D1.

## Credentials and external services

Never commit `.dev.vars`, passwords, auth tokens, service-role keys, or private information. Public Supabase URL/key configuration may be present in the tracked Wrangler config; no secret key belongs in app code. Cloudflare, GitHub, and Supabase sessions are not stored in the repository and may need reauthorization after a restore.

## Learner status and provenance

The learner starts at Manual QA 1, with no reviewed submissions or passed checkpoints. Save the first assignment in `manual-qa/submissions/`. Do not claim mastery or update `PROGRESS.md` without reviewing actual learner work.

The app, lessons, and templates were AI-assisted. Keep that provenance clear; learner-created work should be work the learner can explain and reproduce. Do not fabricate portfolio evidence.

## Working safely

Check `git status`, current branch, and remote state before editing. Preserve local Obsidian workspace changes. Keep the stable/training branch boundary intact. Do not add or run tests unless asked; if a requested verification is performed, report its actual result.
