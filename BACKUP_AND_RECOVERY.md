# Backup and Recovery

The public [GitHub repository](https://github.com/thiagoburg/qa-engineering) stores project files and committed learner submissions. It includes the two course sections, app source, migrations, templates, master prompt, and project notes.

## Restore the project

In PowerShell, clone the repository and start the app:

```powershell
git clone https://github.com/thiagoburg/qa-engineering.git
Set-Location qa-engineering/taskflow-qa-lab
npm ci
npm run db:migrate:local
npm run dev
```

The local app opens at `http://localhost:8787`. Optional local overrides belong in ignored `.dev.vars`; never add secrets or real credentials to Git.

Start at [Manual QA 1](manual-qa/01-thinking-like-a-qa-engineer.md). Save learner work inside its section: `manual-qa/submissions/` or `automation-qa/submissions/`. Commit reviewed work when it is ready for backup. Update [PROGRESS.md](PROGRESS.md) only after reviewing evidence.

## Recover the training branch

The stable app and course are on `main`. Fetch `training/taskflow-release-01` only when the Manual QA capstone calls for it. Use fresh local D1 data. The `db:reset:local` command from `taskflow-qa-lab/` targets local D1 only. Do not merge the training branch into `main` or deploy it to production.

## What is not stored in GitHub

Sign-in sessions, service access, local databases, and ignored runtime files are not part of the repository. Recreate dependencies with `npm ci`; sign in to Cloudflare, GitHub, and Supabase as needed. Obsidian workspace history and `.trash/` are local device state.

This is a public repository. Remove personal information, credentials, access tokens, and confidential material before committing learner submissions.
