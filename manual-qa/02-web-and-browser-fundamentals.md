# Manual QA 2: Web and Browser Fundamentals

## Theory

A **browser** is a client: it asks another computer for a web page or data. A **server** receives that request and sends a response. When you open a web app, the browser may make many requests: one for the page, others for images, styles, scripts, and data.

A page combines different kinds of files. **HTML** describes content and structure, such as headings, buttons, and inputs. **CSS** controls how those elements look and where they appear. In QA, you usually inspect the page structure and appearance to understand behavior; you do not need to write HTML or CSS in this lesson.

**HTTP** is the request-and-response system used by browsers and web APIs. A request has a method and a URL, and may also have headers and a body. A method describes the kind of action: GET usually reads information; POST usually sends information or creates something. A response has a status code and may have headers and a body. For example, 200 means the request succeeded, 201 usually means something was created, 400 means the request was invalid, and 401 means sign-in is required. A successful response does not by itself prove the whole user journey worked; check the returned data and what the page shows.

**JSON** is a common format for structured data. An object like {"title":"Review checkout","completed":false} has property names and values: title is a string, and completed is a boolean. An API often sends JSON in its response body.

Browser Developer Tools help you inspect the page. **Elements** shows its HTML and applied CSS. **Network** shows requests and responses, including method, path, status, and body. **Console** shows messages and errors. For example, if a task does not appear, a screenshot shows the visible symptom; a failed request in Network may show that the page did not receive the task data. Report what each piece of evidence proves, not a guessed cause.

## Practice

1. **Create the observation file.** Create `manual-qa/submissions/web-request-inspection.md` with these exact headings: `## Environment`, `## Network request`, `## Page structure`, `## Console`, and `## What this evidence does not show`.
2. **Open the local app.** Follow [First-time local setup (Windows)](../taskflow-qa-lab/README.md#first-time-local-setup-windows), open the local address Wrangler prints, and sign in with an invented account. Under `## Environment`, write your browser name and viewport width × height. If setup fails, record the message here and stop.
3. **Inspect an API request.** Press F12, choose **Network**, reload the page, and select one request whose path starts with `/api/`. Under `## Network request`, record its method, path, status, and one JSON response property as shown in Developer Tools. Add one sentence saying what the browser requested and what the server returned; compare it with the relevant [Product Specification](../taskflow-qa-lab/README.md#product-specification) rule.
4. **Inspect the page and console.** In **Elements**, select the main heading and write its HTML tag and one visible applied style under `## Page structure`. In **Console**, state whether you observed a relevant message or error. Do not guess at its cause.
5. **Describe the evidence limit.** Under `## What this evidence does not show`, state what the selected response confirms and one thing these observations cannot prove about the full app. Keep the note free of account details.
