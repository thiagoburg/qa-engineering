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

1. **Create your practice note.** Create `automation-qa/submissions/git-workflow.md` in Markdown with the heading `# Task filter check`, three bullets for `Page`, `Result`, and `Evidence`, and one filename in backticks. Use this file as both your Markdown practice and evidence log.
2. **Check the repository.** Open GitHub Desktop. In the note, record the repository name and confirm it is `qa-engineering` on branch `main`.
3. **Make a safe change.** Add one factual line about a TaskFlow check to your note. Do not change stable app behavior.
4. **Review the diff.** In **Changes**, read the before/after view. Record what changed in your note, and make sure only your intended practice file is selected. Do not include credentials, test output, or unrelated files.
5. **Commit and push.** Enter a short commit summary, commit on `main`, and use **Push origin**. Record the summary and confirm the commit appears on GitHub. Finish your note with why you selected only the intended file and when a team might use a pull request for review.
