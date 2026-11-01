# Automation QA 2: Git, GitHub, and Markdown

## Introduction

As you begin editing test code, Git helps you review and record changes, and GitHub keeps the shared repository. This lesson introduces that workflow at the point you are ready to use it. It uses GitHub Desktop's visual interface; you do not need a Windows Terminal lesson for this workflow.

## Learning objectives

You will understand a repository, a commit, and a remote; inspect a code or Markdown change; and record it in a small branch without publishing an unreviewed change.

## Concise theoretical explanation

**Git** is version-control software. A **repository** is a folder whose changes Git tracks. A **commit** is a named snapshot of selected changes. **GitHub** hosts repositories online; a **remote** is the saved address of an online copy. A **branch** is a separate line of changes, useful for trying work without changing the stable branch. A **diff** shows what changed between versions.

GitHub Desktop provides a graphical view of changed files, diffs, branches, and commits. The usual workflow is: edit, review the diff, select the intended files, write a short commit summary, and commit locally. After review, push the branch to GitHub and open a pull request to propose merging it. A pull request is a reviewable request to merge a branch. Markdown is plain text with lightweight formatting: `#` creates a heading, `-` creates a list item, and backticks mark code or a filename.

If GitHub Desktop is not installed, install it from the [official GitHub Desktop site](https://desktop.github.com/). Add the existing `qa-engineering` local repository; do not clone a second copy into the project folder.

The change review matters: stage only the files you intend to include, read the full diff, and never commit credentials, test output, or unrelated personal files. A commit stays on your computer until pushed.

## Practical examples

```markdown
# Test note

- Page: Task list
- Result: The heading is visible.
- Evidence: Screenshot saved as `task-list.png`.
```

This is readable as plain text and renders as a heading and three bullets on GitHub.

## Guided practice

1. Open the project in GitHub Desktop and confirm the current repository and branch in the upper-left controls.
2. Make a small change to a copied practice Markdown note or a learner-authored test file; do not edit the stable product behavior.
3. In **Changes**, inspect the diff and confirm that it contains only your intended edit. Select only that file.
4. Enter a concise summary, such as `Document task filter check`, then create a local commit.
5. Confirm that the commit appears in **History**. Do not push or open a pull request until the work is reviewed.

## Assignment

**Tools:** GitHub Desktop, GitHub, an editor, and a reviewed practice test or Markdown artifact. **Deliverable:** `automation-qa/submissions/git-workflow.md` with a screenshot or written record of the branch, the reviewed diff, and the local commit summary. Explain why you included only the intended file and when a pull request is appropriate. **Submission location:** `automation-qa/submissions/`.

## Definition of Done

- The note is saved under `automation-qa/submissions/`.
- The recorded diff contains only the intended file and no credentials or unrelated changes.
- The local commit exists on a branch and has a clear summary.
- The learner explains that a local commit is not yet published to GitHub.

## Submission instructions

Save the note under `automation-qa/submissions/` and share it in the project chat for review. After review, push the reviewed branch using GitHub Desktop. Open a pull request when the change is ready to become part of the project.

## Optional extra credit

Practice creating a feature branch and explain how you would return to `main` without merging the branch.
