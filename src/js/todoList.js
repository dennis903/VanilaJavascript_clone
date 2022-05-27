const TODO_LIST_KEY = "todoList";
const FINISHED_LIST_KEY = "finishList";
const finishList = document.querySelector("#finish-list");
const main = document.querySelector("main");
const todoForm = document.querySelector("#todo-form");
const todoFormInput = document.querySelector("#todo-form > textarea");
const todoList = document.querySelector("#todo-list");
const todoFormSubmit = document.querySelector(".todo-form__submit");
let		todoListData = [];
let		finishedListData = [];

const deleteFinishList = (event) => {
	const targetLi = event.target.parentNode;
	targetLi.remove();
	const newFinishedList = finishedListData.filter((element) => {
		return element.id !== parseInt(targetLi.id);
	});
	finishedListData = newFinishedList;
	saveFinishedList();
}

const saveFinishedList = () => {
	if (finishedListData.length !== 0) {
		const stringifiedFinishedList = JSON.stringify(finishedListData);
		localStorage.setItem(FINISHED_LIST_KEY, stringifiedFinishedList);
	}
	else
		localStorage.removeItem(FINISHED_LIST_KEY);	
}

const printFinishedTodos = (content) => {
	let		finishedContent = {};
	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const deleteButton = document.createElement("button");
	const newId = finishedListData.length + 1;

	newSpan.innerText = content;
	deleteButton.innerText = "❌";
	deleteButton.addEventListener("click", deleteFinishList);
	newLi.appendChild(newSpan);
	newLi.appendChild(deleteButton);
	newLi.id = newId;
	finishList.appendChild(newLi);
	finishedContent.text = content;
	finishedContent.id = newId;
	finishedListData.push(finishedContent);
	saveFinishedList();
}

const saveTodoList = () => {
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

const sendFinishedTodos = (event) => {
	console.log(event);
	deleteTodos(event);
	printFinishedTodos(event.target.parentNode.firstChild.innerText);
}

const printTodos = (newContent) => {
	let todosContent = {};
	const newLi = document.createElement("li");
	const newSpan = document.createElement("p");
	const successButton = document.createElement("button");
	const deleteButton = document.createElement("button");
	const newId = todoListData.length + 1;

	newSpan.innerText = newContent;
	deleteButton.addEventListener("click", deleteTodos);
	successButton.addEventListener("click", sendFinishedTodos);
	deleteButton.innerText="❌";
	successButton.innerText="✅";
	newLi.appendChild(newSpan);
	newLi.appendChild(successButton); 
	newLi.appendChild(deleteButton);
	newLi.id = newId;
	newLi.classList.add("list", "box");
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

const loadFinishedList = () => {
	const loadedFinishedList = JSON.parse(localStorage.getItem(FINISHED_LIST_KEY));
	if (loadedFinishedList !== null && loadedFinishedList !== undefined) {
		loadedFinishedList.map((element) => {
			printFinishedTodos(element.text);
		})
	}
}

const handleSubmitButton = (e) => {
	if (e.target.value === '' && todoFormSubmit.classList.contains("todo-form__onword")) {
		todoFormSubmit.classList.remove("todo-form__onword");
	}
	else {
		todoFormSubmit.classList.add("todo-form__onword");
	}
}

const init = () => {
	loadTodoList();
	loadFinishedList();
	todoForm.addEventListener("submit", handleSubmitForm);
	todoFormInput.addEventListener("input", handleSubmitButton);
}

init();