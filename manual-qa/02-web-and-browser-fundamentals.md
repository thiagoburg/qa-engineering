# Manual QA 2: Web and Browser Fundamentals

## Theory

A **browser** is a client: it asks another computer for a web page or data. A **server** receives that request and sends a response. When you open a web app, the browser may make many requests: one for the page, others for images, styles, scripts, and data.

A page combines different kinds of files. **HTML** describes content and structure, such as headings, buttons, and inputs. **CSS** controls how those elements look and where they appear. In QA, you usually inspect the page structure and appearance to understand behavior; you do not need to write HTML or CSS in this lesson.

**HTTP** is the request-and-response system used by browsers and web APIs. A request has a method and a URL, and may also have headers and a body. A method describes the kind of action: GET usually reads information; POST usually sends information or creates something. A response has a status code and may have headers and a body. For example, 200 means the request succeeded, 201 usually means something was created, 400 means the request was invalid, and 401 means sign-in is required. A successful response does not by itself prove the whole user journey worked; check the returned data and what the page shows.

**JSON** is a common format for structured data. An object like {"title":"Review checkout","completed":false} has property names and values: title is a string, and completed is a boolean. An API often sends JSON in its response body.

Browser Developer Tools help you inspect the page. **Elements** shows its HTML and applied CSS. **Network** shows requests and responses, including method, path, status, and body. **Console** shows messages and errors. For example, if a task does not appear, a screenshot shows the visible symptom; a failed request in Network may show that the page did not receive the task data. Report what each piece of evidence proves, not a guessed cause.

## Practice

1. Start TaskFlow locally by following the [app README](../taskflow-qa-lab/README.md#run-locally). Use an invented account and local D1; do not test destructive actions on Preview or production.
2. Open the app and open Developer Tools with F12.
3. In **Network**, reload the page and select a request whose path contains /api/. Record its method, path, status, and one property from its JSON response. Use actual observed values.
4. In **Elements**, find the main heading and record its HTML tag and one applied style. Do not edit the app.
5. In your note, explain what the request response tells you, what the Console shows, and one thing this evidence does not prove about the full app.

Use TaskFlow, a browser, Developer Tools, the [Product Specification](../taskflow-qa-lab/README.md#product-specification), and a Markdown editor. Save the observations in manual-qa/submissions/web-request-inspection.md. Keep the note factual and do not include personal or account information.
