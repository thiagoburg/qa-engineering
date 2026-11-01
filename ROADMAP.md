# Roadmap

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
