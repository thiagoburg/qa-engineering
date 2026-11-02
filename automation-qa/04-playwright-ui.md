# Automation QA 4: Playwright UI Checks

## Theory

A Playwright test has a name and an async callback. The built-in `page` fixture represents a browser tab; `expect` checks outcomes. A **locator** describes how to find an element. Prefer `getByRole()` and `getByLabel()` because they reflect how users and assistive technology identify controls.

`await page.getByRole('button', { name: 'Add task' }).click()` performs an action. `await expect(locator).toBeVisible()` waits for the expected state. These web-first assertions retry until success or timeout, reducing timing races. Avoid arbitrary sleeps; they slow tests and do not explain what state is expected.

Fixtures provide fresh browser context/page for a test. Use a unique test account/data per test or a documented reset strategy. Tests should not depend on execution order. A `beforeEach` can repeat setup, but keep setup small and ensure cleanup does not delete anything outside local training data.


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

## Practice

1. Read `playwright.config.ts` and `tests/taskflow.spec.ts`; note base URL, browsers, retries, and reporter.
2. Run the existing suite locally following the app README so you understand its environment.
3. Add a learner-authored test for a specified behavior in taskflow-qa-lab/tests/ and stay on main.
4. Prefer role/label locators; verify the locator is unique and the accessible name matches the UI.
5. Replace any fixed sleep with a locator action/assertion that waits for a meaningful state.
6. Run the same test alone and with the suite; investigate any order dependency.

Use Playwright Test, local TaskFlow, and a browser. Create taskflow-qa-lab/tests/learner-ui-smoke.spec.ts and save automation-qa/submissions/ui-smoke-notes.md with the requirement, setup, locator choices, assertion, and execution result. Cover one sign-in and one task journey with invented local account data.

Save the deliverable in `automation-qa/submissions/`.

Before saving, check that:
- The test maps to a requirement in the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification).
- It uses user-facing locators and a meaningful awaited assertion.
- Setup/data are repeatable and the test does not depend on another test.
- The report records browser/environment and result without secrets.
