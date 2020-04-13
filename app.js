// Selectors
const todoButtonAdd = document.querySelector(".todo-button-add");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");

// Event Listeners
todoButtonAdd.addEventListener("click", Todo);

todoList.addEventListener("click", Delete);

// Functions
function Todo(e) {
  e.preventDefault();
  const todoItem = CreateTodoItem(todoInput);
  todoList.appendChild(todoItem);
}

function CreateTodoItem(todoInput) {
  const div = document.createElement("div");
  div.classList.add("todo-item");

  // Todo item
  const todoItem = document.createElement("li");

  todoItem.innerHTML = todoInput.value;
  todoInput.value = "";
  div.appendChild(todoItem);

  // Delte button
  // Using CreateElement
  const deleteButton = document.createElement("button");
  const completeIcon = document.createElement("i");
  completeIcon.classList.add("fas", "fa-trash-alt");
  deleteButton.appendChild(completeIcon);
  deleteButton.classList.add("delete-btn");
  delete div.appendChild(deleteButton);

  // Complete button
  // Using innerHTML
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completeButton.classList.add("complete-btn");
  div.appendChild(completeButton);

  return div;
}

function Delete(e) {
  // Delete todo item
  if (e.target.classList[0] === "delete-btn") {
    const todoList = e.target.parentElement;
    todoList.classList.add("fall");
    todoList.addEventListener("transitionend", function (event) {
      console.log(event);
      todoList.remove();
    });
    // e.target.parentElement.remove();
  }

  // Check off todo item
  if (e.target.classList[0] === "complete-btn") {
    const todoList = e.target.parentElement;
    todoList.classList.toggle("completed");
  }
}

// Test Enviroment
