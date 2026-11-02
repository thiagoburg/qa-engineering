# Automation QA 3: TypeScript for QA

## Theory

TypeScript is JavaScript with type checking. You do not need to become a general software developer for QA work. Learn enough TypeScript to read a test, change a check safely, understand a compiler message, and add small test helpers.

A **variable** gives a value a name. Use const when you will not assign a different value to that name; use let when you need to assign it again. Common values are strings for text, numbers for counts, and booleans for true/false. Arrays hold several values, such as a list of valid task filters. An object groups related values, such as a task title and completion state.

A **type** describes what kind of value is expected. TypeScript can infer many types from the value, but you can also write them: a title is a string, a count is a number, and a list of titles can be string[]. An object type explains its fields. Types help catch mistakes before the test runs; they do not prove that the product behaves correctly.

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
  const response = await request.get("/api/health");
  const body: { status: string } = await response.json();

  expect(response.status()).toBe(200);
  expect(body.status).toBe("ok");
  expect(makeTitle(1)).toBe("qa-title-1");
});
```

## Practice

1. Open taskflow-qa-lab/tests/taskflow.spec.ts. Find an import, a test name, a variable, a function, and an awaited browser or API operation. Explain what each one contributes to a QA check.
2. From taskflow-qa-lab, create tests/learner-typescript-practice.spec.ts using the example above. Add a string array of TaskFlow filter names and check one value with an assertion.
3. Change the declared type of one value so it conflicts with its value. Run the app's typecheck command, read the error, and then correct the type. A compiler error means the code needs fixing; it is not a product defect.
4. Run npm run typecheck, then run npm test -- tests/learner-typescript-practice.spec.ts against the local test stack. Confirm the API status and response body assertions pass, and keep the learner-authored test in the TaskFlow test suite.
5. Save automation-qa/submissions/typescript-notes.md with five annotated examples and identify the learner-authored test file: values/types, an array or object, a small function, an import, and an awaited API or browser operation. Include the compiler error you corrected and explain how the examples support QA testing.

Use Node.js/npm, TypeScript, the existing Playwright project, and an editor. The app README explains how to run commands from taskflow-qa-lab. Do not add programming examples that are unrelated to reading, writing, or debugging QA tests.
