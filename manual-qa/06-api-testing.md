# Manual QA 6: API Testing with HTTP and Postman

## Theory

An **API** lets one program ask another program for data or an action. In TaskFlow, the browser uses the same API that you can inspect directly in Postman. This can help you see whether an unexpected page result also appears in the server response.

An HTTP **request** includes a method, a URL, and sometimes headers and a body. The method describes the action: GET usually reads, POST usually creates, PATCH updates part of a resource, and DELETE removes it. Headers carry extra information; for example, Content-Type tells the server that a request body contains JSON. A **query parameter** adds a filter to the URL, such as status=active. A JSON body could contain a task title and description.

The server's **response** includes a status code and may include headers and a body. In this app, 200 means success, 201 means a resource was created, 204 means success with no response body, 400 means invalid input, 401 means sign-in is needed, and 404 means the resource was not found or is not available to that user. Check the response body and the resulting task state as well as the status: the right status can still accompany the wrong data.

Postman lets you save related requests in a **collection**. A collection variable such as baseUrl helps you reuse the local app address. Requests after sign-in may use an authentication cookie; let Postman manage the cookie jar and never copy a token into your notes or a shared export. TaskFlow's [API Reference](../taskflow-qa-lab/README.md#api-reference) lists routes, and its [Product Specification](../taskflow-qa-lab/README.md#product-specification) describes expected behavior.

For example, GET /api/tasks?status=active should list only the signed-in user's active tasks. A POST to /api/tasks with a valid JSON title should create a task. After sign-out, a protected task request should require sign-in. A successful DELETE returns 204 with no body, so there is no JSON response to inspect.

## Practice

1. Open Postman and create a collection named TaskFlow QA Lab local. Set a collection variable named baseUrl to the local TaskFlow address from the app README.
2. Send GET to the health route. Record the request and response; use the response to confirm the local API is reachable.
3. Use a dummy account and let Postman store the authentication cookie. Send requests for current user, create, list with filters, statistics, update, delete, invalid title, unknown filter, and unauthenticated access.
4. For each request, compare method, URL, input, status, response body, and task state with the API Reference and Product Specification. Include successful and error cases.
5. Save only sanitized request details. Do not export passwords, cookies, token-bearing headers, or real user information.

Use Postman and TaskFlow's API documentation. Save your report in manual-qa/submissions/taskflow-api-checks.md with at least eight rows showing request, expected result, observed result, and pass/fail; include create/read/update/delete, validation, and unauthenticated behavior. Add a short conclusion about what direct API evidence helps you isolate.
