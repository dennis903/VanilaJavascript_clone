const TODO_LIST_KEY = "todoList";
const main = document.querySelector("main");
const todoForm = document.querySelector("#todo-form");
const todoFormInput = document.querySelector("#todo-form > input[type=text]");
const todoList = document.querySelector("#todo-list");
let		todoListData = [];

if (main.classList.contains(HIDDEN_CLASS))
	main.classList.remove(HIDDEN_CLASS);

const saveTodoList = () => {
	console.log(todoListData.length);
	if (todoListData.length !== 0) {
		const stringifiedTodoList = JSON.stringify(todoListData);
		localStorage.setItem(TODO_LIST_KEY, stringifiedTodoList);
	}
	else
		localStorage.removeItem(TODO_LIST_KEY);
}

const deleteTodos = (event) => {
	const targetLi = event.target.parentNode;
	targetLi.remove();
	const newTodoList = todoListData.filter((element) => {
		return element.id !== parseInt(targetLi.id);
	});
	todoListData = newTodoList;
	saveTodoList();
}


const printTodos = (newContent) => {
	let todosContent = {};
	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const successButton = document.createElement("button");
	const deleteButton = document.createElement("button");
	const newId = todoListData.length + 1;

	newSpan.innerText = newContent;
	deleteButton.innerText = "❌";
	successButton.innerText = "✅";
	deleteButton.addEventListener("click", deleteTodos);
	newLi.appendChild(newSpan);
	newLi.appendChild(successButton); 
	newLi.appendChild(deleteButton);
	newLi.id = newId;
	todoList.appendChild(newLi);
	todosContent.text = newContent;
	todosContent.id = newId;
	todoListData.push(todosContent);
	saveTodoList();
}

const handleSubmitForm = (event) => {
	event.preventDefault();
	const newContent = todoFormInput.value;
	printTodos(newContent);
	todoFormInput.value = "";
}

const loadTodoList = () => {
	const loadedTodoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));

	if (loadedTodoList !== null) {
		loadedTodoList.map((element) => {
			printTodos(element.text);
		});
	}
}

const init = () => {
	loadTodoList();
	todoForm.addEventListener("submit", handleSubmitForm);
}

init();	