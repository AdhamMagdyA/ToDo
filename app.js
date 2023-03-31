const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <button class="delete-todo" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const todo = todoInput.value.trim();
  if (!todo) {
    return;
  }
  todos.push(todo);
  renderTodoList();
  todoInput.value = "";
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoByIndex(index) {
  if (index < 0 || index >= todos.length) {
    return;
  }
  todos.splice(index, 1);
  renderTodoList();
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodoButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-todo")) {
    const index = parseInt(event.target.dataset.index);
    deleteTodoByIndex(index);
  }
});

window.addEventListener("load", renderTodoList);
