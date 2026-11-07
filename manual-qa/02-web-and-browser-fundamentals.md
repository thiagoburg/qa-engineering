# Manual QA 2: Web and Browser Fundamentals

## Theory

A **browser** is a client: it asks another computer for a web page or data. A **server** receives that request and sends a response. When you open a web app, the browser may make many requests: one for the page, others for images, styles, scripts, and data.

A page combines different kinds of files. **HTML** describes content and structure, such as headings, buttons, and inputs. **CSS** controls how those elements look and where they appear. In QA, you usually inspect the page structure and appearance to understand behavior; you do not need to write HTML or CSS in this lesson.

**HTTP** is the request-and-response system used by browsers and web APIs. A request has a method and a URL, and may also have headers and a body. A method describes the kind of action: GET usually reads information; POST usually sends information or creates something. A response has a status code and may have headers and a body. For example, 200 means the request succeeded, 201 usually means something was created, 400 means the request was invalid, and 401 means sign-in is required. A successful response does not by itself prove the whole user journey worked; check the returned data and what the page shows.

**JSON** is a common format for structured data. An object like {"title":"Review checkout","completed":false} has property names and values: title is a string, and completed is a boolean. An API often sends JSON in its response body.

Browser Developer Tools help you inspect the page. **Elements** shows its HTML and applied CSS. **Network** shows requests and responses, including method, path, status, and body. **Console** shows messages and errors. For example, if a task does not appear, a screenshot shows the visible symptom; a failed request in Network may show that the page did not receive the task data. Report what each piece of evidence proves, not a guessed cause.

## Practice

1. **Create your observation file.** Create `manual-qa/submissions/web-request-inspection.md` with headings `Environment`, `Network request`, `Page structure`, `Console`, and `What this evidence does not show`.
2. **Open the local app.** Follow [First-time local setup (Windows)](../taskflow-qa-lab/README.md#first-time-local-setup-windows), open its local address, and sign in with an invented account. Write your browser and viewport under `Environment`.
3. **Inspect one request.** Press F12 and select **Network**. Reload, choose a request with `/api/` in its path, and record its method, path, status, and one JSON response property under `Network request`. Add one sentence describing what the browser requested and what the server returned. Use actual values, then compare the response with the related [Product Specification](../taskflow-qa-lab/README.md#product-specification) rule.
4. **Inspect page content and style.** In **Elements**, find the main heading and record its HTML tag and one applied style under `Page structure`. In **Console**, record whether you saw a relevant message or error; do not guess at its cause.
5. **Finish the note.** Under `What this evidence does not show`, explain what the request response tells you and one thing your observations do not prove about the full app. Keep the note factual and free of personal/account information.
