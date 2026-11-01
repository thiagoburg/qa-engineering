# Manual QA 7: SQL and Data Validation

## Introduction

When a screen looks wrong, checking stored data can reveal whether the UI displayed stale data or the backend saved the wrong value. This lesson covers safe, read-focused SQL for QA.

## Learning objectives

- Read a table, row, column, and primary key.
- Use `SELECT`, `WHERE`, `ORDER BY`, and simple counts.
- Compare application behavior with persisted records.
- Protect user isolation and avoid changing shared data.

## Concise theoretical explanation

A relational database stores data in **tables** (similar to grids). A **row** is one record; a **column** is one property. A primary key identifies a row. `SELECT` reads data, `WHERE` filters it, `ORDER BY` sorts it, and `COUNT` counts matches. Example: `SELECT title, completed FROM tasks WHERE user_id = ? ORDER BY created_at;` The `?` is a bound parameter supplied safely by application code; never build SQL by inserting raw user input into the query string.

QA validation compares the user-visible/API result with the database state using the same account and resource. Check counts, values, and ownership. In this project, the D1 schema and migrations are the source for table names. Use local D1 only for learning queries. Do not run write statements against a remote or production database. A read-only query can still expose private data, so use only dummy data and share only redacted results.

## Practical examples

After creating a task, confirm one row exists with the expected title and authenticated owner ID. After completion, confirm its `completed` value changed. After deletion, confirm the row is absent. Check that a second account's query returns no rows for the first account's task.

## Guided practice

1. Read `taskflow-qa/migrations/0001_initial_schema.sql` and identify table names and ownership columns.
2. Start the local stack and create a dummy task.
3. Use Wrangler's documented local D1 execute command from `taskflow-qa/README.md` with a `SELECT` for task ID, title, completed, and owner.
4. Complete, edit, and delete the task; repeat the read query after each action.
5. Create a second dummy account and verify its task listing does not reveal the first task.

## Assignment

**Tools:** PowerShell, Wrangler local D1, migration SQL. **Deliverable:** `manual-qa/submissions/data-validation.md` with the query used for each check, sanitized expected/observed values, linked UI or API action, and a note explaining why owner filtering matters. Include four read-only checks: create, update/complete, delete, and second-user isolation. **Submission location:** `manual-qa/submissions/`.

## Definition of Done

- Queries are read-only and target local D1.
- Each result is linked to an action and expected application behavior.
- User/task identifiers and personal information are redacted or invented.
- The report explains how ownership filtering supports isolation.

## Submission instructions

Save the note in `manual-qa/submissions/` and share it for review. Do not commit database files, passwords, auth tokens, or query output containing real data.

## Optional extra credit

Write a `GROUP BY` count by completion state and compare it with `/api/tasks/stats`; explain what mismatch would indicate.
