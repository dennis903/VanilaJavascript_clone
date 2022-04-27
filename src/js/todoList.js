const TODO_LIST_KEY = "todoList";
const main = document.querySelector("main");
const todoForm = document.querySelector("#todo-form");
const todoFormInput = document.querySelector("#todo-form > input[type=text]");
const todoList = document.querySelector("#todo-list");

if (main.classList.contains(HIDDEN_CLASS))
	main.classList.remove(HIDDEN_CLASS);

const printTodos = (newContent) => {
	const newLi = document.createElement("li");
	const newSpan = document.createElement("span");
	const successButton = document.createElement("button");
	const deleteButton = document.createElement("button");

	newSpan.innerText = newContent;
	deleteButton.innerText = "❌";
	successButton.innerText = "✅";
	newLi.appendChild(newSpan);
	newLi.appendChild(successButton); 
	newLi.appendChild(deleteButton);
	todoList.appendChild(newLi);
}

const handleSubmitForm = (event) => {
	const newContent = todoFormInput.value;
	event.preventDefault();
	printTodos(newContent);
	todoFormInput.value = "";
}



todoForm.addEventListener("submit", handleSubmitForm);