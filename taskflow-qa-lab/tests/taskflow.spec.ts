import { expect, test, type Page } from "@playwright/test";

const password = "Practice-only-456!";

function uniqueEmail(): string {
  return `qa-test-${process.env.PW_TEST_RUN_ID ?? "local"}-${crypto.randomUUID()}@example.test`;
}

test("supports opening account actions with the keyboard", async ({ page }) => {
  await page.goto("/");
  const createAccount = page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Create account" });
  await createAccount.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#register-panel")).toBeVisible();
});

test("shows a useful message and retry when task loading fails after sign-in", async ({ page }) => {
  let failed = false;
  await page.route("**/api/tasks?status=all", async (route) => {
    if (!failed) {
      failed = true;
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({ status: 503, json: { error: "Service temporarily unavailable." } });
    }
    else await route.continue();
  });
  await register(page);
  await expect(page.locator("#loading-tasks")).toBeVisible();
  await expect(page.getByText(/Could not load your tasks/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Try loading tasks again" })).toBeVisible();
  await page.getByRole("button", { name: "Try loading tasks again" }).click();
  await expect(page.getByText(/Could not load your tasks/)).toBeHidden();
  await expect(page.getByText("0 active · 0 completed · 0 total")).toBeVisible();
});

test("shows an error and allows retry when statistics fail", async ({ page }) => {
  let failed = false;
  await page.route("**/api/tasks/stats", async (route) => {
    if (!failed) { failed = true; await route.fulfill({ status: 503, json: { error: "Statistics unavailable." } }); }
    else await route.continue();
  });
  await register(page);
  await expect(page.getByText(/Could not load your tasks/)).toBeVisible();
  await page.getByRole("button", { name: "Try loading tasks again" }).click();
  await expect(page.getByText("0 active · 0 completed · 0 total")).toBeVisible();
});

test("shows a message if the sign-out request cannot reach the server", async ({ page }) => {
  await register(page);
  await page.route("**/api/auth/logout", (route) => route.abort());
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByText(/Could not sign out/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeVisible();
});

test("keeps a simulated logout failure scoped to its session during another sign-out", async ({ page, browser }) => {
  await register(page);
  const token = (await page.context().cookies()).find((cookie) => cookie.name === "taskflow_session")?.value;
  expect(token).toBeTruthy();
  await page.request.post("http://127.0.0.1:8788/__test/fail-logout-for-token", { data: { token } });

  const otherContext = await browser.newContext();
  try {
    const otherPage = await otherContext.newPage();
    await register(otherPage);
    await otherPage.getByRole("button", { name: "Sign out" }).click();
    await expect(otherPage.getByRole("heading", { name: "Sign in to TaskFlow" })).toBeVisible();
  } finally {
    await otherContext.close();
  }

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("heading", { name: "Sign in to TaskFlow" })).toBeVisible();
  await expect(page.locator("#auth-status")).toContainText("could not confirm sign-out");
  expect((await page.context().cookies()).some((cookie) => cookie.name === "taskflow_session")).toBe(false);
  expect((await page.request.get("/api/tasks")).status()).toBe(401);
});

test("shows a retry when checking the current session temporarily fails", async ({ page }) => {
  let failed = false;
  await page.route("**/api/auth/me", async (route) => {
    if (!failed) {
      failed = true;
      await route.fulfill({ status: 503, json: { error: "Authentication service is unavailable." } });
    } else await route.continue();
  });
  await page.goto("/");
  await expect(page.locator("#auth-status")).toContainText("Could not check your sign-in status");
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("#auth-status")).toBeEmpty();
  await expect(page.getByRole("button", { name: "Try again" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Sign in to TaskFlow" })).toBeVisible();
});

test("rejects incorrect credentials with a clear message", async ({ page }) => {
  await page.goto("/");
  const login = page.locator("#login-panel");
  await login.getByLabel("Email address").fill(uniqueEmail());
  await login.getByLabel("Password").fill(password);
  await login.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("alert")).toContainText("incorrect");
});

test("reports when email confirmation is required during registration", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Create account" }).click();
  const registration = page.locator("#register-panel");
  await registration.getByLabel("Email address").fill(`qa-${crypto.randomUUID()}@confirm.example.test`);
  await registration.getByLabel(/Password/).fill(password);
  await registration.getByRole("button", { name: "Create account" }).click();
  await expect(page.locator("#register-message")).toContainText("Check your email to confirm");
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeHidden();
});

test("normalizes registration email spaces and letter case", async ({ page }) => {
  const email = uniqueEmail();
  const registration = await page.request.post("/api/auth/register", {
    data: { email: `  ${email.toUpperCase()}  `, password },
  });
  expect(registration.status()).toBe(201);
  expect((await registration.json()).user.email).toBe(email);

  const duplicate = await page.request.post("/api/auth/register", {
    data: { email: ` ${email.toUpperCase()} `, password },
  });
  expect(duplicate.status()).toBe(409);

  await page.request.post("/api/auth/logout");
  const login = await page.request.post("/api/auth/login", {
    data: { email: ` ${email.toUpperCase()} `, password },
  });
  expect(login.status()).toBe(200);
  expect((await login.json()).user.email).toBe(email);
});

async function register(page: Page, email = uniqueEmail()): Promise<string> {
  await page.goto("/");
  await page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Create account" }).click();
  const registration = page.locator("#register-panel");
  await registration.getByLabel("Email address").fill(email);
  await registration.getByLabel(/Password/).fill(password);
  await registration.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeVisible();
  const sessionCookie = (await page.context().cookies()).find((cookie) => cookie.name === "taskflow_session");
  expect(sessionCookie?.httpOnly).toBe(true);
  expect(sessionCookie?.sameSite).toBe("Lax");
  return email;
}

test("registers, rejects a duplicate email, signs out, and signs back in", async ({ page }) => {
  const email = await register(page);
  await expect(page.getByText("0 active · 0 completed · 0 total")).toBeVisible();

  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Create account" }).click();
  const registration = page.locator("#register-panel");
  await registration.getByLabel("Email address").fill(email.toUpperCase());
  await registration.getByLabel(/Password/).fill(password);
  await registration.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("alert")).toContainText("already exists");

  await page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Sign in" }).click();
  const login = page.locator("#login-panel");
  await login.getByLabel("Email address").fill(email);
  await login.getByLabel("Password").fill(password);
  await login.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeVisible();
});

test("creates, completes, filters, edits, and deletes a task", async ({ page }) => {
  await register(page);
  await page.getByLabel(/Title/).fill("Review the sign-in form");
  await page.getByLabel(/Description/).fill("Check the error message and keyboard flow.");
  await page.getByRole("button", { name: "Add task" }).click();
  const item = page.locator("[data-task-id]").filter({ hasText: "Review the sign-in form" });
  await expect(item).toBeVisible();
  await expect(item).toContainText("Check the error message and keyboard flow.");
  await expect(page.getByText("1 active · 0 completed · 1 total")).toBeVisible();

  await item.getByRole("checkbox").check();
  await expect(page.getByText("0 active · 1 completed · 1 total")).toBeVisible();
  await page.getByRole("button", { name: "Active", exact: true }).click();
  await expect(page.getByText("No tasks match this filter.")).toBeVisible();
  await page.getByRole("button", { name: "Completed", exact: true }).click();
  await expect(item).toBeVisible();

  await item.getByRole("button", { name: "Edit Review the sign-in form" }).click();
  await page.getByLabel("Task title").fill("Review login validation");
  await page.getByRole("button", { name: "Save" }).click();
  const edited = page.locator("[data-task-id]").filter({ hasText: "Review login validation" });
  await expect(edited).toBeVisible();

  page.on("dialog", (dialog) => dialog.accept());
  await edited.getByRole("button", { name: "Delete Review login validation" }).click();
  await expect(page.getByText("No tasks match this filter.")).toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.getByText("0 active · 0 completed · 0 total")).toBeVisible();
});

test("counts title and description limits by Unicode code point for create and edit", async ({ page }) => {
  await register(page);
  const maximumTitle = "😀".repeat(120);
  const maximumDescription = "🧪".repeat(1000);

  const createdAtLimit = await page.request.post("/api/tasks", {
    data: { title: maximumTitle, description: maximumDescription },
  });
  expect(createdAtLimit.status()).toBe(201);

  const createdWithPaddedDescription = await page.request.post("/api/tasks", {
    data: { title: "Trim description on create", description: `  ${maximumDescription}  ` },
  });
  expect(createdWithPaddedDescription.status()).toBe(201);
  expect((await createdWithPaddedDescription.json()).task.description).toBe(maximumDescription);

  const createdWithTrimmedDescriptionOverLimit = await page.request.post("/api/tasks", {
    data: { title: "Reject long trimmed description", description: `  ${maximumDescription}🧪  ` },
  });
  expect(createdWithTrimmedDescriptionOverLimit.status()).toBe(400);

  const createdOverLimit = await page.request.post("/api/tasks", {
    data: { title: `${maximumTitle}😀`, description: "" },
  });
  expect(createdOverLimit.status()).toBe(400);

  const created = await page.request.post("/api/tasks", { data: { title: "Edit Unicode limits" } });
  expect(created.status()).toBe(201);
  const { task } = await created.json();
  const editedAtLimit = await page.request.patch(`/api/tasks/${task.id}`, {
    data: { title: maximumTitle, description: maximumDescription },
  });
  expect(editedAtLimit.status()).toBe(200);

  const editedWithPaddedDescription = await page.request.patch(`/api/tasks/${task.id}`, {
    data: { description: `  ${maximumDescription}  ` },
  });
  expect(editedWithPaddedDescription.status()).toBe(200);
  expect((await editedWithPaddedDescription.json()).task.description).toBe(maximumDescription);

  const editedOverTitleLimit = await page.request.patch(`/api/tasks/${task.id}`, {
    data: { title: `${maximumTitle}😀` },
  });
  expect(editedOverTitleLimit.status()).toBe(400);
  const editedOverDescriptionLimit = await page.request.patch(`/api/tasks/${task.id}`, {
    data: { description: `${maximumDescription}🧪` },
  });
  expect(editedOverDescriptionLimit.status()).toBe(400);
  const editedWithTrimmedDescriptionOverLimit = await page.request.patch(`/api/tasks/${task.id}`, {
    data: { description: `  ${maximumDescription}🧪  ` },
  });
  expect(editedWithTrimmedDescriptionOverLimit.status()).toBe(400);
});

test("enforces Unicode code-point limits in the browser form", async ({ page }) => {
  await register(page);
  const title = page.getByLabel(/Title/);
  const description = page.getByLabel(/Description/);

  await title.fill("😀".repeat(121));
  expect(await title.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
  await title.fill("😀".repeat(120));
  expect(await title.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(true);
  await title.fill(`  ${"😀".repeat(120)}  `);
  expect(await title.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(true);

  await description.fill("🧪".repeat(1001));
  expect(await description.evaluate((input: HTMLTextAreaElement) => input.validity.valid)).toBe(false);
  await description.fill("🧪".repeat(1000));
  expect(await description.evaluate((input: HTMLTextAreaElement) => input.validity.valid)).toBe(true);
  await description.fill(`  ${"🧪".repeat(1000)}  `);
  expect(await description.evaluate((input: HTMLTextAreaElement) => input.validity.valid)).toBe(true);
  await description.fill(`  ${"🧪".repeat(1001)}  `);
  expect(await description.evaluate((input: HTMLTextAreaElement) => input.validity.valid)).toBe(false);
  await description.fill(`  ${"🧪".repeat(1000)}  `);
  await page.getByRole("button", { name: "Add task" }).click();
  await expect(page.locator("[data-task-id]")).toContainText("😀".repeat(120));
  await expect(page.locator("[data-task-id] p.task-description")).toHaveText("🧪".repeat(1000));
});

test("keeps task data after reload and returns a useful unauthenticated API response", async ({ page }) => {
  await register(page);
  await page.getByLabel(/Title/).fill("Check persistence");
  await page.getByRole("button", { name: "Add task" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeVisible();
  await expect(page.getByText("Check persistence")).toBeVisible();

  await page.getByRole("button", { name: "Sign out" }).click();
  const response = await page.request.get("/api/tasks");
  expect(response.status()).toBe(401);
  const missingRoute = await page.request.get("/api/not-a-route");
  expect(missingRoute.status()).toBe(404);
  const unsupportedMethod = await page.request.put("/api/tasks", { data: { title: "Not supported" } });
  expect(unsupportedMethod.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Sign in to TaskFlow" })).toBeVisible();
});

test("does not expose one user's tasks to another account", async ({ page }) => {
  await register(page);
  const created = await page.request.post("/api/tasks", {
    data: { title: "Private training task", description: "Belongs to the first user" },
  });
  expect(created.status()).toBe(201);
  const { task } = await created.json();

  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("group", { name: "Account actions" }).getByRole("button", { name: "Create account" }).click();
  const registration = page.locator("#register-panel");
  await registration.getByLabel("Email address").fill(uniqueEmail());
  await registration.getByLabel(/Password/).fill(password);
  await registration.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "My tasks" })).toBeVisible();

  const list = await page.request.get("/api/tasks");
  expect((await list.json()).tasks).toEqual([]);
  const update = await page.request.patch(`/api/tasks/${task.id}`, { data: { title: "Try to change it" } });
  expect(update.status()).toBe(404);
  const remove = await page.request.delete(`/api/tasks/${task.id}`);
  expect(remove.status()).toBe(404);
});

test("validates API inputs and renders task text as text", async ({ page }) => {
  await register(page);
  const invalidTask = await page.request.post("/api/tasks", { data: { title: "   " } });
  expect(invalidTask.status()).toBe(400);
  expect((await invalidTask.json()).error).toContain("title");

  const invalidFilter = await page.request.get("/api/tasks?status=unknown");
  expect(invalidFilter.status()).toBe(400);

  await page.getByLabel(/Title/).fill("<img src=x onerror=alert(1)>");
  await page.getByRole("button", { name: "Add task" }).click();
  await expect(page.getByText("<img src=x onerror=alert(1)>", { exact: true })).toBeVisible();
  await expect(page.locator("#task-list img")).toHaveCount(0);
});

test("enforces the documented UTF-8 password byte boundaries", async ({ page }) => {
  const tooShort = await page.request.post("/api/auth/register", {
    data: { email: uniqueEmail(), password: "é".repeat(5) },
  });
  expect(tooShort.status()).toBe(400);

  const atMinimum = await page.request.post("/api/auth/register", {
    data: { email: uniqueEmail(), password: "é".repeat(6) },
  });
  expect(atMinimum.status()).toBe(201);

  const atMaximum = await page.request.post("/api/auth/register", {
    data: { email: uniqueEmail(), password: "é".repeat(128) },
  });
  expect(atMaximum.status()).toBe(201);

  const tooLong = await page.request.post("/api/auth/register", {
    data: { email: uniqueEmail(), password: "é".repeat(129) },
  });
  expect(tooLong.status()).toBe(400);
});
