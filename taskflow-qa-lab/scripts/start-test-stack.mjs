import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mockPath = resolve(projectDirectory, "scripts/mock-supabase-auth.mjs");
const wranglerPath = resolve(projectDirectory, "node_modules/wrangler/bin/wrangler.js");
const children = [];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(exitCode), 300).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

const mock = spawn(process.execPath, [mockPath], { cwd: projectDirectory, stdio: "inherit" });
children.push(mock);
mock.on("error", (error) => {
  console.error(`Could not start the auth mock: ${error.message}`);
  shutdown(1);
});
mock.on("exit", (code) => {
  if (!shuttingDown) shutdown(code ?? 1);
});

await new Promise((resolveReady) => setTimeout(resolveReady, 250));
if (shuttingDown) process.exit(1);

const worker = spawn(
  process.execPath,
  [
    wranglerPath,
    "dev",
    "--local",
    "--ip",
    "127.0.0.1",
    "--port",
    "8787",
    "--var",
    "SUPABASE_URL:http://127.0.0.1:8788",
    "--var",
    "SUPABASE_PUBLISHABLE_KEY:taskflow-playwright-mock-key",
  ],
  { cwd: projectDirectory, stdio: "inherit" },
);
children.push(worker);
worker.on("error", (error) => {
  console.error(`Could not start Wrangler: ${error.message}`);
  shutdown(1);
});
worker.on("exit", (code) => shutdown(code ?? 1));

