# Project Context

Last updated: 2026-11-01

## Purpose and audience

This is Thiago's beginner-friendly, practice-first QA Engineering learning project. The goal is to build the practical judgment and portfolio evidence to pursue a junior QA role, including remote international work. The learner starts as an absolute beginner. Keep the project in English, concise, realistic, and focused on QA rather than general software development.

This file is the current handoff for future chats and agents. The root README is the learner start page. The TaskFlow app README is the source of truth for app behavior and setup. Do not recreate outdated plans or duplicate lesson/source content here.

Repository: https://github.com/thiagoburg/qa-engineering
Current local folder: C:\Users\thiago\Syncthing\qa-engineering

## Course structure

The active course has exactly two sections. There is no standalone Foundations or Job Preparation section.

### Manual QA

1. Thinking Like a QA Engineer — quality, testing principles, SDLC/STLC, and static review.
2. Web and Browser Fundamentals — client/server, HTML/CSS, DevTools, HTTP, and JSON for testing.
3. Requirements, Stories, and Risk — acceptance criteria, ambiguity, and risk-based planning.
4. Test Cases and Test Design — partitions, boundaries, decision tables, and state transitions.
5. Exploratory and Web Testing — smoke/regression, responsive, cross-browser, usability, and accessibility basics.
6. API Testing — HTTP, REST, JSON, Postman, and authenticated behavior.
7. SQL and Data Validation — read-only local D1 checks and data ownership.
8. Defects and Release Reporting — evidence, severity/priority, retesting, regression, and release risk.
9. Manual QA Capstone — independent, risk-based test design and execution on local TaskFlow.

### QA Automation

1. Automation Strategy — what to automate, test layers, and tradeoffs.
2. Git, GitHub, and Markdown — practical repository and review workflow as code is introduced.
3. TypeScript for QA — only the language needed to read, write, and maintain QA tests.
4. Playwright UI Checks — accessible locators, assertions, fixtures, and isolation.
5. API, Authentication, and Test Data — API automation, sessions, and safe test data.
6. Debugging, Reliability, and CI — failures, traces, flakiness, reports, and GitHub Actions.
7. Automation Capstone — independent TypeScript/Playwright suite and CI review.

Every lesson is self-contained and has nine sections: introduction, objectives, concise theory, examples, guided practice, assignment, Definition of Done, submission instructions, and optional extra credit. Assistance decreases gradually. Review practical submissions and address important feedback before recording mastery; reading lessons alone is not a checkpoint.

Web fundamentals belong in Manual QA. Git/GitHub is introduced with code in Automation QA. Do not add a Windows-terminal lesson or teach programming beyond practical QA needs. Provide beginner-friendly PowerShell commands only when a task requires them.

## Repository map

- README.md: starting instructions, roadmap, templates, progress guidance, and backup/recovery.
- CONTEXT.md: this current project handoff.
- manual-qa/: nine lessons, templates/, and learner submissions/.
- automation-qa/: seven lessons and learner submissions/.
- taskflow-app/: TaskFlow source, app documentation/product specification, D1 migrations, local scripts, and Playwright suite.
- .github/workflows/taskflow-qa.yml: CI checks and failure-artifact upload.

Learner deliverables belong in the section's submissions folder as named by the relevant lesson. The submissions README files explain portfolio provenance and safe evidence handling.

## TaskFlow QA Lab

TaskFlow is a small task manager for manual and automated testing practice, not a commercial or supported production service. Its specification is embedded in taskflow-app/README.md under Product Specification and is the expected-behavior oracle. If observed behavior differs, record evidence against that specification.

The app includes registration, sign-in/out, task creation/edit/completion/deletion, task filters and statistics, persistence, validation, an API, accessible interaction requirements, and account isolation. API routes and full expected behavior are documented in the app README.

Technology: TypeScript Worker on Cloudflare Workers; D1 stores task data and the user ID/email mapping; Supabase Auth handles credentials and access tokens; Playwright Test covers UI/API workflows. Passwords are not stored in TaskFlow D1.

### Local setup and safety

From taskflow-app/, run npm ci, npm run db:migrate:local, and npm run dev. The app normally opens at http://localhost:8787. Public Supabase URL/publishable-key configuration is in wrangler.jsonc. An ignored .dev.vars file is optional for local overrides; never add secret/service-role keys there or to Git.

The Playwright test stack starts a local Worker on port 8787 and a local Supabase Auth mock on port 8788. It uses local D1 and does not contact Supabase. Run npm run typecheck and npm test from taskflow-app/ when verifying app changes. npm run db:reset:local is hard-coded for local D1 only; never target remote/production data for learning.

Use invented accounts and dummy data. Do not enter or commit real personal information, credentials, passwords, tokens, service-role keys, auth state, or unredacted evidence. Public Preview/production are for demonstration; destructive practice belongs on local D1.

## Practice build and defect boundary

The repository and app have one branch: main. The app contains one intentionally introduced, low-risk presentation defect for the Manual QA capstone. It must not affect authentication, task data, persistence, or account isolation. Its exact behavior is deliberately omitted from learner-facing instructions and this handoff. Do not reveal it before the learner has completed the capstone investigation.

Use main and local D1 for all course work. The Product Specification remains the expected-behavior source. Keep the app usable for continuing lessons; do not introduce data-corrupting, account/security, or core-workflow defects.

## CI and deployment

GitHub Actions runs on pull requests and pushes to main. It uses Node.js 22, installs with npm ci, runs TypeScript typecheck and Playwright, and uploads report/failure artifacts for 14 days.

Cloudflare Workers Builds deploys main and creates branch/PR previews. Production and Preview use separate D1 databases. Last recorded Worker URLs:
- Production: https://taskflow-qa-lab.taskflow-qa-lab.workers.dev
- Preview: https://taskflow-qa-lab-preview.taskflow-qa-lab.workers.dev

The last recorded Cloudflare Workers Builds root was the old taskflow-qa-lab directory. Verify/update it to taskflow-app before relying on a new deployment. A push to main can publish the practice-only presentation issue; this is intentional for Thiago's single-learner project. Do not use real or sensitive data.

Supabase's project is configured for practice accounts with email confirmation disabled. Project sessions and local databases are not stored in GitHub and may need recreation/reauthorization on a new device.

## Learner status and provenance

Thiago is starting at Manual QA lesson 1. No learner submissions have been reviewed and no mastery checkpoints have been passed. Do not claim mastery or fabricate portfolio evidence. The app, lessons, and templates were AI-assisted; learner submissions must be work Thiago can explain and reproduce.

## Collaboration preferences

Keep explanations concise, clear, and practical for a beginner. Explain new terminology before relying on it. Review the learner's evidence and provide focused corrections. Do not claim tests, deployments, external configuration, or mastery succeeded unless verified. Preserve local Obsidian/device state. When syncing is authorized, commit only project files and verify the GitHub state afterward.
