// Add Task
const addBtn = document.querySelector("#addBtn");
const addTask = document.querySelector("#addTask");
const confirmBtn = addTask.querySelector("#confirmBtn");
const cancelBtn = addTask.querySelector("#cancelBtn");

const errorPopup = document.getElementById("errorPopup");
const successPopup = document.getElementById("successPopup");
const closeBtns = document.querySelectorAll(".close-btn");
const errorMsg = errorPopup.querySelector("#errorMsg");
const successMsg = successPopup.querySelector("#successMsg");

addBtn.addEventListener("click", () => {
  addTask.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = addTask.querySelector("#title").value;
  const task = addTask.querySelector("#task").value;
  const priority = addTask.querySelector("#priority").value;
  const date = addTask.querySelector("#date").value;

  if (title.trim() === "") {
    errorMsg.textContent = "Please enter a title";
    errorPopup.style.display = "block";
    return;
  }

  if (task.trim() === "") {
    errorMsg.textContent = "Please enter a task";
    errorPopup.style.display = "block";
    return;
  }

  if (priority.trim() === "") {
    errorMsg.textContent = "Please select a priority";
    errorPopup.style.display = "block";
    return;
  }

  if (date.trim() === "") {
    errorMsg.textContent = "Please choose a date";
    errorPopup.style.display = "block";
    return;
  }

  successMsg.textContent = "Task added!";
  successPopup.style.display = "block";
  addTask.close();
});

cancelBtn.addEventListener("click", () => {
  addTask.close();
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    errorPopup.style.display = "none";
    successPopup.style.display = "none";
  });
});

// Restricting date
const dateInput = document.querySelector("#date");

const currentDate = new Date().toISOString().split("T")[0];

dateInput.setAttribute("min", currentDate);

dateInput.addEventListener("input", function () {
  const selectedDate = this.value;

  if (selectedDate > currentDate) {
    this.value = currentDate;
  }
});

// Edit Task
const editBtn = document.querySelector("#editBtn");
const editTask = document.querySelector("#editTask");

editBtn.addEventListener("click", () => {
  console.log("Edit")
})

// View Task
const viewBtn = document.querySelector("#viewBtn");
const viewTask = document.querySelector("#viewTask");

viewBtn.addEventListener("click", () => {
  console.log("View")
})

// Delete Task
const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click", () => {
  console.log("Delete")
})
