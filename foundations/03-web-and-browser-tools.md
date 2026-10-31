# Foundations 3: Web and Browser Inspection

## Introduction

When a web page behaves unexpectedly, a QA Engineer checks both what the user sees and what the browser requested from the server. This lesson introduces only the web concepts needed for that work.

## Learning objectives

You will identify the browser and server roles, inspect a page with Developer Tools, and recognize the parts of a simple HTTP request and response.

## Concise theory

A browser is the **client**: it requests a page or data. A **server** receives the request and sends a response. **HTML** describes page content and structure; **CSS** controls appearance. JavaScript can make the page respond to actions.

HTTP is the request/response protocol used by browsers and APIs. A request includes a method, a URL, headers, and sometimes a body. Common methods include `GET` to read and `POST` to submit. A response includes a status code, headers, and sometimes a body. For example, `200` means the request succeeded, `201` means a resource was created, `400` means the request was invalid, and `401` means authentication is required.

JSON is a text format for structured data, often used in APIs: `{"title":"Review checkout","completed":false}`. Browser Developer Tools can show page structure, styles, console messages, and network requests.

## Practical example

In TaskFlow, opening the task list should create a `GET /api/tasks` request. The browser's Network panel can show the method, status, response body, and timing. A screenshot alone may show a symptom; the response can help explain whether the issue came from the page or its API.

## Guided practice

1. Start TaskFlow locally using the commands in the root README.
2. Open the app in a browser and press `F12` to open Developer Tools.
3. Select **Network**, reload the page, and find a request whose URL begins with `/api/`.
4. Record its request method, status code, and a field from the response body.
5. Select **Elements** and locate the page's main heading. Observe its HTML tag and one applied style; do not edit the application.

## Assignment

Create `submissions/foundations/taskflow-request.md`. Include the page/feature, request method and path, response status, one observed JSON field, and one sentence describing what the evidence tells you. Use only values you observed.

## Definition of Done

- The note records an actual request from the local app.
- Method, path, status, and JSON evidence are present.
- The conclusion does not claim more than the evidence shows.

## Submission instructions

Save the note under `submissions/foundations/` and share it in the project chat for review. Commit it after the review.

## Optional extra credit

Compare a successful API response with the response you receive after logging out and requesting the same task list.
