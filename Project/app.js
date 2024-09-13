const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const taskInput = document.getElementById("task-input")
    const task = taskInput.value
    console.log(task)
    
    if (task) {
        taskList.append(createTaskElement(task))
        taskInput.value = ""
    }
})
function createTaskElement(task) {
    const taskElement = document.createElement("li")
    taskElement.textContent = task
    taskElement.append(createButton("❎", "delete-btn"), createButton("✏", "edit-btn"))
    return taskElement    
}
function createButton(text, className) {
    const button = document.createElement("span")
    button.textContent = text
    button.className = className
    return button   
}