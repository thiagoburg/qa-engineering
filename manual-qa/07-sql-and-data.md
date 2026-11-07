# Manual QA 7: SQL and Data Validation

## Theory

A relational database organizes information in **tables**. Each **row** is one record, and each **column** is one kind of information about that record. A **primary key** is an ID that uniquely identifies a row. A database **schema** is the structure of its tables, columns, and relationships. TaskFlow's migration files describe changes to its D1 schema over time. The first migration is historical; the current schema is the result of applying all migrations in order. Read both files to understand the final `users` and `tasks` tables.

SQL is a language for asking questions of a database. `SELECT` reads data; `WHERE` limits which rows are returned; `COUNT(*)` counts matching rows. TaskFlow stores `completed` as `0` for active and `1` for completed. `GROUP BY completed` puts those values into separate groups so each can be counted and compared with the app's statistics. For example, a QA check can select a task's ID, title, completion value, and owner from the local tasks table, with a `WHERE` condition for the test account. Use the actual table and column names from the schema.

This query shape counts a user's active and completed tasks separately:

```sql
SELECT completed, COUNT(*) AS task_count
FROM tasks
WHERE user_id = (SELECT id FROM users WHERE email = 'qa@example.com')
GROUP BY completed;
```

The `WHERE` condition keeps another account's tasks out of the count. Use only an invented email and local D1.

Database checks can help locate where a mismatch occurs. If the UI shows a task but the database has no corresponding row, the save may not have persisted. If the database row is correct but the page is wrong, the display or API may be responsible. Compare the same account and task at the same time, and filter by owner so another user's record is not confused with yours.

Use read-only SELECT queries and local D1 only. Do not run write queries or remote commands for this lesson. A read query can still show private information, so use invented data and redact IDs and output in anything you share.

## Practice

1. **Create your report file.** Create `manual-qa/submissions/data-validation.md` with headings `Schema`, `Create`, `Update and complete`, `Delete`, and `Account isolation`. Add a small table under each action heading with columns for query, related action, expected, and observed.
2. **Inspect the schema.** Read `taskflow-qa-lab/migrations/0001_initial_schema.sql` and then `0002_supabase_auth.sql`. Under `Schema`, record the final task table, primary key, task fields, and owner field. The first migration is historical; the second removes password/session storage now managed by Supabase Auth.
3. **Create tasks and query them.** Start local TaskFlow with an invented account and create two uniquely titled tasks. Follow the app README's [read-only local D1 query instructions](../taskflow-qa-lab/README.md#read-only-local-d1-queries). From the app folder, run a SELECT for task ID, title, completion, and owner, filtered to your account. Paste the sanitized query and compare the rows with the UI under `Create`.
4. **Check changes and counts.** Complete one task and edit the other; repeat the SELECT after each action and record expected/observed results under `Update and complete`. Run the read-only `COUNT(*)`/`GROUP BY completed` query shown in the theory, replacing its example email with your invented account. Compare its active/completed counts with TaskFlow's displayed statistics and record the query and comparison in the same section. If a group is absent from the query output, record zero for it.
5. **Check deletion and isolation.** Delete the completed task and record the SELECT result under `Delete`; confirm the other task remains. Create a second invented account and verify its list/query does not include the first account's task; record the account-filtered query and result under `Account isolation`. Use only local D1 and SELECT queries; never run write or remote commands.
