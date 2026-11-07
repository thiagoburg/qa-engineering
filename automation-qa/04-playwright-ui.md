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

1. **Create your work files.** Create `taskflow-qa-lab/tests/learner-ui-smoke.spec.ts` and copy the theory's sample UI test into it. Create `automation-qa/submissions/ui-smoke-notes.md` with headings `Requirement`, `Setup and locators`, `Assertion`, and `Run results`.
2. **Inspect the project.** Open `taskflow-qa-lab/playwright.config.ts` and `tests/taskflow.spec.ts`. Record the base URL, browser, retry setting, and reporter under `Run results`; also find a use of `page`, `expect`, and any `beforeEach` setup. Explain what the setup repeats.
3. **Choose one expectation.** Read a user-visible rule in the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification). Write the expected outcome under `Requirement` before coding.
4. **Implement the UI check.** Copy `register`, `uniqueEmail`, and the practice password constant from `tests/taskflow.spec.ts` into your test file; also import `type Page` from `@playwright/test`. Call `register(page)` before the task check so the test signs in with a unique invented account. Use the `page` fixture, a role/label locator matching the interface, and an awaited `expect` assertion for a visible outcome. Record your setup and why the locator matches the user's view under `Setup and locators`.
5. **Run and improve reliability.** Follow the app README if setup is needed. Run your test alone and with `npm.cmd test`; record both results and browser. Replace fixed sleeps with a locator action/assertion that waits for the required state, and investigate any difference between runs.
