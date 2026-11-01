# Automation QA 4: Playwright UI Checks

## Introduction

Playwright Test controls a real browser and checks visible behavior. This lesson introduces the test structure, accessible locators, assertions, setup, and isolated data.

## Learning objectives

- Read and write a `test` with `page` and `expect`.
- Locate controls by role, label, and user-visible text.
- Use web-first assertions and built-in waiting.
- Create independent tests with clear setup and cleanup.

## Concise theoretical explanation

A Playwright test has a name and an async callback. The built-in `page` fixture represents a browser tab; `expect` checks outcomes. A **locator** describes how to find an element. Prefer `getByRole()` and `getByLabel()` because they reflect how users and assistive technology identify controls. Use a test ID only when a stable semantic locator is unavailable and the app intentionally provides one.

`await page.getByRole('button', { name: 'Add task' }).click()` performs an action. `await expect(locator).toBeVisible()` waits for the expected state. These web-first assertions retry until success or timeout, reducing timing races. Avoid arbitrary sleeps; they slow tests and do not explain what state is expected.

Fixtures provide fresh browser context/page for a test. Use a unique test account/data per test or a documented reset strategy. Tests should not depend on execution order. A `beforeEach` can repeat setup, but keep setup small and ensure cleanup does not delete anything outside local training data.

Cross-browser testing runs a focused set of the same checks in different browser engines. Playwright can define browser **projects** (named configurations) for Chromium, Firefox, and WebKit. The starter configuration currently targets Desktop Chrome to keep setup small; add another project only when its browser is installed and the check addresses a real compatibility risk. A small smoke set is usually more practical across browsers than every scenario.

## Practical examples

```ts
import { test, expect } from '@playwright/test';

// Assume the test fixture has already signed in an invented local account.
test('signed-in user can add a task', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Title').fill('Review release notes');
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByText('Review release notes')).toBeVisible();
});
```

Adapt labels and setup to the current UI; the point is accessible selection and an observable assertion, not copying fixed credentials.

## Guided practice

1. Read `playwright.config.ts` and `tests/taskflow.spec.ts`; note base URL, browsers, retries, and reporter.
2. Run the existing suite locally following the app README so you understand its environment.
3. Add a learner-authored test for a simple specified behavior in `automation-qa/submissions/` or in a separate local branch.
4. Prefer role/label locators; verify the locator is unique and the accessible name matches the UI.
5. Replace any fixed sleep with a locator action/assertion that waits for a meaningful state.
6. Run the same test alone and with the suite; investigate any order dependency.

## Assignment

**Tools:** Playwright Test, local TaskFlow, browser. **Deliverables:** `automation-qa/submissions/ui-smoke.spec.ts` and `automation-qa/submissions/ui-smoke-notes.md` describing setup, requirement, locator choices, assertion, and execution result. Cover one sign-in and one task journey. Use a throwaway local account strategy; no real credentials. **Submission location:** `automation-qa/submissions/`.

## Definition of Done

- The test maps to a requirement in the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification).
- It uses user-facing locators and a meaningful awaited assertion.
- Setup/data are repeatable and the test does not depend on another test.
- The report records browser/environment and result without secrets.

## Submission instructions

Save the spec and notes to `automation-qa/submissions/`. Run locally and share the command/result for review. If a test fails, include the first useful error and evidence; do not hide a failure with retries.

## Optional extra credit

Run a focused smoke test in a second Playwright browser project (or use the manual comparison from Manual QA 4) and compare behavior without duplicating test code.
