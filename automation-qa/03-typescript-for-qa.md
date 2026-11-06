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

1. **Read an existing check.** Open `taskflow-qa-lab/tests/taskflow.spec.ts`. Find an import, test name, variable, function, and awaited browser/API operation. In your notes, explain the job each does in that QA check.
2. **Create a focused test.** From `taskflow-qa-lab`, create `tests/learner-typescript-practice.spec.ts` using the theory example. Add a string array of TaskFlow filter names and an assertion for one value.
3. **Observe a type error safely.** Change one declared type so it conflicts with its value. Run `npm.cmd run typecheck`, read the diagnostic, then restore a correct type. A type error is a code-checking problem before execution, not evidence of a product defect.
4. **Run the test.** Run `npm.cmd test -- tests/learner-typescript-practice.spec.ts` from the app folder. Record whether it passes and the observed API status/body. Keep the test learner-authored and in the test suite.
5. **Submit your notes.** Save `automation-qa/submissions/typescript-notes.md` with five annotated examples: values/types, array or object, small function, import, and awaited API/browser operation. Identify your test file, include the corrected compiler message in your own words, and explain how each example helps QA work.
