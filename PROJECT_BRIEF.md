# Project Brief

## Goal

Build evidence of the practical skills needed for a first junior QA Engineer role, with a focus on fully remote international teams and roles open to candidates in Argentina.

## Learner profile

Assume no prior QA, programming, or development-tool knowledge. Explain new terms before relying on them. Keep programming and infrastructure at the minimum level needed to test software professionally.

## Learning method

Use four support levels: demonstration, guided practice, independent practice, and mastery assessment. Lessons are original, self-contained Markdown files. Practice and useful QA artifacts take priority over theory. Review submissions with specific strengths, gaps, and actionable corrections.

## Practice product

TaskFlow QA Lab is a small task-management web application. Its product specification is the testing source of truth. Features are introduced in stages so each creates a concrete QA exercise. The main release remains stable; controlled training defects are separate.

## Technical direction

- Static, accessible web interface with a same-origin JSON API.
- Cloudflare Worker and D1 database for the app and task data; Supabase Auth manages credentials and access tokens. Local development first.
- TypeScript for the Worker and Playwright Test automation.
- GitHub Actions runs tests; Cloudflare Git integration owns deployment after local verification.
- Local-only database reset command. Never point a training reset at a remote database.

## Portfolio integrity and privacy

Keep learner submissions separate from AI-assisted project code. Record provenance. Use only invented accounts and data; this learning app is not for real personal or sensitive information.

## Success

The learner can independently analyze requirements, design and execute risk-based manual and automated tests, report defects with evidence, validate APIs/data, communicate release risk, and present honest portfolio evidence in English.

