const clock = document.querySelector("#clock");
const dateTitle = document.querySelector("#date");

const getTime = () => {
	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	let modifiedHours = hours;

	if (modifiedHours > 12)
		modifiedHours = modifiedHours - 12;
	clock.innerText = `${modifiedHours < 10 ? `0${modifiedHours}` : modifiedHours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${hours > 12 ? `PM` : 'AM'}`;
	dateTitle.innerText = `${year} / ${month < 10 ? `0${month}` : month} / ${day < 10 ? `0${day}` : day}`;
}

const initTime = () => {
	getTime();
}

setInterval(getTime, 1000);
initTime();