const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

loadTasks()

taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const taskInput = document.getElementById("task-input")
    const task = taskInput.value
    console.log(task)
    
    if (task) {
        taskList.append(createTaskElement(task))
        storeTaskInLocal(task)
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
        deleteTask(event.target.parentElement)
    } else if(event.target.classList.contains("edit-btn")) {
        editTask(event.target.parentElement)
    }
})
function deleteTask(taskElement) {
    if(confirm("Sure: ?")) {
        taskElement.remove()
    }
    removeChanges()
}
function editTask(taskElement) {
    const newTask = prompt("Edit of task:", taskElement.firstChild.textContent)
    if(newTask !== null) {
        taskElement.firstChild.textContent = newTask
        saveChanges()
    }
}
function storeTaskInLocal(task) {
    const tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"))
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
//load
function loadTasks() {
    const tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"))
    //array
    tasks.forEach((task) => {
        taskList.appendChild(createTaskElement(task))
    })
}
//save the change in localStorage
function saveChanges() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map(
        (li) => li.firstChild.textContent
    )
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
//remove the change in LocalStorage 
function removeChanges(taskContent) {
    const tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"))
    const updateTask = tasks.filter((task) => task !== taskContent)
    localStorage.setItem("tasks", JSON.stringify(updateTask))    
}
