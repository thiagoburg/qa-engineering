# Manual QA 6: API Testing with HTTP and Postman

## Theory

An **API** lets one program ask another program for data or an action. In TaskFlow, the browser uses the same API that you can inspect directly in Postman. This can help you see whether an unexpected page result also appears in the server response.

An HTTP **request** includes a method, a URL, and sometimes headers and a body. The method describes the action: GET usually reads, POST usually creates, PATCH updates part of a resource, and DELETE removes it. Headers carry extra information; for example, Content-Type tells the server that a request body contains JSON. A **query parameter** adds a filter to the URL, such as status=active. A JSON body could contain a task title and description.

The server's **response** includes a status code and may include headers and a body. In this app, 200 means success, 201 means a resource was created, 204 means success with no response body, 400 means invalid input, 401 means sign-in is needed, and 404 means the resource was not found or is not available to that user. Check the response body and the resulting task state as well as the status: the right status can still accompany the wrong data.

Postman lets you save related requests in a **collection**. A collection variable such as baseUrl helps you reuse the local app address. Requests after sign-in may use an authentication cookie; let Postman manage the cookie jar and never copy a token into your notes or a shared export. TaskFlow's [API Reference](../taskflow-qa-lab/README.md#api-reference) lists routes, and its [Product Specification](../taskflow-qa-lab/README.md#product-specification) describes expected behavior.

For example, GET /api/tasks?status=active should list only the signed-in user's active tasks. A POST to /api/tasks with a valid JSON title should create a task. After sign-out, a protected task request should require sign-in. A successful DELETE returns 204 with no body, so there is no JSON response to inspect.

## Practice

1. **Create the API report.** Create `manual-qa/submissions/taskflow-api-checks.md`. Add a table with columns `request | input and headers | expected | observed status/body | result`, at least eight empty data rows, and a `## Conclusion` heading below the table.
2. **Prepare the local app and Postman.** Follow [First-time local setup (Windows)](../taskflow-qa-lab/README.md#first-time-local-setup-windows). In local TaskFlow, register using invented details; if confirmation is required, follow the Supabase Auth setup notes in the app README. In Postman, create a collection named `TaskFlow QA Lab local` and set `baseUrl` to the printed local address.
3. **Check the health route.** Send `GET {{baseUrl}}/api/health`. In the first table row, record method and URL under `request`, relevant headers/body under `input and headers`, expected status/body from the [API Reference](../taskflow-qa-lab/README.md#api-reference), and the observed status/body and Pass/Fail result in their columns.
4. **Check authenticated routes.** Send `POST {{baseUrl}}/api/auth/login` with the invented email and password as JSON; let Postman manage the cookie and never copy it. Then check current user, task create, list/filter, statistics, update, and delete. Add one row per request using the same column instructions as step 3; record a sanitized body description, not the password or cookie.
5. **Check errors and access.** Send an invalid-title request and an unknown-filter request, then sign out and request the protected task list. Add one row per request. Compare expected results with the API Reference and [Product Specification](../taskflow-qa-lab/README.md#product-specification), and mark Pass or Fail from the observed response.
6. **Finish and sanitize the report.** Below the table, add a `## Conclusion` heading and explain how API evidence distinguishes a page problem from a server response. Confirm the table covers create/read/update/delete, validation, and unauthenticated access. Remove passwords, cookies, tokens, and personal information.
