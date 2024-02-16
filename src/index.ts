interface Todo {
  text: string;
  completed: boolean;
}

const form = document.getElementById("todoform");
const button = document.getElementById("todobtn") as HTMLButtonElement;
const input = document.getElementById("todoinput") as HTMLInputElement;
const list = document.getElementById("todolist");

const todos: Todo[] = loadTodos();
todos.forEach(createTodo);

function loadTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  if (input.value && input.value !== " ") {
    const newTodo: Todo = {
      text: input.value,
      completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
  }
  saveTodos();
  input.value = "";
}

function createTodo(todo: Todo) {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.checked = todo.completed;
  newCheckbox.addEventListener("change", function () {
    todo.completed = newCheckbox.checked;
    saveTodos();
  });
  list?.appendChild(newLi);
  newSpan.append(todo.text);
  newLi.append(newSpan);
  newLi.append(newCheckbox);
}

form?.addEventListener("submit", onSubmit);
