import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const currentDirectory = resolve(process.cwd());
const configPath = resolve(projectDirectory, "wrangler.jsonc");
const sqlPath = resolve(projectDirectory, "scripts/reset-local-data.sql");

if (currentDirectory !== projectDirectory) {
  console.error("Safety stop: run this command from the TaskFlow QA Lab folder.");
  process.exit(1);
}

if (!existsSync(configPath) || !existsSync(sqlPath)) {
  console.error("Safety stop: local database configuration or reset script is missing.");
  process.exit(1);
}

const config = readFileSync(configPath, "utf8");
if (!config.includes('"database_name": "taskflow-qa-lab-production"') || !config.includes('"binding": "DB"')) {
  console.error("Safety stop: the expected local database binding was not found.");
  process.exit(1);
}

console.log("This will delete TaskFlow training rows from Wrangler's LOCAL database only.");
const executable = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(
  executable,
  ["wrangler", "d1", "execute", "DB", "--local", "--file", "scripts/reset-local-data.sql"],
  { cwd: projectDirectory, stdio: "inherit", shell: process.platform === "win32" },
);

if (result.error) {
  console.error(`Reset did not run: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);

