# Manual QA 6: API Testing with HTTP and Postman

## Theory

An **API** lets one program ask another program for data or an action. In TaskFlow, the browser uses the same API that you can inspect directly in Postman. This can help you see whether an unexpected page result also appears in the server response.

An HTTP **request** includes a method, a URL, and sometimes headers and a body. The method describes the action: GET usually reads, POST usually creates, PATCH updates part of a resource, and DELETE removes it. Headers carry extra information; for example, Content-Type tells the server that a request body contains JSON. A **query parameter** adds a filter to the URL, such as status=active. A JSON body could contain a task title and description.

The server's **response** includes a status code and may include headers and a body. In this app, 200 means success, 201 means a resource was created, 204 means success with no response body, 400 means invalid input, 401 means sign-in is needed, and 404 means the resource was not found or is not available to that user. Check the response body and the resulting task state as well as the status: the right status can still accompany the wrong data.

Postman lets you save related requests in a **collection**. A collection variable such as baseUrl helps you reuse the local app address. Requests after sign-in may use an authentication cookie; let Postman manage the cookie jar and never copy a token into your notes or a shared export. TaskFlow's [API Reference](../taskflow-qa-lab/README.md#api-reference) lists routes, and its [Product Specification](../taskflow-qa-lab/README.md#product-specification) describes expected behavior.

For example, GET /api/tasks?status=active should list only the signed-in user's active tasks. A POST to /api/tasks with a valid JSON title should create a task. After sign-out, a protected task request should require sign-in. A successful DELETE returns 204 with no body, so there is no JSON response to inspect.

## Practice

1. **Create your API report.** Create `manual-qa/submissions/taskflow-api-checks.md` with a table headed `request | input and headers | expected | observed status/body | result`. Add at least eight blank rows before sending requests.
2. **Prepare the app and collection.** Follow [First-time local setup (Windows)](../taskflow-qa-lab/README.md#first-time-local-setup-windows). In the local app, create an account with invented details. If confirmation is required, use the app README's Supabase Auth setup notes. In Postman, create a collection named `TaskFlow QA Lab local` and set `baseUrl` to the local app address.
3. **Check availability.** Send `GET {{baseUrl}}/api/health`. Fill one table row with method, URL, expected status/body from the [API Reference](../taskflow-qa-lab/README.md#api-reference), and the status/body you observed.
4. **Sign in and check protected routes.** Send `POST {{baseUrl}}/api/auth/login` with the invented account's email/password as JSON. Let Postman store the returned cookie; never copy it into your notes. Then request current user, create task, list/filter, statistics, update, and delete. For each, record method, URL (including a filter query parameter), relevant headers such as `Content-Type: application/json`, a sanitized request-body description, expected result, and actual status/body. Never record the password.
5. **Check error behavior.** Send an invalid-title request and an unknown-filter request. Sign out and request the protected task list. Compare with the API Reference and [Product Specification](../taskflow-qa-lab/README.md#product-specification); add rows for each check and mark Pass or Fail based on observed behavior.
6. **Review and sanitize.** Confirm the report has at least eight rows covering create/read/update/delete, validation, and unauthenticated behavior. Add a short conclusion explaining how API evidence helps distinguish a page problem from a server response. Remove passwords, cookies, tokens, and personal information.
