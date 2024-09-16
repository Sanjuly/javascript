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
//delegation event
taskList.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove()
    }
        else if(event.target.classList.contains("edit-btn")) {
            const newTask = prompt("Edit of task", taskElement.firstChild.textContent)
            if (newTask !== null) {
                event.target.parentElement.firstChild.textContent = newTask
            }
        }
})