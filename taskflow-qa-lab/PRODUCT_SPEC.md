# TaskFlow QA Lab — Product Specification

This document is the source of truth for expected behavior. If the app and this document disagree, record the difference as a defect; do not silently change an expectation during execution.

## Purpose and audience

TaskFlow is a small practice app for QA learning. Users create invented accounts and manage personal tasks. It is not a production task manager and must not receive real personal or sensitive information.

## Account behavior

- A user can create an account with a valid email and a password from 12 through 256 UTF-8 bytes. Supabase Auth handles credential storage and password verification; TaskFlow never stores the password or its hash.
- Email matching ignores leading/trailing spaces and letter case. Each normalized email belongs to one account.
- Successful registration signs the user in when email confirmation is disabled. If confirmation is enabled, the API returns a confirmation-required response and the interface tells the user to confirm before signing in.
- A user can sign in with the registered email and password.
- Incorrect email/password returns a general authentication error without revealing which field was wrong.
- Sign out asks Supabase Auth to end the session and clears the TaskFlow cookie. A subsequent protected request requires sign-in.
- The Supabase access token is held in an HTTP-only, same-site cookie for no longer than the token's lifetime. HTTPS responses mark the cookie Secure.

## Task behavior

- Only a signed-in user can list, create, edit, complete, or delete tasks.
- A task has a required title from 1 through 120 characters after trimming whitespace and an optional description up to 1,000 characters.
- New tasks are active and have an empty description when none is supplied.
- A user can edit a task title and description, mark it completed or active, and delete it.
- A task owned by another account behaves as not found. User A cannot read, update, or delete user B's task.
- Task filters are `all`, `active`, and `completed`; an unknown filter returns a validation error.
- Statistics report that user's total, active, and completed task counts. `active + completed = total`.
- Task data persists after a page reload and a new sign-in.

## API behavior

All API responses use JSON except a successful delete, which returns `204 No Content`.

| Method and path | Expected behavior |
| --- | --- |
| `GET /api/health` | `200` and `{ "status": "ok" }` |
| `POST /api/auth/register` | Validate account input and create account through Supabase Auth; return `201` with a session or `202` when email confirmation is required |
| `POST /api/auth/login` | Create a session, return `200`; invalid credentials return `401` |
| `POST /api/auth/logout` | Ask Supabase Auth to end the session and clear cookie, return `200` |
| `GET /api/auth/me` | Return current user or `401` |
| `GET /api/tasks?status=all\|active\|completed` | List only current user's matching tasks |
| `POST /api/tasks` | Validate and create a task, return `201` |
| `PATCH /api/tasks/:id` | Validate and update supplied title, description, and/or completion state |
| `DELETE /api/tasks/:id` | Delete current user's task, return `204` |
| `GET /api/tasks/stats` | Return current user's counts |

Validation failures return `400`; unauthenticated protected requests return `401`; missing or other-user task IDs return `404`. Error messages are visible in the interface and do not contain secrets or stack traces.

## Accessibility and interface behavior

- Every input has a visible programmatic label.
- All account, task, filter, edit, and delete actions work with a keyboard.
- Validation and status messages are visible and announced to assistive technology.
- User-provided task text is displayed as text, never interpreted as HTML.
- The interface reflows for narrow screens and keeps actions available without horizontal scrolling.

## Data and security boundaries

- Supabase Auth stores credentials and issues access tokens. TaskFlow validates tokens with Supabase Auth and stores only the provider user ID and email in D1.
- TaskFlow's access-token cookie is HTTP-only and expires with the provider token; the token is not stored in D1.
- SQL statements bind user input as parameters; task queries always include the authenticated owner ID.
- The app does not implement password reset, MFA, account deletion, or abuse controls. Email confirmation and email delivery are managed by the Supabase project. This is not a production support promise.
- Do not use real credentials, personal data, or confidential data. This is a public practice app only.

## Current implementation scope

The first release includes account registration/sign-in/sign-out, task create/edit/complete/delete, filters, counts, local persistence, and the API. Training defects are not included in the stable `main` release.

