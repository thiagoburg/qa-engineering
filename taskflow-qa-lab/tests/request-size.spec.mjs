import { request as httpRequest } from "node:http";
import { expect, test } from "@playwright/test";

test("rejects oversized JSON bodies with and without Content-Length", async ({ request: api }) => {
  const largeJson = `{"email":"large@example.test","password":"${"x".repeat(8_300)}"}`;
  const declaredLength = await api.post("/api/auth/register", {
    data: largeJson,
    headers: { "Content-Type": "application/json" },
  });
  expect(declaredLength.status()).toBe(400);

  const response = await new Promise((resolve, reject) => {
    const request = httpRequest("http://127.0.0.1:8787/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Transfer-Encoding": "chunked" },
    }, (result) => {
      let body = "";
      result.setEncoding("utf8");
      result.on("data", (chunk) => { body += chunk; });
      result.on("end", () => resolve({ status: result.statusCode, body }));
    });

    request.on("error", reject);
    expect(request.getHeader("content-length")).toBeUndefined();
    request.write('{"email":"large@example.test","password":"');
    request.write("x".repeat(8_300));
    request.end('"}');
  });

  expect(response.status).toBe(400);
});
