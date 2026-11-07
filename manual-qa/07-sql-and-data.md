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

1. **Create the validation report.** Create `manual-qa/submissions/data-validation.md` with headings `## Schema`, `## Create`, `## Update and complete`, `## Delete`, and `## Account isolation`. Under `## Create`, `## Update and complete`, `## Delete`, and `## Account isolation`, add a table with columns `query | related action | expected | observed`.
2. **Read the final schema.** Open `taskflow-qa-lab/migrations/0001_initial_schema.sql`, then `0002_supabase_auth.sql`. Under `## Schema`, record the final task table name, primary key, task fields, and owner field. Note that migration 0001 is historical and migration 0002 removes password/session tables now handled by Supabase Auth.
3. **Compare created tasks with D1.** Start local TaskFlow, sign in with an invented account, and create two uniquely titled tasks. Follow the app README’s [read-only local D1 query instructions](../taskflow-qa-lab/README.md#read-only-local-d1-queries). From the app folder, run a SELECT for task ID, title, completion, and owner, filtered to your account. Add the query, UI action, expected rows, and observed rows as one row in the table under `## Create`.
4. **Compare updates and counts.** Complete one task and edit the other. After each action, rerun the SELECT and add a row to the table under `## Update and complete`. Then run the theory’s read-only `COUNT(*)`/`GROUP BY completed` query with your invented email, compare active/completed totals with TaskFlow’s displayed statistics, and add that query and comparison to the same table. Record zero if a completion group is absent.
5. **Check deletion and account isolation.** Delete the completed task, run the SELECT, and add the action and observed remaining row to the `## Delete` table. Create a second invented account and verify its TaskFlow list/query does not show the first account’s task; add the filtered query and result to the `## Account isolation` table. Use only local D1 and SELECT queries; never run write or remote commands.
