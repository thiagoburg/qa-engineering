# Roadmap

This roadmap is milestone-based. Finish the practical checkpoint and correct any review findings before progressing. The target is professional junior QA competence, not completion of a fixed number of lessons.

## 1. Manual QA

**Goal:** Learn QA judgment and test real web software, including the web and browser concepts needed for the work.

1. [Thinking like a QA Engineer](manual-qa/01-thinking-like-a-qa-engineer.md) — quality, testing principles, SDLC/STLC, and static review.
2. [Web and browser fundamentals](manual-qa/02-web-and-browser-fundamentals.md) — client/server, HTML, CSS, DevTools, HTTP, and JSON, taught in the context of testing.
3. [Requirements, stories, and risk](manual-qa/03-requirements-and-risk.md) — static review, acceptance criteria, and risk-based planning.
4. [Test cases and test design](manual-qa/04-test-design.md) — partitions, boundaries, decision tables, and state transitions.
5. [Exploratory and web testing](manual-qa/05-exploratory-web-testing.md) — smoke/regression, responsive, cross-browser, usability, and accessibility basics.
6. [API testing](manual-qa/06-api-testing.md) — HTTP, REST, JSON, Postman, and authenticated behavior.
7. [SQL and data validation](manual-qa/07-sql-and-data.md) — read-only local D1 checks and ownership.
8. [Defects and release reporting](manual-qa/08-defects-and-release-reporting.md) — lifecycle, severity/priority, retest, and risk communication.
9. [Manual QA capstone](manual-qa/09-manual-capstone.md) — independent assessment on stable TaskFlow and a controlled training release.

**Mastery checkpoint:** Independently test an unfamiliar feature, create a risk-focused test set, report reproducible defects, and summarize residual risk.

There is no standalone setup or Windows Terminal stage. Web fundamentals are introduced in Manual QA before requirements and web test design.

## 2. Automation QA

**Goal:** Turn stable, valuable checks into reliable automated tests and explain their limits.

1. [Automation strategy](automation-qa/01-automation-strategy.md) — what to automate, where checks belong, and tradeoffs.
2. [Git, GitHub, and Markdown](automation-qa/02-git-github-markdown.md) — version control and review workflow when code and test artifacts are introduced.
3. [TypeScript for QA](automation-qa/03-typescript-for-qa.md) — the language features needed to understand and maintain tests.
4. [Playwright UI checks](automation-qa/04-playwright-ui.md) — accessible locators, assertions, fixtures, and isolation.
5. [API, authentication, and test data](automation-qa/05-api-auth-data.md) — API checks, safe auth state, and lifecycle.
6. [Debugging, reliability, and CI](automation-qa/06-debugging-ci-and-reports.md) — failures, traces, flakiness, and Actions.
7. [Automation capstone](automation-qa/07-automation-capstone.md) — independent TaskFlow suite and CI review.

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

Use invented accounts and local D1 for exercises. The app's public preview/production endpoints are for demonstration, not learner reset or destructive test runs. The reset script refuses remote targets. Stable `main` contains no intentional defect. The Manual QA capstone uses a separate reproducible training branch; its defect details are not revealed in the lesson. Never merge or deploy that branch to production.
