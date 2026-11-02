const authView = document.querySelector("#auth-view");
const taskView = document.querySelector("#task-view");
const loginTab = document.querySelector("#login-tab");
const registerTab = document.querySelector("#register-tab");
const loginForm = document.querySelector("#login-panel");
const registerForm = document.querySelector("#register-panel");
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const stats = document.querySelector("#task-stats");
const accountLabel = document.querySelector("#account-label");
const listMessage = document.querySelector("#list-message");
const retryTasks = document.querySelector("#retry-tasks");
const loadingTasks = document.querySelector("#loading-tasks");
const authStatus = document.querySelector("#auth-status");
const retrySession = document.querySelector("#retry-session");
let activeFilter = "all";

function bindCodePointLimit(input, maximum, label) {
  const validate = () => {
    const count = Array.from(input.value.trim()).length;
    input.setCustomValidity(count > maximum ? `${label} must be ${maximum} characters or fewer.` : "");
  };
  input.addEventListener("input", validate);
  validate();
}

bindCodePointLimit(document.querySelector("#task-title"), 120, "Task title");
bindCodePointLimit(document.querySelector("#task-description"), 1000, "Description");

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
    credentials: "same-origin",
  });
  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return body;
}

function setMessage(id, message = "") {
  document.querySelector(`#${id}`).textContent = message;
}

function showAuth() {
  taskView.hidden = true;
  authView.hidden = false;
  loginForm.querySelector("input").focus();
}

async function showTasks(user) {
  taskView.hidden = false;
  accountLabel.textContent = user.email;
  authView.hidden = true;
  await refreshTasks();
}

function makeTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " is-complete" : ""}`;
  item.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "active" : "completed"}`);
  checkbox.addEventListener("change", async () => {
    try {
      await api(`/api/tasks/${task.id}`, { method: "PATCH", body: JSON.stringify({ completed: checkbox.checked }) });
      await refreshTasks();
    } catch (error) {
      setMessage("list-message", error.message);
      checkbox.checked = !checkbox.checked;
    }
  });

  const content = document.createElement("div");
  content.className = "task-content";
  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;
  content.append(title);
  if (task.description) {
    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description;
    content.append(description);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "button button-secondary";
  edit.textContent = "Edit";
  edit.setAttribute("aria-label", `Edit ${task.title}`);
  edit.addEventListener("click", () => startEdit(item, task));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "button text-button";
  remove.textContent = "Delete";
  remove.setAttribute("aria-label", `Delete ${task.title}`);
  remove.addEventListener("click", async () => {
    if (!window.confirm(`Delete “${task.title}”?`)) return;
    try {
      await api(`/api/tasks/${task.id}`, { method: "DELETE" });
      await refreshTasks();
      setMessage("list-message", "Task deleted.");
    } catch (error) {
      setMessage("list-message", error.message);
    }
  });
  actions.append(edit, remove);
  item.append(checkbox, content, actions);
  return item;
}

function startEdit(item, task) {
  const content = item.querySelector(".task-content");
  const actions = item.querySelector(".task-actions");
  const form = document.createElement("form");
  form.className = "form-stack";
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Task title";
  const titleInput = document.createElement("input");
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.value = task.title;
  bindCodePointLimit(titleInput, 120, "Task title");
  titleLabel.htmlFor = `edit-title-${task.id}`;
  titleInput.id = titleLabel.htmlFor;
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  descriptionLabel.htmlFor = `edit-description-${task.id}`;
  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = descriptionLabel.htmlFor;
  descriptionInput.name = "description";
  descriptionInput.rows = 2;
  descriptionInput.value = task.description;
  bindCodePointLimit(descriptionInput, 1000, "Description");
  const message = document.createElement("p");
  message.className = "form-message";
  message.setAttribute("role", "alert");
  const save = document.createElement("button");
  save.type = "submit";
  save.className = "button button-primary";
  save.textContent = "Save";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "button button-secondary";
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", () => refreshTasks());
  const editActions = document.createElement("div");
  editActions.className = "task-actions";
  editActions.append(save, cancel);
  form.append(titleLabel, titleInput, descriptionLabel, descriptionInput, message, editActions);
  content.replaceChildren(form);
  actions.hidden = true;
  titleInput.focus();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await api(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: titleInput.value, description: descriptionInput.value }),
      });
      await refreshTasks();
      setMessage("list-message", "Task updated.");
    } catch (error) {
      message.textContent = error.message;
    }
  });
}

async function refreshTasks() {
  listMessage.textContent = "";
  retryTasks.hidden = true;
  loadingTasks.hidden = false;
  try {
    const [{ tasks }, taskStats] = await Promise.all([
      api(`/api/tasks?status=${activeFilter}`),
      api("/api/tasks/stats"),
    ]);
    taskList.replaceChildren(...tasks.map(makeTaskElement));
    emptyState.classList.toggle("is-visible", tasks.length === 0);
    stats.textContent = `${taskStats.active} active · ${taskStats.completed} completed · ${taskStats.total} total`;
  } catch (error) {
    listMessage.textContent = `Could not load your tasks. ${error.message}`;
    retryTasks.hidden = false;
    throw error;
  } finally {
    loadingTasks.hidden = true;
  }
}

retryTasks.addEventListener("click", () => refreshTasks().catch(() => {}));

function selectAuthTab(tab) {
  const loginSelected = tab === "login";
  loginTab.classList.toggle("is-active", loginSelected);
  registerTab.classList.toggle("is-active", !loginSelected);
  loginTab.setAttribute("aria-pressed", String(loginSelected));
  registerTab.setAttribute("aria-pressed", String(!loginSelected));
  loginForm.hidden = !loginSelected;
  registerForm.hidden = loginSelected;
  setMessage("login-message");
  setMessage("register-message");
  (loginSelected ? loginForm : registerForm).querySelector("input").focus();
}

loginTab.addEventListener("click", () => selectAuthTab("login"));
registerTab.addEventListener("click", () => selectAuthTab("register"));

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("login-message");
  const form = new FormData(loginForm);
  try {
    const { user } = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    loginForm.reset();
    await showTasks(user);
  } catch (error) {
    setMessage("login-message", error.message);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("register-message");
  const form = new FormData(registerForm);
  try {
    const result = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    registerForm.reset();
    if (result.confirmationRequired) {
      setMessage("register-message", "Check your email to confirm the account, then sign in.");
      return;
    }
    await showTasks(result.user);
  } catch (error) {
    setMessage("register-message", error.message);
  }
});

document.querySelector("#logout-button").addEventListener("click", async () => {
  const button = document.querySelector("#logout-button");
  button.disabled = true;
  try {
    const result = await api("/api/auth/logout", { method: "POST" });
    showAuth();
    selectAuthTab("login");
    authStatus.textContent = result.providerRevoked
      ? "You are signed out."
      : "You are signed out of TaskFlow, but the authentication service could not confirm sign-out.";
  } catch (error) {
    listMessage.textContent = `Could not sign out. ${error.message}`;
  } finally {
    button.disabled = false;
  }
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("task-message");
  const form = new FormData(taskForm);
  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: form.get("title"), description: form.get("description") }),
    });
    taskForm.reset();
    await refreshTasks();
    document.querySelector("#task-title").focus();
  } catch (error) {
    setMessage("task-message", error.message);
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", async () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    try {
      await refreshTasks();
    } catch (error) {
      setMessage("list-message", error.message);
    }
  });
});

async function checkSession() {
  retrySession.hidden = true;
  authStatus.textContent = "";
  try {
    const { user } = await api("/api/auth/me");
    await showTasks(user);
  } catch (error) {
    showAuth();
    if (error.status === 401) return;
    authStatus.textContent = `Could not check your sign-in status. ${error.message}`;
    retrySession.hidden = false;
  }
}

retrySession.addEventListener("click", checkSession);
checkSession();

