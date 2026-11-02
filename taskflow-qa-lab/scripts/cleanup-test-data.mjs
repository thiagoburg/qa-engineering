import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = resolve(projectDirectory, "wrangler.jsonc");

export default async function cleanupTestData() {
  const runId = process.env.PW_TEST_RUN_ID;
  if (resolve(process.cwd()) !== projectDirectory) {
    throw new Error("Test-data cleanup stopped: it must run from the TaskFlow QA Lab folder.");
  }
  if (!runId || !/^\d+-[\da-f]+$/i.test(runId)) {
    throw new Error("Test-data cleanup stopped: the Playwright run ID is missing or invalid.");
  }

  const config = readFileSync(configPath, "utf8");
  if (!config.includes('"binding": "DB"') || !config.includes('"database_name": "taskflow-qa-lab-production"')) {
    throw new Error("Test-data cleanup stopped: expected local TaskFlow database configuration was not found.");
  }

  const emailPrefix = `qa-test-${runId}-`;
  const sqlLiteral = `'${emailPrefix.replaceAll("'", "''")}%'`;
  const sql = `DELETE FROM tasks WHERE user_id IN (SELECT id FROM users WHERE email LIKE ${sqlLiteral});\nDELETE FROM users WHERE email LIKE ${sqlLiteral};`;
  const wranglerPath = resolve(projectDirectory, "node_modules/wrangler/bin/wrangler.js");
  const result = spawnSync(
    process.execPath,
    [wranglerPath, "d1", "execute", "DB", "--local", "--command", sql],
    { cwd: projectDirectory, encoding: "utf8" },
  );

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) throw new Error(`Test-data cleanup could not run: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`Test-data cleanup failed with exit code ${result.status}.`);
  console.log(`Removed local test data for run ${runId}; learner-created data was not selected.`);
}
