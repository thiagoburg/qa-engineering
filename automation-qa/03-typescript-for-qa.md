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

1. **Create the code and notes.** From the repository root, create `taskflow-qa-lab/tests/learner-typescript-practice.spec.ts` and paste in the theory’s code example. Create `automation-qa/submissions/typescript-notes.md` with exact headings `## Existing code`, `## Test`, and `## Type error and correction`.
2. **Inspect existing TypeScript.** Open `taskflow-qa-lab/tests/taskflow.spec.ts` and `taskflow-qa-lab/package.json`. Under `## Existing code`, explain one example each of an import, test name, `const`/`let`, inferred type, array or object, function, `if`, and awaited browser/API operation. From `package.json`, record the exact test and typecheck commands and one Playwright dependency. For each, say how it supports a QA check.
3. **Build the practice test.** In `learner-typescript-practice.spec.ts`, keep Playwright `test` and `expect` imports, the typed TaskFlow filter array, an object grouping a filter and expected label, a helper with parameter and return types, and an awaited health API check. Add an assertion that the chosen filter is in the array. Use `const` for values not reassigned. Keep this one focused QA test.
4. **Observe and correct a type error.** Temporarily give one value an incompatible type, then run `npm.cmd run typecheck` from `taskflow-qa-lab`. Under `## Type error and correction`, record the compiler message and the corrected type. Restore the valid code; do not leave the intentional error in the file.
5. **Run and explain the test.** From `taskflow-qa-lab`, run `npm.cmd test -- tests/learner-typescript-practice.spec.ts`. Under `## Test`, record the command, result, and how the imports, types, helper, and awaited assertion support the check. Keep the learner-authored test in `taskflow-qa-lab/tests/` so the suite can discover it.
