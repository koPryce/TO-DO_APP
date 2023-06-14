// Adding tasks
const addBtn = document.querySelector("#addBtn")
const addTask = document.querySelector("#addTask")
const confirmBtn = addTask.querySelector("#confirmBtn")
const cancelBtn = addTask.querySelector("#cancelBtn")

addBtn.addEventListener("click", () => {
  addTask.showModal()
})

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault()
})

cancelBtn.addEventListener("click", () => {
  addTask.close()
})



// Restricting date
const dateInput = document.querySelector("#date")

const currentDate = new Date().toISOString().split("T")[0]

dateInput.setAttribute("min", currentDate)

dateInput.addEventListener("input", function () {
  const selectedDate = this.value

  if (selectedDate > currentDate) {
    this.value = currentDate
  }
})
