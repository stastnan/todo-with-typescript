"use strict";
const form = document.getElementById("todoform");
const button = document.getElementById("todobtn");
const input = document.getElementById("todoinput");
const list = document.getElementById("todolist");
const todos = loadTodos();
todos.forEach(createTodo);
function loadTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function onSubmit(e) {
    e.preventDefault();
    if (input.value && input.value !== " ") {
        const newTodo = {
            text: input.value,
            completed: false,
        };
        createTodo(newTodo);
        todos.push(newTodo);
    }
    saveTodos();
    input.value = "";
}
function createTodo(todo) {
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = todo.completed;
    newCheckbox.addEventListener("change", function () {
        todo.completed = newCheckbox.checked;
        saveTodos();
    });
    list === null || list === void 0 ? void 0 : list.appendChild(newLi);
    newSpan.append(todo.text);
    newLi.append(newSpan);
    newLi.append(newCheckbox);
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", onSubmit);
