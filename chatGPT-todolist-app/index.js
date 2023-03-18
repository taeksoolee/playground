const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");

// Get existing todos from localStorage or set as empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Add todos to the UI
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <button class="delete-todo-btn" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Add new todo
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText) {
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    todoInput.value = "";
  }
}

// Delete todo
function deleteTodoByIndex(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Add event listeners
addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-todo-btn")) {
    const index = parseInt(event.target.dataset.index);
    deleteTodoByIndex(index);
  }
});

// Render initial todos
renderTodos();
