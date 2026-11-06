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

1. **Read the setup.** Open `taskflow-qa-lab/playwright.config.ts` and `tests/taskflow.spec.ts`. Record the base URL, browser, retry setting, and reporter you find; do not assume values.
2. **Run the current suite.** Follow the app README's first-time setup if needed, then run `npm.cmd test` from `taskflow-qa-lab`. Note the browser and result.
3. **Choose a requirement.** Pick one user-visible behavior from the [TaskFlow Product Specification](../taskflow-qa-lab/README.md#product-specification) and write its expected outcome before coding.
4. **Add a UI check.** Create `taskflow-qa-lab/tests/learner-ui-smoke.spec.ts`. Use role/label locators that match the interface, and an awaited Playwright assertion that checks a meaningful visible outcome. Use invented local account data and keep the test independent.
5. **Make it reliable.** Replace fixed sleeps with a locator action or assertion that waits for the expected state. Run the test alone and with the full suite; investigate any difference rather than hiding it.
6. **Submit your notes.** Save `automation-qa/submissions/ui-smoke-notes.md` with the requirement, setup, locator choice, assertion, browser/environment, and both run results. Do not include secrets. Use the local app README for command and test setup details.
