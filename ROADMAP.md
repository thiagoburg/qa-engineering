# Roadmap

This roadmap is milestone-based. Finish the practical checkpoint and correct any review findings before progressing. The target is professional junior QA competence, not completion of a fixed number of lessons.

## 0. Foundations

**Goal:** Set up and use the tools needed for QA without studying web development broadly.

1. [Your QA workspace](foundations/01-your-qa-workspace.md) — folders, Windows Terminal, and safe file operations.
2. [Git, GitHub, and Markdown](foundations/02-git-github-markdown.md) — save, describe, and share QA work.
3. [Web and browser inspection](foundations/03-web-and-browser-tools.md) — client/server, HTML, CSS, DevTools, HTTP, and JSON.

**Mastery checkpoint:** Follow the repository workflow, inspect TaskFlow with browser tools, and explain one request/response using evidence.

## 1. Manual QA

**Goal:** Analyze behavior, design useful tests, execute them, and communicate risk and defects.

1. [Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md) — quality, testing principles, SDLC/STLC, and static review.
2. [Requirements, stories, and risk](manual-qa/02-requirements-and-risk.md) — static review, acceptance criteria, and risk-based planning.
3. [Test cases and test design](manual-qa/03-test-design.md) — partitions, boundaries, decision tables, and state transitions.
4. [Exploratory and web testing](manual-qa/04-exploratory-web-testing.md) — smoke/regression, responsive, usability, and accessibility basics.
5. [API testing](manual-qa/05-api-testing.md) — HTTP, REST, JSON, Postman, and authenticated behavior.
6. [SQL and data validation](manual-qa/06-sql-and-data.md) — read-only local D1 checks and ownership.
7. [Defects and release reporting](manual-qa/07-defects-and-release-reporting.md) — lifecycle, severity/priority, retest, and risk communication.
8. [Manual QA capstone](manual-qa/08-manual-capstone.md) — independent assessment on stable TaskFlow.

**Mastery checkpoint:** Independently test an unfamiliar feature, create a risk-focused test set, report reproducible defects, and summarize residual risk.

## 2. Automation QA

**Goal:** Turn stable, valuable checks into reliable automated tests and explain their limits.

1. [Automation strategy](automation-qa/01-automation-strategy.md) — what to automate, where checks belong, and tradeoffs.
2. [TypeScript for QA](automation-qa/02-typescript-for-qa.md) — the language features needed to understand and maintain tests.
3. [Playwright UI checks](automation-qa/03-playwright-ui.md) — accessible locators, assertions, fixtures, and isolation.
4. [API, authentication, and test data](automation-qa/04-api-auth-data.md) — API checks, safe auth state, and lifecycle.
5. [Debugging, reliability, and CI](automation-qa/05-debugging-ci-and-reports.md) — failures, traces, flakiness, and Actions.
6. [Automation capstone](automation-qa/06-automation-capstone.md) — independent TaskFlow suite and CI review.

**Mastery checkpoint:** Build and debug a small isolated suite, explain its coverage, and interpret a CI failure without step-by-step instructions.

## 3. Job Preparation

**Goal:** Present honest evidence of practical QA competence and communicate it clearly.

1. [Portfolio curation](job-preparation/01-portfolio-curation.md) — select evidence and state provenance honestly.
2. [English CV and LinkedIn](job-preparation/02-cv-and-linkedin.md) — present verified skills without invented claims.
3. [Interviews and take-home exercises](job-preparation/03-interviews-and-take-home.md) — practice structured answers and practical tasks.
4. [Remote QA simulation](job-preparation/04-remote-qa-simulation.md) — async collaboration, handoffs, and release recommendations.

**Mastery checkpoint:** Complete a realistic take-home task, present findings and tradeoffs, and distinguish personal work from AI assistance.

## Job-market evidence

The October 31, 2026 snapshot found 23 remote QA roles open to Argentina in one employer-linked inventory. Its listing tags show Playwright, CI/CD, and test automation are common, while most listings that state a level are senior. A separate junior listing asked for Playwright and Postman. This small snapshot supports the selected TypeScript + Playwright Test stack but does not guarantee junior openings. Recheck current postings before the Automation QA stage. See [SOURCES.md](SOURCES.md).

## Lesson format and assessment

Every lesson is an independent Markdown file with the same nine parts: introduction, objectives, concise theory, practical examples, guided practice, assignment, Definition of Done, submission instructions, and optional extra credit. Assignments name their tools, artifact, and `submissions/` location. Support decreases from demonstration and guided practice to independent practice and mastery assessment. The learner must submit work for review; lesson availability is not evidence of mastery.

## Local practice safety

Use invented accounts and local D1 for exercises. The app's public preview/production endpoints are for demonstration, not learner reset or destructive test runs. The reset script refuses remote targets. Stable `main` contains no intentional defect; no defective training release is currently published. Capstone findings are based on actual behavior against the product specification. A separate reproducible training release can be added later without changing the stable baseline.
