// Problem: The application lacks interactivity to manage daily tasks effectively.
// Solution: Introduce user interactivity to manage daily tasks by breaking down the problem into smaller steps and addressing them one by one.
// Event handling is what initiates the code execution in response to user interaction.

// Define constants for elements.
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");



// Create a new list item element with the given task string.
function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  // Configure elements.
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "edit-task-input";
  editButton.innerText = "Edit";
  editButton.className = "edit-task-btn";
  deleteButton.className = "delete-task-btn";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  // Add text content to elements.
  label.innerText = taskString;
  label.className = "task";

  // Append elements to the list item.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add a new task to the list.
function addTask() {
  console.log("Add Task...");

  // Prevent creating an empty task.
  if (!taskInput.value.trim()) {
    return;
  }

  // Create a new list item with the text from the #new-task.
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder.
  incompleteTaskHolder.appendChild(listItem);

  // Bind events to the new list item's children.
  bindTaskEvents(listItem, taskCompleted);

  // Reset the input field.
  taskInput.value = "";
}

// Switch between edit and save mode for a task.
function editTask() {
  console.log("Edit Task...");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit-task-btn");
  const containsClass = listItem.classList.contains("edit-mode");

  // If the parent has the ".edit-mode" class, switch to save mode.
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle the ".edit-mode" class on the parent.
  listItem.classList.toggle("edit-mode");
}

// Remove a task from the list.
function deleteTask() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Move a completed task to the completed tasks list.
function taskCompleted() {
  console.log("Complete Task...");

  const listItem = this.parentNode;

  // Append the task list item to the #completed-tasks.
  completedTasksHolder.appendChild(listItem);

  // Bind events to the new list item's children.
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete(){
    console.log("Incomplete Task...");
   
    const listItem=this.parentNode; 
    
    //Append the task list item to the #incompleteTasks.
    incompleteTaskHolder.appendChild(listItem);
    
    // Bind events to the new list item's children.
    bindTaskEvents(listItem, taskCompleted);
}


function ajaxRequest(){
    console.log("AJAX Request");
}


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Binds event handlers to a task list item.
function bindTaskEvents(listItem, checkBoxEventHandler) {
    // Select list item's children.
    const checkBox = listItem.querySelector('input[type="checkbox"]');
    const editButton = listItem.querySelector('button.edit-task-btn');
    const deleteButton = listItem.querySelector('button.delete-task-btn');
  
    // Bind event handlers.
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}
  

  // Cycle over incomplete task list items and bind event handlers.
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


  // Cycle over completed task list items and bind event handlers.
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}