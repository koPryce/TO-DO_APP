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

  if (priority.trim() === "") {
    errorMsg.textContent = "Please select a priority";
    errorPopup.style.display = "block";
    return;
  }

  const taskObject = {
    title: title.trim(),
    task: task.trim(),
    priority: priority.trim(),
    date: date.trim(),
  };

  console.log(taskObject);

  const addTaskFunc = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObject),
      });
      const data = await response.json();
      console.log(data);

      successMsg.textContent = "Task added!";
      successPopup.style.display = "block";
      addTask.close();
    } catch (error) {
      errorMsg.textContent = "There was an error adding the task";
      errorPopup.style.display = "block";
      console.error("Error:", error);
    }
  };

  addTaskFunc();
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
const editBtns = document.querySelectorAll(".editBtn");
const editTask = document.querySelector("#editTask");

if (editBtns !== null) {
  editBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      console.log(taskId);
    });
  });
}

// View Task
const viewBtns = document.querySelectorAll(".viewBtn");
const viewTask = document.querySelector("#viewTask");

if (viewBtns !== null) {
  viewBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      console.log(taskId);
    });
  });
}

// Delete Task
const deleteBtns = document.querySelectorAll(".deleteBtn");

if (deleteBtns !== null) {
  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      console.log(taskId);
    });
  });
}
