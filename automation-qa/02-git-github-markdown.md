# Automation QA 2: Git, GitHub, and Markdown

## Theory

**Git** is version-control software. A **repository** is a folder whose changes Git tracks. A **commit** is a named snapshot of selected changes. **GitHub** hosts repositories online; a **remote** is the saved address of an online copy. A **branch** is a separate line of changes, useful for trying work without changing the stable branch. A **diff** shows what changed between versions.

GitHub Desktop provides a graphical view of changed files, diffs, branches, and commits. For this single-learner project, the workflow is: edit, review the diff, select the intended files, write a short commit summary, commit on `main`, and push to GitHub. Many teams instead use short-lived feature branches and pull requests; a pull request is a reviewable request to merge a branch. Those team practices are useful to recognize, but this course repository stays on `main`. Markdown is plain text with lightweight formatting: `#` creates a heading, `-` creates a list item, and backticks mark code or a filename.

If GitHub Desktop is not installed, install it from the [official GitHub Desktop site](https://desktop.github.com/). Add the existing `qa-engineering` local repository; do not clone a second copy into the project folder.

The change review matters: stage only the files you intend to include, read the full diff, and never commit credentials, test output, or unrelated personal files. A commit stays on your computer until pushed.

```markdown
# Test note

- Page: Task list
- Result: The heading is visible.
- Evidence: Screenshot saved as `task-list.png`.
```

This is readable as plain text and renders as a heading and three bullets on GitHub.

## Practice

1. **Check the repository.** Open GitHub Desktop. Confirm the repository is `qa-engineering` and the current branch is `main`.
2. **Make a safe edit.** Add one factual line to a copy of a practice Markdown note or a learner-authored test. Do not change stable app behavior for this exercise.
3. **Review the change.** In **Changes**, read the diff (the before/after view). Confirm it contains only your intended edit, then select only that file.
4. **Commit locally.** Enter a short summary such as `Document task filter check` and commit on `main`. A commit is a saved local snapshot; it is not online yet.
5. **Push and record.** Use **Push origin**, then confirm the commit appears on GitHub. Save `automation-qa/submissions/git-workflow.md` with the branch, reviewed change, commit summary, push result, and why you selected only that file. Explain briefly that teams may use a pull request to request review before merging changes.
