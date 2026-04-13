const DUE_DATE = new Date("2026-04-16T18:00:00Z");

// ===== STATE =====
const state = {
  done: false,
  status: "Pending",
};

// ===== DOM REFS =====
const card         = document.getElementById("todo-card");
const statusEl     = document.getElementById("todo-status");
const timeEl       = document.getElementById("time-remaining-text");
const toggle       = document.getElementById("complete-toggle");
const checkboxText = document.getElementById("checkbox-text");
const editBtn      = document.getElementById("edit-btn");
const deleteBtn    = document.getElementById("delete-btn");
const titleEl      = document.querySelector("[data-testid='test-todo-title']");

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
  // Card done class
  card.classList.toggle("todo-card--done", state.done);

  // Status badge
  const statusClass = state.status.toLowerCase();
  statusEl.className = `todo-card__status todo-card__status--${statusClass}`;
  statusEl.textContent = state.status;
  statusEl.setAttribute("aria-label", `Status: ${state.status}`);

  // Checkbox
  toggle.checked       = state.done;
  checkboxText.textContent = state.done ? "Completed" : "Mark complete";
}

// ===== ACTIONS =====
function toggleComplete() {
  state.done   = !state.done;
  state.status = state.done ? "Done" : "Pending";
  render();
}

function tickTime() {
  timeEl.textContent = getTimeRemaining(DUE_DATE);
}

// ===== EVENT LISTENERS =====
toggle.addEventListener("change", toggleComplete);

editBtn.addEventListener("click", () => {
  console.log("edit clicked");
});

deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});

// ===== INIT =====
tickTime();
render();
setInterval(tickTime, 60000);