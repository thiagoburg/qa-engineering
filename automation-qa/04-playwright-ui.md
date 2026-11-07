# Automation QA 4: Playwright UI Checks

## Theory

A Playwright test has a name and an async callback. The built-in `page` fixture represents a browser tab; `expect` checks outcomes. A **locator** describes how to find an element. Prefer `getByRole()` and `getByLabel()` because they reflect how users and assistive technology identify controls.

`await page.getByRole('button', { name: 'Add task' }).click()` performs an action. `await expect(locator).toBeVisible()` waits for the expected state. These web-first assertions retry until success or timeout, reducing timing races. Avoid arbitrary sleeps; they slow tests and do not explain what state is expected.

Fixtures provide a fresh browser context and page for a test. Use a unique test account/data per test or a documented reset strategy so tests do not depend on order. A `beforeEach` block is a setup step Playwright runs before each test in its group; keep it small and ensure cleanup cannot delete anything outside local training data.


```ts
import { test, expect } from '@playwright/test';

// After test setup signs in an invented local account:
test('signed-in user can add a task', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Title').fill('Review release notes');
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByText('Review release notes')).toBeVisible();
});
```

The example shows only the task action and assertion; it assumes the test has already signed in. A full independent test needs its own account setup. Adapt labels and setup to the current UI; do not copy fixed credentials.

## Practice

1. **Create the test and notes.** Create `taskflow-qa-lab/tests/learner-ui-smoke.spec.ts` and copy the theory’s sample UI test into it. Create `automation-qa/submissions/ui-smoke-notes.md` with exact headings `## Requirement`, `## Setup and locators`, `## Assertion`, and `## Run results`.
2. **Inspect the Playwright setup.** Open `taskflow-qa-lab/playwright.config.ts` and `taskflow-qa-lab/tests/taskflow.spec.ts`. Under `## Run results`, record base URL, browser, retry setting, and reporter from the config. In `## Setup and locators`, name one use of `page`, one `expect`, and any `beforeEach` in the existing suite; explain what its setup repeats.
3. **Choose the expected behavior.** Read one user-visible rule in the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification). Before writing the check, record the rule and expected visible outcome under `## Requirement`.
4. **Implement the check.** Copy `register`, `uniqueEmail`, and the practice password constant from `taskflow-qa-lab/tests/taskflow.spec.ts` into your test file; import `type Page` from `@playwright/test`. Call `register(page)` before checking the task. Use the `page` fixture, a role/label locator that matches the interface, and an awaited `expect` for a visible result. Under `## Setup and locators`, explain your registration setup and why the locator matches what a user sees; under `## Assertion`, name the expected result the assertion checks.
5. **Run and assess reliability.** If needed, follow the app README setup. From `taskflow-qa-lab`, run the file alone with `npm.cmd test -- tests/learner-ui-smoke.spec.ts`, then run `npm.cmd test`. Under `## Run results`, record each command, result, and browser. Replace fixed sleeps with a locator action/assertion that waits for the required state; investigate and record any difference between runs.
