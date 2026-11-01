# QA Engineer Roadmap

A practical learning path for a beginner, built around Manual QA and QA Automation. TaskFlow QA Lab is the practice application.

## Start here

1. Read the roadmap below.
2. Begin with [Manual QA 1: Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md).
3. Save each assignment in the `submissions/` folder inside its section.
4. Request a review before moving past a mastery checkpoint. Reading lessons alone does not pass a checkpoint.

For a fresh clone or recovery, see [Backup and Recovery](#backup-and-recovery). The original requirements are in [CONTEXT.md](CONTEXT.md); the [project context](CONTEXT.md) records current decisions.

## Sections

| Section | Focus |
| --- | --- |
| [1. Manual QA](manual-qa/) | QA thinking, web and browser basics, requirements, risk, test design, execution, API/data checks, defects, and capstone |
| [2. QA Automation](automation-qa/) | Automation strategy, Git/GitHub, TypeScript, Playwright, API checks, debugging, CI, and capstone |

## TaskFlow QA Lab

TaskFlow is a small task manager for practice. Its expected behavior is defined in the [product specification](taskflow-app/PRODUCT_SPEC.md). Run it locally with `npm ci`, `npm run db:migrate:local`, and `npm run dev` from `taskflow-app/`.

Use invented accounts and dummy data only. Do not enter real credentials or personal information.

Manual QA templates: [test plan](manual-qa/templates/test-plan-template.md), [test case](manual-qa/templates/test-case-template.csv), [test execution](manual-qa/templates/test-execution-template.csv), and [bug report](manual-qa/templates/bug-report-template.md).

## Project integrity and progress

The application and learning materials were AI-assisted. Learner submissions must reflect work the learner can explain and reproduce. Keep that distinction clear, and never include credentials or private data in this public repository.

Begin with [Manual QA 1](manual-qa/01-thinking-like-a-qa-engineer.md) and save work in `manual-qa/submissions/`. The stable app follows [PRODUCT_SPEC.md](taskflow-app/PRODUCT_SPEC.md) and contains no intentional defects.

---

## Roadmap

### Learning Roadmap

Learn through practical assignments. Complete each checkpoint and address review feedback before moving to the next section.

## 1. Manual QA

**Goal:** Learn QA judgment and test web software, including the browser concepts needed for testing.

1. [Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md) — quality, testing principles, SDLC/STLC, and static review.
2. [Web and browser fundamentals](manual-qa/02-web-and-browser-fundamentals.md) — client/server, HTML, CSS, DevTools, HTTP, and JSON in the context of testing.
3. [Requirements, stories, and risk](manual-qa/03-requirements-and-risk.md) — acceptance criteria and risk-based planning.
4. [Test cases and test design](manual-qa/04-test-design.md) — partitions, boundaries, decision tables, and state transitions.
5. [Exploratory and web testing](manual-qa/05-exploratory-web-testing.md) — smoke/regression, responsive, cross-browser, usability, and accessibility basics.
6. [API testing](manual-qa/06-api-testing.md) — HTTP, REST, JSON, Postman, and authenticated behavior.
7. [SQL and data validation](manual-qa/07-sql-and-data.md) — read-only local D1 checks and data ownership.
8. [Defects and release reporting](manual-qa/08-defects-and-release-reporting.md) — defect lifecycle, severity/priority, retest, and risk communication.
9. [Manual QA capstone](manual-qa/09-manual-capstone.md) — independent assessment on stable TaskFlow and a controlled training release.

**Checkpoint:** Independently test an unfamiliar feature, create a risk-focused test set, report reproducible defects, and summarize residual risk.

Save work in [`manual-qa/submissions/`](manual-qa/submissions/). Templates are in [`manual-qa/templates/`](manual-qa/templates/).

## 2. QA Automation

**Goal:** Turn valuable checks into reliable automated tests and explain their limits.

1. [Automation strategy](automation-qa/01-automation-strategy.md) — what to automate, where checks belong, and tradeoffs.
2. [Git, GitHub, and Markdown](automation-qa/02-git-github-markdown.md) — version control and review workflow as code and test artifacts are introduced.
3. [TypeScript for QA](automation-qa/03-typescript-for-qa.md) — the language features needed to understand and maintain tests.
4. [Playwright UI checks](automation-qa/04-playwright-ui.md) — accessible locators, assertions, fixtures, and isolation.
5. [API, authentication, and test data](automation-qa/05-api-auth-data.md) — API checks, safe auth state, and test data lifecycle.
6. [Debugging, reliability, and CI](automation-qa/06-debugging-ci-and-reports.md) — failures, traces, flakiness, and GitHub Actions.
7. [Automation capstone](automation-qa/07-automation-capstone.md) — independent TaskFlow suite and CI review.

**Checkpoint:** Build and debug a small isolated suite, explain its coverage, and interpret a CI failure independently.

Save work in [`automation-qa/submissions/`](automation-qa/submissions/).

## Lesson and practice rules

Each lesson uses nine sections: introduction, objectives, concise theory, examples, guided practice, assignment, Definition of Done, submission instructions, and optional extra credit. Support decreases as skills build. Submit practical work for review; lesson availability is not evidence of mastery.

Use invented accounts and local D1 for exercises. Public app endpoints are for demonstration, not destructive test runs. The reset script only targets local D1. Stable `main` contains no intentional defect; the Manual QA capstone uses a separate reproducible training branch. Do not merge or deploy that branch to production.

---

## Backup and Recovery

### Backup and Recovery Guide

The public [GitHub repository](https://github.com/thiagoburg/qa-engineering) stores project files and committed learner submissions. It includes the two course sections, app source, migrations, templates, master prompt, and project notes.

## Restore the project

In PowerShell, clone the repository and start the app:

```powershell
git clone https://github.com/thiagoburg/qa-engineering.git
Set-Location qa-engineering/taskflow-qa
npm ci
npm run db:migrate:local
npm run dev
```

The local app opens at `http://localhost:8787`. Optional local overrides belong in ignored `.dev.vars`; never add secrets or real credentials to Git.

Start at [Manual QA 1](manual-qa/01-thinking-like-a-qa-engineer.md). Save learner work inside its section: `manual-qa/submissions/` or `automation-qa/submissions/`. Commit reviewed work when it is ready for backup. Update the checkpoint status in this README after reviewing evidence.

## Recover the training branch

The stable app and course are on `main`. Fetch `training/taskflow-release-01` only when the Manual QA capstone calls for it. Use fresh local D1 data. The `db:reset:local` command from `taskflow-app/` targets local D1 only. Do not merge the training branch into `main` or deploy it to production.

## What is not stored in GitHub

Sign-in sessions, service access, local databases, and ignored runtime files are not part of the repository. Recreate dependencies with `npm ci`; sign in to Cloudflare, GitHub, and Supabase as needed. Obsidian workspace history and `.trash/` are local device state.

This is a public repository. Remove personal information, credentials, access tokens, and confidential material before committing learner submissions.
