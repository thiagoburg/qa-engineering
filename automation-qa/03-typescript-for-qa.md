# Automation QA 3: TypeScript for QA

## Introduction

TypeScript is JavaScript with optional type checks. You need only a small part of it to understand and maintain Playwright tests.

## Learning objectives

- Read variables, strings, booleans, arrays, and objects in a test.
- Use conditions, functions, imports, and simple types.
- Understand `async`/`await` in browser and API checks.
- Read compiler errors and debug test code without writing a general application.

## Concise theoretical explanation

Use `const` when a variable name will not be reassigned and `let` when it will. Values include strings (`'task'`), numbers (`120`), booleans (`true`), arrays (`['all', 'active']`), and objects (`{ title: 'Review', completed: false }`). A type such as `string` helps catch mismatches before a test runs: `const title: string = 'Review'`.

An `if` selects behavior based on a condition. A function names reusable steps: `function makeTitle(index: number): string { return `Task ${index}`; }`. Imports bring in test tools from another module: `import { test, expect } from '@playwright/test';`. A package is reusable code installed in the project; the package file records its dependencies.

Browser operations take time, so Playwright methods return **promises**. `await` waits for that operation before continuing. Inside a Playwright test callback, write `async ({ page }) => { ... }`. Missing `await` can make a test race ahead. Read error messages from the first relevant line and use `npm run typecheck` for type errors. Do not add classes or complex abstractions unless a concrete test maintenance need appears.

## Practical examples

```ts
const validTitle: string = 'Review release';
const statuses: string[] = ['all', 'active', 'completed'];
const task = { title: validTitle, completed: false };

test('new task appears in the list', async ({ page }) => {
  await page.getByLabel('Task title').fill(task.title);
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByText(task.title)).toBeVisible();
});
```

## Guided practice

1. Open `taskflow-qa-lab/tests/taskflow.spec.ts` and identify imports, test names, variables, functions, and awaited operations.
2. Create a scratch `.ts` file with a string, boolean, array, and task object; run `npm run typecheck`.
3. Change one type incorrectly and observe the compiler message, then correct it.
4. Write a small typed helper that returns a unique invented task title; avoid global mutable state.
5. Add a test file under `submissions/automation-qa/` only after understanding the project test command and local server setup.

## Assignment

**Tools:** Node.js/npm, TypeScript in `taskflow-qa-lab/`, editor. **Deliverable:** `submissions/automation-qa/typescript-notes.md` with five annotated code snippets (value/type, object or array, function, import, awaited operation), one compiler error you intentionally corrected, and one explanation of how the code supports a QA check. Do not submit a general programming exercise. **Submission location:** `submissions/automation-qa/`.

## Definition of Done

- Examples compile or are explicitly labeled as pseudocode.
- Every language feature is connected to reading, writing, or debugging tests.
- The learner explains why asynchronous browser actions are awaited.
- No secret or real user data is included.

## Submission instructions

Save the note under `submissions/automation-qa/`, run `npm run typecheck`, and include the result. Request review before moving to Playwright locator work.

## Optional extra credit

Read a type error in a small provided test and describe the likely cause before running the compiler.
