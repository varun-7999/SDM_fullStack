const STORAGE_KEY = "daylist-tasks";
let tasks = loadTasks();
let activeFilter = "all";

const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const emptyMessage = document.querySelector("#empty-message");
const addForm = document.querySelector("#add-form");
const taskInput = document.querySelector("#task-input");

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function visibleTasks() {
  if (activeFilter === "active") return tasks.filter((task) => !task.completed);
  if (activeFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function render() {
  taskList.replaceChildren();
  visibleTasks().forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-complete" : ""}`;
    item.innerHTML = `
      <input class="task-check" type="checkbox" ${task.completed ? "checked" : ""} aria-label="Mark ${escapeHtml(task.text)} as complete">
      <span class="task-label"></span>
      <button class="delete-button" type="button" aria-label="Delete ${escapeHtml(task.text)}">×</button>
    `;
    item.querySelector(".task-label").textContent = task.text;
    item.querySelector(".task-check").addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      render();
    });
    item.querySelector(".delete-button").addEventListener("click", () => {
      tasks = tasks.filter((candidate) => candidate.id !== task.id);
      saveTasks();
      render();
    });
    taskList.append(item);
  });

  const completed = tasks.filter((task) => task.completed).length;
  const open = tasks.length - completed;
  document.querySelector('[data-count="all"]').textContent = tasks.length;
  document.querySelector('[data-count="active"]').textContent = open;
  document.querySelector('[data-count="completed"]').textContent = completed;
  document.querySelector("#task-summary").textContent = `${open} ${open === 1 ? "task" : "tasks"} left`;
  document.querySelector("#clear-completed").disabled = completed === 0;
  emptyState.hidden = visibleTasks().length > 0;
  if (activeFilter === "completed") emptyMessage.innerHTML = "No completed tasks yet.<br>Keep going.";
  else if (activeFilter === "active") emptyMessage.innerHTML = "You’re all caught up.<br>Nice work.";
  else emptyMessage.innerHTML = "Your list is clear.<br>Add something worth doing.";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ id: crypto.randomUUID(), text, completed: false });
  saveTasks();
  taskInput.value = "";
  activeFilter = "all";
  document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === activeFilter));
  render();
  taskInput.focus();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
    render();
  });
});

document.querySelector("#clear-completed").addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

const date = new Date();
document.querySelector("#current-day").textContent = date.toLocaleDateString(undefined, { weekday: "long" });
document.querySelector("#current-date").textContent = date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
render();
