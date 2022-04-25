const USERNAME_KEY = "username";
const PROMISE_KEY = "promise";
const HIDDEN_CLASS = "hidden";
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const savedUserName = localStorage.getItem(USERNAME_KEY);
const savedPromise = localStorage.getItem(PROMISE_KEY);
const mainHeaderId = document.querySelector("#main-id");
const mainHeaderPromise = document.querySelector("#main-promise");

const handleLoginSubmit = (event) => {
	event.preventDefault();
	if (!loginForm.classList.contains(HIDDEN_CLASS))
		loginForm.classList.add(HIDDEN_CLASS);
	const loginInput = document.querySelectorAll("#login-form input");
	const userName = loginInput[0].value;
	const promise = loginInput[1].value;
	localStorage.setItem(USERNAME_KEY, userName);
	localStorage.setItem(PROMISE_KEY, promise);
	printGreeting(userName, promise);
}

const goToMainPage = (userName, promise) => {
	const mainHeader = document.querySelector("#main-header");
	const mainPage = document.querySelector("#main-page");
	mainHeader.classList.remove(HIDDEN_CLASS);
	mainPage.classList.remove(HIDDEN_CLASS);
	mainHeaderId.innerText = `Hello ${userName}`;
	mainHeaderPromise.innerText = `${promise}`;
}

const executeGreetingEffect = (userName, promise) => {
	const greetingEffect = new TypeIt("#greeting", {
		speed: 50,
		startDelay: 800,
		waitUntilVisible: true
	});
	greetingEffect
		.exec(async () => {
			//-- Return a promise that resolves after something happens.
			await new Promise(() => {
				setTimeout(() => {
					greeting.classList.add(HIDDEN_CLASS);
					goToMainPage(userName, promise);
				}, 1000);
			});
		})
		.go();
}

const printGreeting = (userName, promise) => {
	if (greeting.classList.contains(HIDDEN_CLASS))
		greeting.classList.remove(HIDDEN_CLASS);
	const greetingMessage = `안녕하세요 ${userName}님 만나서 반갑습니다.`;
	greeting.innerText = greetingMessage;
	executeGreetingEffect(userName, promise);
}

if (savedUserName === null) {
	loginForm.classList.remove(HIDDEN_CLASS);
	loginForm.addEventListener('submit', handleLoginSubmit);
}
else
	printGreeting(savedUserName, savedPromise);