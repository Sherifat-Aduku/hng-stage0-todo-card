const DUE_DATE = new Date("2026-04-16T18:00:00Z");

// ===== STATE =====
const state = {
  status: "In Progress",
  dueDate: new Date("2026-04-16T18:00:00Z"),
};

// ===== DOM REFS =====
const priorityIndicator = document.querySelector(
  "[data-testid='test-todo-priority-indicator']");

const card         = document.getElementById("todo-card");
const statusEl     = document.getElementById("todo-status");
const timeEl       = document.getElementById("time-remaining-text");
const toggle       = document.getElementById("complete-toggle");
const checkboxText = document.getElementById("checkbox-text");
const editBtn      = document.getElementById("edit-btn");
const deleteBtn    = document.getElementById("delete-btn");
const titleEl      = document.querySelector("[data-testid='test-todo-title']");
const editForm       = document.getElementById("edit-form");
const descEl         = document.getElementById("todo-description");
const dueDateEl      = document.querySelector("[data-testid='test-todo-due-date']");
const priorityEl     = document.querySelector("[data-testid='test-todo-priority']");
const statusControl  = document.getElementById("status-control");
const saveBtn        = document.getElementById("save-btn");
const cancelBtn      = document.getElementById("cancel-btn");
const editTitleInput = document.getElementById("edit-title-input");
const editDescInput  = document.getElementById("edit-description-input");
const editPrioritySelect = document.getElementById("edit-priority-select");
const editDueDateInput   = document.getElementById("edit-due-date-input");
const overdueIndicator = document.getElementById("overdue-indicator");

// Sections to hide/show during edit
const headerEl    = document.querySelector(".todo-card__header");
const collapsibleSection = document.getElementById("collapsible-section");
const expandToggle = document.getElementById("expand-toggle");
const datesEl     = document.querySelector(".todo-card__dates");
const statusRow   = document.querySelector(".todo-card__status-row");
const tagsEl      = document.querySelector("[data-testid='test-todo-tags']");
const footerEl    = document.querySelector(".todo-card__footer");

// ===== HELPERS =====
function getTimeRemaining(due) {
  const now  = new Date();
  const diff = due - now;
  const abs  = Math.abs(diff);
  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);

  if (diff < 0) {
    if (mins  < 60) return `Overdue by ${mins} minute${mins  !== 1 ? "s" : ""}`;
    if (hours < 24) return `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`;
    return `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  }
  if (mins  < 1)  return "Due now!";
  if (hours < 1)  return `Due in ${mins} minute${mins !== 1 ? "s" : ""}`;
  if (hours < 24) return `Due in ${hours} hour${hours !== 1 ? "s" : ""}`;
  if (days  === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

// ===== RENDER =====
function render() {
  card.classList.toggle("todo-card--done", state.status === "Done");

let statusKey = state.status.toLowerCase().replace(/\s/g, "-");
statusEl.className = "todo-card__status todo-card__status--" + statusKey;
statusEl.textContent = state.status;
statusEl.setAttribute("aria-label", "Status: " + state.status);

// sync dropdown
statusControl.value = state.status;

// sync checkbox
toggle.checked = state.status === "Done";

  // Handle timer based on done state
  if (state.status === "Done")  {
  stopTimer();
  timeEl.textContent = "Completed";
} else {
  startTimer();
}
}

// ===== TIME & OVERDUE LOGIC =====
let timerInterval = null;

function tickTime() {
  // Stop updates if done
  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    overdueIndicator.style.display = "none";
    return;
  }

  const text = getTimeRemaining(state.dueDate);
  timeEl.textContent = text;

  // Show/hide overdue indicator
  const isOverdue = text.startsWith("Overdue");
  overdueIndicator.style.display = isOverdue ? "inline-flex" : "none";
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  tickTime();
  timerInterval = setInterval(tickTime, 30000);    
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ===== EVENT LISTENERS =====
toggle.addEventListener("change", function () {
  state.status = this.checked ? "Done" : "In Progress";
  render();
});

let prevState = null;

function toLocalDateTimeString(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function showEditForm() {
  // Save previous values for cancel
  prevState = {
    title: titleEl.textContent.trim(),
    description: descEl.textContent.trim(),
    priority: priorityEl.textContent.trim(),
    dueDate: new Date(state.dueDate),
  };

  // Pre-fill form
  editTitleInput.value = prevState.title;
  editDescInput.value = prevState.description;
  editPrioritySelect.value = prevState.priority;
  editDueDateInput.value = toLocalDateTimeString(prevState.dueDate);

  // Hide card content, show form
  headerEl.style.display = "none";
  collapsible.style.display = "none";
  expandToggle.style.display = "none";
  datesEl.style.display = "none";
  statusRow.style.display = "none";
  tagsEl.style.display = "none";
  footerEl.style.display = "none";
  editForm.style.display = "flex";
}

function hideEditForm() {
  editForm.style.display = "none";
  headerEl.style.display = "";
  collapsible.style.display = "";
  expandToggle.style.display = "";
  datesEl.style.display = "";
  statusRow.style.display = "";
  tagsEl.style.display = "";
  footerEl.style.display = "";
}

function applyEdits() {
  const newTitle = editTitleInput.value.trim();
  const newDesc = editDescInput.value.trim();
  const newPriority = editPrioritySelect.value;
  const newDueDate = editDueDateInput.value ? 
  new Date(editDueDateInput.value) : state.dueDate;

  // Update DOM
  titleEl.textContent = newTitle || prevState.title;
  descEl.textContent = newDesc || prevState.description;

  // Update priority badge
  priorityEl.textContent = newPriority;
  priorityEl.className = `todo-card__priority todo-card__priority--${newPriority.toLowerCase()}`;
  priorityIndicator.className = `todo-card__priority-indicator todo-card__priority-indicator--${newPriority.toLowerCase()}`;
  priorityEl.setAttribute("aria-label", `Priority: ${newPriority}`);

  // Update due date
  state.dueDate = newDueDate;
  const formatted = newDueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  dueDateEl.setAttribute("datetime", newDueDate.toISOString());
  dueDateEl.innerHTML = dueDateEl.querySelector("svg").outerHTML + " Due " + formatted;

  // Recalculate time remaining
  tickTime();
  hideEditForm();
}

function cancelEdits() {
  hideEditForm();
}

editBtn.addEventListener("click", showEditForm);
saveBtn.addEventListener("click", applyEdits);
cancelBtn.addEventListener("click", cancelEdits);

deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});

// ===== STATUS CONTROL SYNC =====
statusControl.addEventListener("change", function () {
  state.status = this.value;

  // if user selects Done → sync checkbox
  toggle.checked = this.value === "Done";

  render();
});

// ===== EXPAND / COLLAPSE =====
const expandBtn = document.getElementById("expand-toggle");

// Start collapsed
collapsibleSection.style.maxHeight = "3.2em";
collapsibleSection.style.overflow = "hidden";
collapsibleSection.style.transition = "max-height 0.3s ease";

expandBtn.addEventListener("click", function () {
  const isExpanded = this.getAttribute("aria-expanded") === "true";

  this.setAttribute("aria-expanded", String(!isExpanded));

  if (isExpanded) {
    collapsibleSection.style.maxHeight = "3.2em";
    collapsibleSection.style.overflow = "hidden";
  } else {
    collapsibleSection.style.maxHeight = collapsibleSection.scrollHeight + "px";
    collapsibleSection.style.overflow = "visible";
  }

  this.textContent = isExpanded ? "Show more ▾" : "Show less ▴";
});

// ===== INIT =====
tickTime();
render();
startTimer();
