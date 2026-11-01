# Automation QA 2: Git, GitHub, and Markdown

## Introduction

As you begin editing test code, Git helps you review and record changes, and GitHub keeps the shared repository. This lesson introduces that workflow at the point you are ready to use it. It uses GitHub Desktop's visual interface; you do not need a Windows Terminal lesson for this workflow. This personal learning repository deliberately uses only `main` to keep its practice workflow simple.

## Learning objectives

You will understand a repository, a commit, and a remote; inspect a code or Markdown change; and record a reviewed change on this repository's `main` branch.

## Concise theoretical explanation

**Git** is version-control software. A **repository** is a folder whose changes Git tracks. A **commit** is a named snapshot of selected changes. **GitHub** hosts repositories online; a **remote** is the saved address of an online copy. A **branch** is a separate line of changes, useful for trying work without changing the stable branch. A **diff** shows what changed between versions.

GitHub Desktop provides a graphical view of changed files, diffs, branches, and commits. For this single-learner project, the workflow is: edit, review the diff, select the intended files, write a short commit summary, commit on `main`, and push to GitHub. Many teams instead use short-lived feature branches and pull requests; a pull request is a reviewable request to merge a branch. Those team practices are useful to recognize, but this course repository stays on `main`. Markdown is plain text with lightweight formatting: `#` creates a heading, `-` creates a list item, and backticks mark code or a filename.

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

1. Open the project in GitHub Desktop and confirm the repository is `qa-engineering` and the current branch is `main`.
2. Make a small change to a copied practice Markdown note or a learner-authored test file; do not edit the stable product behavior.
3. In **Changes**, inspect the diff and confirm that it contains only your intended edit. Select only that file.
4. Enter a concise summary, such as `Document task filter check`, then create a commit on `main`.
5. Confirm that the commit appears in **History**, then use **Push origin** to publish the reviewed change.

## Assignment

**Tools:** GitHub Desktop, GitHub, an editor, and a reviewed practice test or Markdown artifact. **Deliverable:** `automation-qa/submissions/git-workflow.md` with a screenshot or written record of `main`, the reviewed diff, the local commit summary, and the push result. Explain why you included only the intended file and when a pull request is appropriate in a team workflow. **Submission location:** `automation-qa/submissions/`.

## Definition of Done

- The note is saved under `automation-qa/submissions/`.
- The recorded diff contains only the intended file and no credentials or unrelated changes.
- The local commit exists on `main` and has a clear summary.
- The learner distinguishes a local commit from the later push that publishes it to GitHub.

## Submission instructions

Save the note under `automation-qa/submissions/` and share it in the project chat for review. After review, push the commit on `main` using GitHub Desktop. In a team repository, the equivalent reviewed change would usually be proposed in a pull request.

## Optional extra credit

Look at a public project's pull request and explain how its proposed change is reviewed before merging.
