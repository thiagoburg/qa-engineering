# Manual QA 7: SQL and Data Validation

## Theory

A relational database organizes information in **tables**. Each **row** is one record, and each **column** is one kind of information about that record. A **primary key** is an ID that uniquely identifies a row. TaskFlow's migration files describe changes to its D1 tables over time. The first migration is historical; the current schema is the result of applying all migrations in order. Read both files to understand the final `users` and `tasks` tables.

SQL is a language for asking a database questions. SELECT reads data; WHERE limits which rows are returned; COUNT counts matching rows. For example, a QA check can select a task's ID, title, completion value, and owner from the local tasks table, with a WHERE condition for the test account. A count grouped by completion state can be compared with the task counts shown by the app. Use the actual table and column names from the schema.

Database checks can help locate where a mismatch occurs. If the UI shows a task but the database has no corresponding row, the save may not have persisted. If the database row is correct but the page is wrong, the display or API may be responsible. Compare the same account and task at the same time, and filter by owner so another user's record is not confused with yours.

Use read-only SELECT queries and local D1 only. Do not run write queries or remote commands for this lesson. A read query can still show private information, so use invented data and redact IDs and output in anything you share.

## Practice

1. **Read the schema history.** Open `taskflow-qa-lab/migrations/0001_initial_schema.sql` and then `0002_supabase_auth.sql`. Record the final task table, primary key, task fields, and owner field. The first migration is historical; the second removes password/session storage now managed by Supabase Auth.
2. **Create test data.** Start local TaskFlow using its setup guide, sign in with an invented account, and create one task with a unique title. Follow the app README's [read-only local D1 query instructions](../taskflow-qa-lab/README.md#read-only-local-d1-queries).
3. **Inspect the row.** From the `taskflow-qa-lab` folder, run a SELECT query for the task ID, title, completion state, and owner. Include a WHERE condition for your account. Compare the output with the UI; never query remote data or run a write query.
4. **Compare changes.** Complete, edit, and delete the task one action at a time. Repeat the SELECT after each action and record what changed in the database and UI/API.
5. **Check isolation.** Create a second invented account and confirm its task list does not show the first account's task. If you compare counts, use only that account's rows.
6. **Submit your report.** Save `manual-qa/submissions/data-validation.md` with each read-only query, related UI/API action, sanitized expected/observed results, and why the owner condition matters. Include create, update/complete, delete, and second-user isolation checks.
