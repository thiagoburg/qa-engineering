# Automation QA 3: TypeScript for QA

## Theory

TypeScript is JavaScript with type checking. You do not need to become a general software developer for QA work. Learn enough TypeScript to read a test, change a check safely, understand a compiler message, and add small test helpers.

A **variable** gives a value a name. Use const when you will not assign a different value to that name; use let when you need to assign it again. Common values are strings for text, numbers for counts, and booleans for true/false. Arrays hold several values, such as a list of valid task filters. An object groups related values, such as a task title and completion state.

A **type** describes what kind of value is expected. TypeScript can infer many types from the value, but you can also write them: a title is a string, a count is a number, and a list of titles can be `string[]`. An object type lists the fields the object should have, for example `{ status: string; expectedLabel: string }`. Types help catch mistakes before the test runs; they do not prove that the product behaves correctly.

A **function** is a named, reusable step. Its parameters describe the input, and its return type describes the value it gives back. A helper that creates a unique task title can reduce repeated test setup. An if statement runs different code depending on whether a condition is true. Use simple helpers only when they make tests easier to read and maintain.

An **import** makes code from another file or package available. Playwright Test provides test to define a check and expect to compare an observed result with an expected value. A package is reusable code installed in a project; package.json records the project's dependencies and commands.

Browser and API operations take time. Playwright represents work that may finish later with a **Promise**. An async function can use await to wait for a Promise before checking its result. Without await, the test may continue before the browser action or response is ready. TypeScript checks the code before it runs; a type error is different from a test failure, which is a failed assertion about product behavior.

For example, a QA helper can make a predictable title, while a Playwright test can await a health response and check its status and JSON:

```ts
import { expect, test } from "@playwright/test";

function makeTitle(run: number): string {
  return "qa-title-" + run;
}

test("health API returns its expected status", async ({ request }) => {
  const filterCase: { status: string; expectedLabel: string } = {
    status: "active",
    expectedLabel: "Active",
  };
  const filters: string[] = ["all", "active", "completed"];
  const response = await request.get("/api/health");
  const body: { status: string } = await response.json();

  expect(response.status()).toBe(200);
  expect(body.status).toBe("ok");
  expect(filters).toContain(filterCase.status);
  expect(filterCase.expectedLabel).toBe("Active");
  expect(makeTitle(1)).toBe("qa-title-1");
});
```

## Practice

1. **Create your files first.** From the repository root, create `taskflow-qa-lab/tests/learner-typescript-practice.spec.ts` and paste in the theory code example. Create `automation-qa/submissions/typescript-notes.md` with headings `Existing code`, `Test`, and `Type error and correction`.
2. **Study real examples.** Open `taskflow-qa-lab/tests/taskflow.spec.ts` and `taskflow-qa-lab/package.json`. Under `Existing code`, annotate an import, test name, `const`/`let`, an inferred type, an array or object, a function, an `if`, and an awaited browser/API operation. Find the test/typecheck commands and a Playwright dependency in `package.json`. Explain each in plain English and how it helps a QA check.
3. **Adapt the example.** In your test file, keep imported Playwright `test` and `expect`, the typed array of TaskFlow filters, the typed object that groups a filter with an expected label, the helper function with its parameter and return type, and the awaited health API check. Add an assertion that the chosen filter appears in the array. Use `const` for values you do not reassign; keep the code focused on this QA check.
4. **See and fix a type error.** Temporarily give one value a type that conflicts with its value. Run `npm.cmd run typecheck` from `taskflow-qa-lab`, note the compiler message in `Type error and correction`, then restore the correct type. Do not leave the broken version in the file.
5. **Run and finish.** From the app folder, run `npm.cmd test -- tests/learner-typescript-practice.spec.ts`. In the `Test` section record the result and explain how the types, helper, import, and awaited assertion support the QA check. Keep the authored test in the suite.
