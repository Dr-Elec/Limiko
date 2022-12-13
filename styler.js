import { RandomInt } from "stuff/lib.js"
let themeLink = document.querySelector("#theme")
let img = document.querySelector(".bg-image")



let darkTheme = sessionStorage.getItem("themeChange") == "true";

let lastRnd = 1;
function changeBg(prevent = false) {
	if (!(prevent)) return;
	let curRnd = RandomInt(1, 6);
	while (lastRnd == curRnd) {
		curRnd = RandomInt(1, 6)
	}
	img.src = "backgrounds/" + (darkTheme ? `dark-${curRnd}.jpg` : `light-${curRnd}.jpg`)
	lastRnd = curRnd;
}

export function themeChange(themeType) {
	sessionStorage.setItem("themeChange", (themeType == "dark" ? true : false))
	let prevent = (themeType == "dark") != darkTheme
	darkTheme = sessionStorage.getItem("themeChange") == "true";
	themeLink.href = "styles/" + (darkTheme ? "dark-bg.css" : "light-bg.css")
	changeBg(prevent);
}

window.onload = () => {

	themeChange(darkTheme ? `dark` : `light`)
	changeBg(true);

	let DarkEl = document.querySelector(".themebutton#dark")
	let LightEl = document.querySelector(".themebutton#light")
	let BackEl = document.querySelector(".themebutton#back")

	DarkEl.onclick = () => {
		themeChange('dark')
	}

	LightEl.onclick = () => {
		themeChange('light')
	}

	BackEl.onclick = () => {
		changeBg(true);
	}

	fetch("stuff/DarkIcon.svg")
	.then(response => response.text())
	.then(text => DarkEl.innerHTML = text)
	.catch(() => DarkEl.innerHTML = `<img src="" alt="dark">`)

	fetch("stuff/LightIcon.svg")
	.then(response => response.text())
	.then(text => LightEl.innerHTML = text)
	.catch(() => LightEl.innerHTML = `<img src="" alt="light">`)
	
	fetch("stuff/PicIcon.svg")
	.then(response => response.text())
	.then(text => BackEl.innerHTML = text)
	.catch(() => BackEl.innerHTML = `<img src="" alt="back">`)

	
}
