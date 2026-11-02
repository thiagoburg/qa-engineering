# QA Engineering Roadmap

A beginner-friendly, practice-first path to junior QA skills, including remote opportunities. The course has two sections: Manual QA and QA Automation. TaskFlow QA Lab is the practice application. Lessons are original and focus on QA work, not general software development.

## How to learn

For each lesson, read and understand the theory, complete the practice, and save your work in the relevant section's submissions folder. Then ask an AI reviewer to review the saved work. The reviewer should explain what is correct, what needs correction, what to practice again, and whether you should reinforce this skill or move to the next lesson. Correct important gaps before moving on. Reading alone does not pass a competency checkpoint.

Support decreases as you progress: early lessons give more steps, while later lessons ask you to plan and work independently. A checkpoint is passed only after the learner's work has been reviewed and important gaps have been corrected. Do not claim skills or progress that the evidence does not support.

For every lesson, ask: **Does this teach or practice something useful for becoming a QA engineer?** Every theory concept should be used naturally in the practice. If it does not fit, move it to a better lesson or remove it; do not invent an artificial exercise.

## Roadmap

### 1. Manual QA

1. [Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md) — QA's role, expected and actual behavior, evidence, and limits of testing.
2. [Web and Browser Fundamentals](manual-qa/02-web-and-browser-fundamentals.md) — browser/server roles, HTML/CSS, Developer Tools, HTTP, and JSON.
3. [Requirements, Stories, and Risk](manual-qa/03-requirements-and-risk.md) — testable expectations, unanswered questions, and risk priorities.
4. [Test Cases and Test Design](manual-qa/04-test-design.md) — equivalence partitions, boundaries, decision tables, and task states.
5. [Exploratory and Web Testing](manual-qa/05-exploratory-web-testing.md) — exploratory, smoke/regression, responsive, usability, and basic accessibility checks.
6. [API Testing with HTTP and Postman](manual-qa/06-api-testing.md) — requests, responses, validation, authentication, and user isolation.
7. [SQL and Data Validation](manual-qa/07-sql-and-data.md) — read-only checks against local D1.
8. [Defects, Retesting, and Release Reporting](manual-qa/08-defects-and-release-reporting.md) — reproducible reports, severity/priority, retesting, and remaining risk.
9. [TaskFlow Manual QA Capstone](manual-qa/09-manual-capstone.md) — an independent risk-focused test effort.

The Manual QA checkpoint is to test a feature from its documented behavior, prioritize risk, record reproducible evidence, and explain what remains untested.

Templates: [test plan](manual-qa/templates/test-plan-template.md), [test cases](manual-qa/templates/test-case-template.csv), [test execution](manual-qa/templates/test-execution-template.csv), and [bug report](manual-qa/templates/bug-report-template.md).

### 2. QA Automation

1. [Choosing What to Automate](automation-qa/01-automation-strategy.md) — value, risk, test layers, and tradeoffs.
2. [Git, GitHub, and Markdown](automation-qa/02-git-github-markdown.md) — review and publish changes using GitHub Desktop.
3. [TypeScript for QA](automation-qa/03-typescript-for-qa.md) — language needed to read, write, and maintain tests.
4. [Playwright UI Checks](automation-qa/04-playwright-ui.md) — accessible locators, assertions, fixtures, and isolation.
5. [API, Authentication, and Test Data](automation-qa/05-api-auth-data.md) — API checks, sessions, and safe data.
6. [Debugging, Reliability, and CI](automation-qa/06-debugging-ci-and-reports.md) — diagnose failures and understand GitHub Actions.
7. [TaskFlow Automation Capstone](automation-qa/07-automation-capstone.md) — an independent TypeScript/Playwright suite.

The Automation QA checkpoint is to build and debug an isolated suite, explain its coverage and limits, and interpret its CI result.

## Lesson format

Each lesson has only two learning sections: **Theory** explains the important ideas in clear English with QA-focused examples; **Practice** says what to do, which tools to use, and what to save. Lessons are in English, with new terms explained before they are used heavily.

## TaskFlow QA Lab

TaskFlow is a fictional task manager for QA practice. Its [Product Specification](taskflow-qa-lab/README.md#product-specification) is the source of truth. If the app and specification disagree, record what happened and the evidence; do not silently change the expected result.

The automation stack is TypeScript with Playwright Test; learn only the TypeScript needed to write, understand, debug, and maintain QA tests. No Python curriculum is used. Git and GitHub appear when code is introduced. Manual QA and API testing remain foundational. The app supports registration and sign-in, task creation/editing/completion/deletion, filters and counts, validation, an API, persistence, and account isolation. It uses a TypeScript Cloudflare Worker, D1 for tasks and account mapping, Supabase Auth for credentials and sessions, and Playwright Test. The test suite uses a local Worker, local D1, and a test-only Supabase Auth mock.

Follow the app README for [local setup](taskflow-qa-lab/README.md#run-locally), commands, API behavior, product expectations, and environment/deployment notes. Use local D1 for exercises. Reset commands target local D1 only. Do not use Preview or production for destructive practice.

## Safety and privacy

Use invented accounts and dummy data. Never commit real personal information, passwords, credentials, access tokens, service-role keys, authentication state, unredacted evidence, local databases, or ignored runtime files. Treat screenshots, traces, logs, and database output as potentially sensitive; redact before sharing.

The repository uses one branch, `main`, to keep the workflow simple. TaskFlow is a practice project, not a production service. One low-risk presentation difference is included for the Manual QA capstone; do not reveal its behavior before the learner completes that investigation. Keep authentication, task workflows, persistence, and user isolation usable.

## Repository map

- `manual-qa/` has the nine lessons and templates. Create `manual-qa/submissions/` as needed when a lesson asks you to save work.
- `automation-qa/` has the seven lessons. Create `automation-qa/submissions/` as needed when a lesson asks you to save work.
- `taskflow-qa-lab/` has the app, specification/setup guide, D1 migrations, local scripts, and Playwright tests.
- `.github/workflows/taskflow-qa.yml` runs the app's type check and Playwright suite and preserves reports and failure evidence.
- `README.md` is the roadmap, learning workflow, project context, and recovery guide.

Written learner work belongs in `manual-qa/submissions/` or `automation-qa/submissions/` as the lesson directs; create the folder when you first need it. Executable Playwright tests belong in `taskflow-qa-lab/tests/` so local runs and GitHub Actions can discover them; name them learner-authored. Keep notes and reports in the relevant section submissions folder. All learner work should be explainable and reproducible.

## CI, deployment, and learner status

GitHub Actions checks TypeScript types and Playwright behavior and saves reports and failure evidence. Cloudflare Workers Builds deploys from `main` with `taskflow-qa-lab` as its root directory. Preview and production use separate D1 databases. Local D1 is the learning environment.

The learner starts at Manual QA lesson 1. No learner submissions have been reviewed and no competency checkpoint has been passed. Do not invent progress or portfolio evidence.

The app, lessons, and templates were AI-assisted. Keep them distinct from learner-created submissions.

## Backup and recovery

The public [GitHub repository](https://github.com/thiagoburg/qa-engineering) stores committed course files, app source, migrations, templates, and learner work after you commit it. To restore on a new device, use GitHub Desktop to clone `thiagoburg/qa-engineering` into the desired folder. Then follow the app's [local setup guide](taskflow-qa-lab/README.md#run-locally).

Sign-in sessions, local databases, ignored runtime files, and Obsidian settings are not stored in GitHub. Recreate dependencies using the app setup guide. Pull the latest `main` before continuing. Commit learner work when ready for backup, after checking it contains no private information.

This is a public repository. Review submissions and evidence for personal information, credentials, tokens, or confidential material before committing.
