// Add Task
const addBtn = document.querySelector("#addBtn");
const addTask = document.querySelector("#addTask");
const deleteTask = document.querySelector("#deleteTask");
const viewTask = document.querySelector("#viewTask");
const editTask = document.querySelector("#editTask");
const confirmBtn = addTask.querySelector("#confirmBtn");
const cancelBtn = addTask.querySelector("#cancelBtn");

const errorPopup = document.querySelector("#errorPopup");
const successPopup = document.querySelector("#successPopup");
const deletePopup = document.querySelector("#deletePopup");
const closeBtns = document.querySelectorAll(".close-btn");
const errorMsg = errorPopup.querySelector("#errorMsg");
const successMsg = successPopup.querySelector("#successMsg");
const deleteMsg = deletePopup.querySelector("#deleteMsg");

addBtn.addEventListener("click", () => {
  addTask.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = addTask.querySelector(".title").value;
  const task = addTask.querySelector(".task").value;
  const priority = addTask.querySelector(".priority").value;
  const date = addTask.querySelector(".date").value;

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
      console.log(data.message);

      successMsg.textContent = "Task added!";
      successPopup.style.display = "block";
      addTask.close();

      setTimeout(() => {
        location.reload();
      }, 2000);
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
    deletePopup.style.display = "none";
  });
});

// Restricting date
const dateInput = document.querySelector(".date");

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

if (viewBtns !== null) {
  viewBtns.forEach((button) => {
    button.addEventListener("click", () => {
      viewTask.showModal();
      const taskId = button.getAttribute("data-task-id");

      const viewTaskFunc = async () => {
        try {
          const response = await fetch(`/?id=${taskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          const title = viewTask.querySelector(".title");
          const task = viewTask.querySelector(".task");
          const priority = viewTask.querySelector(".priority");
          const date = viewTask.querySelector(".date");

          title.value = data.task.title;
          task.textContent = data.task.task;
          priority.value = data.task.priority;
          date.value = data.task.date;

        } catch (error) {
          errorMsg.textContent = "There was an error retrieving the task";
          errorPopup.style.display = "block";
          console.error("Error:", error);
        }
      };

      viewTaskFunc();
    });
  });

  const viewCancelBtn = viewTask.querySelector("#closeBtn");

  viewCancelBtn.addEventListener("click", () => {
    viewTask.close();
  });
}

// Delete Task
const deleteBtns = document.querySelectorAll(".deleteBtn");

if (deleteBtns !== null) {
  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => {
      deleteTask.showModal();

      const confirmDeletion = deleteTask.querySelector("#confirmDeletion");
      const cancelDeletion = deleteTask.querySelector("#cancelDeletion");

      cancelDeletion.addEventListener("click", () => {
        deleteTask.close();
      });

      confirmDeletion.addEventListener("click", () => {
        let taskId = button.getAttribute("data-task-id");

        const deleteTaskFunc = async () => {
          try {
            const response = await fetch("/", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: taskId }),
            });

            if (response.ok) {
              const data = await response.json();
              console.log(data);

              deleteMsg.textContent = "Task deleted!";
              deletePopup.style.display = "block";
              deleteTask.close();

              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              throw new Error("Error deleting task");
            }
          } catch (error) {
            errorMsg.textContent = "There was an error deleting the task";
            errorPopup.style.display = "block";
            console.error("Error:", error);
          }
        };
        deleteTaskFunc();
      });
    });
  });
}

// Toggle completed state
const completeBoxes = document.querySelectorAll(".completeBox");
completeBoxes.forEach(box => {
  box.addEventListener("click", () => {
    let taskId = box.getAttribute("data-task-id");

    const toggleState = async () =>{
      const  response = await fetch('/', {
        method: 'PUT',
        
      })
    }

    toggleState();
  })
})
