const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const TODO_KEY = "todos";
let toDos = [];

function saveTodos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function deleteTodo(e) {
    const li = e.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id))
    saveTodos()
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo)
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleToDoSubmit(e) {
    e.preventDefault()
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        id: Date.now(),
        text: newTodo,
    }
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

// function sayHello(item){
//     console.log("this is ", item)
// }

const savedTodos = localStorage.getItem(TODO_KEY);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}