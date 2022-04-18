const USERNAME_KEY = "username";
const HIDDEN_CLASS = "hidden";
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const savedUserName = localStorage.getItem(USERNAME_KEY);

const handleLoginSubmit = (event) => {
	event.preventDefault();
	loginForm.classList.add(HIDDEN_CLASS);
	const loginInput = document.querySelector("#login-form input");
	const userName = loginInput.value;
	localStorage.setItem(USERNAME_KEY, userName);
	printGreeting(userName);
}

const executeGreetingEffect = (userName) => {
	const greetingEffect = new TypeIt("#greeting", {
		speed: 50,
		startDelay: 800
	});
	greetingEffect.go();
}

const printGreeting = (userName) => {
	greeting.classList.remove(HIDDEN_CLASS);
	const greetingMessage = `안녕하세요 ${userName}님 만나서 반갑습니다.`;
	greeting.innerText = greetingMessage;
	executeGreetingEffect(userName);
}

if (savedUserName === null) {
	loginForm.classList.remove(HIDDEN_CLASS);
	loginForm.addEventListener('submit', handleLoginSubmit);
}
else
	printGreeting(savedUserName);