# Job Preparation 1: Curate an Honest QA Portfolio

## Introduction

A portfolio should make it easy for a hiring team to see how you think, what you tested, and what you can explain. A long list of files is not proof by itself.

## Learning objectives

- Select a small set of strong artifacts.
- Present the problem, method, evidence, and result clearly.
- Distinguish learner-created work from AI-assisted project material.
- Remove secrets and unsupported claims before sharing.

## Concise theoretical explanation

A reviewer needs context: the product/feature, risk, test approach, evidence, result, and known limitations. Prefer a few readable artifacts such as a test plan, reproducible bug report, execution/release summary, and automation suite. Explain decisions and tradeoffs; do not claim that passing tests proves the product is defect-free.

Provenance means who created or materially changed an artifact. This project includes AI-assisted application code and lesson drafts. Use `portfolio/PROVENANCE.md` and `CONTRIBUTION_LOG.md` to state that accurately. Learner submissions belong in `submissions/`; do not describe generated project code as independently authored. A public portfolio must not include real personal information, credentials, access tokens, private employer data, or unredacted traces.

## Practical examples

Weak: “Tested the whole app and it works.” Stronger: “Designed and executed 24 checks for task validation, filters, persistence, API errors, and account isolation on local build X; 22 passed, one failed, one was not run. The remaining risk is cross-browser coverage.”

## Guided practice

1. Review `portfolio/README.md`, `PROVENANCE.md`, and `CONTRIBUTION_LOG.md`.
2. Choose four artifacts that demonstrate different skills, not four versions of the same test.
3. Write a short index explaining the requirement, risk, your decision, evidence, and limitation for each.
4. Check every link from the repository root and remove secrets/personal data.
5. Ask a reviewer to locate your strongest evidence in two minutes and note where they got stuck.

## Assignment

**Tools:** GitHub repository, Markdown, existing reviewed submissions. **Deliverable:** update `portfolio/README.md` with a curated index of 3–5 reviewed artifacts, clear provenance statement, setup link, and scope/limitations. Do not fabricate results; if no reviewed learner artifacts exist yet, create a portfolio plan marked “planned,” not a claimed accomplishment. **Submission location:** learner copy in `submissions/job-preparation/portfolio-review.md`; proposed public edits go in a reviewed PR.

## Definition of Done

- Each featured item has purpose and evidence, not just a filename.
- AI-assisted and learner-created contributions are distinguished.
- Results are traceable to actual execution and environment.
- Public content has been checked for secrets and real personal data.

## Submission instructions

Save the review note in `submissions/job-preparation/`, share it for review, and make only accurate public portfolio edits. Keep the contribution log current.

## Optional extra credit

Write a 100-word project summary suitable for a GitHub profile, with no employment guarantee or unsupported proficiency claim.
