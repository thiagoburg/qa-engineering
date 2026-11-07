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

1. **Create the Markdown note.** Create `automation-qa/submissions/git-workflow.md`. Add heading `# Task filter check`, then bullets `- Page:`, `- Result:`, and `- Evidence:`. In `Evidence`, include one filename surrounded by backticks. Add headings `## Repository check`, `## Change summary`, `## Diff review`, `## Commit`, and `## Review` below the bullets.
2. **Confirm the repository.** Open GitHub Desktop and select `qa-engineering`. Confirm the current branch is `main`. Under the note’s `## Repository check` heading (add it below the bullets), record the repository name and branch. If either differs, stop and report it rather than switching branches.
3. **Make a safe note change.** Add one factual line about a TaskFlow check to `git-workflow.md`; do not change TaskFlow app behavior. Under `## Change summary`, describe the line you added.
4. **Review the diff.** In GitHub Desktop’s **Changes** view, open the before/after diff. Under `## Diff review`, record the file changed and confirm only the intended practice note is selected. Do not include credentials, test output, or unrelated files.
5. **Commit and push the practice note.** Enter a short commit summary, commit on `main`, and select **Push origin**. Under `## Commit`, record the summary and confirm the commit appears on GitHub. Under `## Review`, explain why you selected only the intended file and when a team may use a pull request for review.
