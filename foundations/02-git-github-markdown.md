# Foundations 2: Git, GitHub, and Markdown

## Introduction

QA work changes as you learn. Git records those changes so you can review them, and GitHub hosts a copy that you can share with a team.

## Learning objectives

You will understand a repository, a commit, and a remote; write a small Markdown report; and inspect the change before recording it.

## Concise theory

**Git** is version-control software. A **repository** is a folder whose changes Git tracks. A **commit** is a named snapshot of selected changes. **GitHub** hosts repositories online; a **remote** is the saved address of an online copy.

Markdown is plain text with lightweight formatting. `#` creates a heading, `-` creates a list item, and backticks mark a command or filename.

The usual local sequence is: edit a file, inspect `git status` and `git diff`, stage the intended file with `git add`, then record it with `git commit -m "..."`. A commit is local until pushed to a configured remote.

## Practical example

```markdown
# Test note

- Page: Task list
- Result: The heading is visible.
- Evidence: Screenshot saved as `task-list.png`.
```

This is readable as plain text and renders as a heading and three bullets on GitHub.

## Guided practice

1. Open PowerShell in the repository folder and run `git status`.
2. Create `submissions/foundations/first-test-note.md` using the example structure.
3. Run `git status` again. Identify the untracked file.
4. Stage only this file with `git add submissions/foundations/first-test-note.md`.
5. Inspect the staged content with `git diff --cached -- submissions/foundations/first-test-note.md`.
6. Do not commit, push, or publish anything before your review.

## Assignment

**Tools:** Git, GitHub, a text/Markdown editor, and TaskFlow when available. **Deliverable:** a short test note about one visible behavior. Include the page, action, expected result, actual result, and evidence you would capture. If you have not run the app yet, label the note `Example only` and do not invent an observed result. **Submission location:** `submissions/foundations/first-test-note.md`.

## Definition of Done

- The note is Markdown and saved under `submissions/foundations/`.
- Expected and actual results are distinct.
- Any behavior not actually observed is clearly labeled as an example.

## Submission instructions

Save the note under `submissions/foundations/` and share it in the project chat for review. After review, commit only this file with a descriptive message. Push only when repository authentication and the configured remote are ready.

## Optional extra credit

Add a Markdown link to the TaskFlow product specification and verify that it opens from GitHub's file view.
