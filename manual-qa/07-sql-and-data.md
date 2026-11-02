# Manual QA 7: SQL and Data Validation

## Theory

A relational database organizes information in **tables**. Each **row** is one record, and each **column** is one kind of information about that record. A **primary key** is an ID that uniquely identifies a row. TaskFlow's migration files describe changes to its D1 tables over time. The first migration is historical; the current schema is the result of applying all migrations in order. Read both files to understand the final `users` and `tasks` tables.

SQL is a language for asking a database questions. SELECT reads data; WHERE limits which rows are returned; COUNT counts matching rows. For example, a QA check can select a task's ID, title, completion value, and owner from the local tasks table, with a WHERE condition for the test account. A count grouped by completion state can be compared with the task counts shown by the app. Use the actual table and column names from the schema.

Database checks can help locate where a mismatch occurs. If the UI shows a task but the database has no corresponding row, the save may not have persisted. If the database row is correct but the page is wrong, the display or API may be responsible. Compare the same account and task at the same time, and filter by owner so another user's record is not confused with yours.

Use read-only SELECT queries and local D1 only. Do not run write queries or remote commands for this lesson. A read query can still show private information, so use invented data and redact IDs and output in anything you share.

## Practice

1. Read `taskflow-qa-lab/migrations/0001_initial_schema.sql` and `0002_supabase_auth.sql` in order. Identify the final task table, its primary key, task fields, and owner field. The first migration created an earlier account design; the second removes its password and session storage because Supabase Auth manages accounts.
2. Start the local app and create a task using a dummy account. From the `taskflow-qa-lab` folder, follow the [read-only local D1 query instructions](../taskflow-qa-lab/README.md#read-only-local-d1-queries).
3. Use SELECT to check the task's ID, title, completion state, and owner. Add a WHERE condition for the test account.
4. Complete, edit, and delete the task. Repeat the read-only query after each action and compare the result with the UI or API.
5. Create a second dummy account. Check its task list and verify its data does not include the first account's task. Compare a read-only count with TaskFlow's statistics if the schema makes that check clear.

Use PowerShell, Wrangler's local D1 command, and the migration SQL. Save your report in `manual-qa/submissions/data-validation.md` with each query, the linked UI/API action, sanitized expected and observed results, and a short explanation of why the owner condition matters. Include create, update/complete, delete, and second-user isolation checks. Keep every query read-only and local.
