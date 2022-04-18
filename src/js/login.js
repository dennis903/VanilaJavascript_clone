const USERNAME_KEY = "username";
const HIDDEN_CLASS = "hidden";
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const savedUserName = localStorage.getItem(USERNAME_KEY);

const handleLoginSubmit = (event) => {
	event.preventDefault();
	if (!loginForm.classList.contains(HIDDEN_CLASS))
		loginForm.classList.add(HIDDEN_CLASS);
	const loginInput = document.querySelector("#login-form input");
	const userName = loginInput.value;
	localStorage.setItem(USERNAME_KEY, userName);
	printGreeting(userName);
}

const executeGreetingEffect = () => {
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
				}, 1000);
			});
		})
		.go();
}

const printGreeting = (userName) => {
	if (greeting.classList.contains(HIDDEN_CLASS))
		greeting.classList.remove(HIDDEN_CLASS);
	const greetingMessage = `안녕하세요 ${userName}님 만나서 반갑습니다.`;
	greeting.innerText = greetingMessage;
	executeGreetingEffect();
}

if (savedUserName === null) {
	loginForm.classList.remove(HIDDEN_CLASS);
	loginForm.addEventListener('submit', handleLoginSubmit);
}
else
	printGreeting(savedUserName);