const TODO_LIST_KEY = "todoList";
const FINISHED_LIST_KEY = "finishList";
const finishList = document.querySelector("#finish-list");
const main = document.querySelector("main");
const todoForm = document.querySelector("#todo-form");
const todoFormInput = document.querySelector("#todo-form > input[type=text]");
const todoList = document.querySelector("#todo-list");
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
	deleteTodos(event);
	printFinishedTodos(event.target.parentNode.firstChild.innerText);
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
	successButton.addEventListener("click", sendFinishedTodos);
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

const loadFinishedList = () => {
	const loadedFinishedList = JSON.parse(localStorage.getItem(FINISHED_LIST_KEY));
	if (loadedFinishedList !== null && loadedFinishedList !== undefined) {
		loadedFinishedList.map((element) => {
			printFinishedTodos(element.text);
		})
	}
}

const init = () => {
	loadTodoList();
	loadFinishedList();
	todoForm.addEventListener("submit", handleSubmitForm);
}

init();