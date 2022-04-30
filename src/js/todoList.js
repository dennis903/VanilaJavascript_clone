const TODO_LIST_KEY = "todoList";
const main = document.querySelector("main");
const todoForm = document.querySelector("#todo-form");
const todoFormInput = document.querySelector("#todo-form > input[type=text]");
const todoList = document.querySelector("#todo-list");
const todoListData = [];

if (main.classList.contains(HIDDEN_CLASS))
	main.classList.remove(HIDDEN_CLASS);

const saveTodoList = () => {

	if (todoListData.length !== 0)
	{
		const stringifiedTodoList = JSON.stringify(todoListData);
		localStorage.setItem(TODO_LIST_KEY, stringifiedTodoList);
	}
}

const deleteTodos = (event) => {
	const targetLi = event.target.parentNode;

	targetLi.remove();
	saveTodoList();
}

const appendList = (newContent) => {
	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const successButton = document.createElement("button");
	const deleteButton = document.createElement("button");

	newSpan.innerText = newContent;
	deleteButton.innerText = "❌";
	successButton.innerText = "✅";
	deleteButton.addEventListener("click", deleteTodos);
	newLi.appendChild(newSpan);
	newLi.appendChild(successButton); 
	newLi.appendChild(deleteButton);
	todoList.appendChild(newLi);
}

const printTodos = (newContent) => {
	let todosContent = {};

	appendList(newContent);
	todosContent.text = newContent;
	todoListData.push(todosContent);
	saveTodoList();
}

const handleSubmitForm = (event) => {
	event.preventDefault();
	const newContent = todoFormInput.value;
	printTodos(newContent);
	todoFormInput.value = "";
}

const loadTodos = () => {
	const loadedTodos = localStorage(ge)
}

const init = () => {
	// loadTodos();
	todoForm.addEventListener("submit", handleSubmitForm);
}

init();