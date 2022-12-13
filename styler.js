import { RandomInt } from "./stuff/lib.js"
let themeLink = document.querySelector("#theme")
let img = document.querySelector(".bg-image")


export let theme = JSON.parse(sessionStorage.getItem("theme"));
export let icon = {
	dark: `<img src="" alt="DarkIcon">`,
	light: `<img src="" alt="LightIcon">`
}
if (theme == null) {
	theme = {
		dark: true,
		bg: 1,
	}
	sessionStorage.setItem("theme", JSON.stringify(theme))
}

export function applyBg() {

	img.src = "backgrounds/" + (theme.dark ? `dark-${theme.bg}.jpg` : `light-${theme.bg}.jpg`)
	sessionStorage.setItem("theme", JSON.stringify(theme))
}

export function applyTheme() {

	themeLink.href = "styles/" + (theme.dark ? "dark-bg.css" : "light-bg.css")
	applyBg();
}

window.onload = () => {

	applyTheme()
	applyBg();

	let ThemeEl = document.querySelector(".themebutton#theme")
	let BackEl = document.querySelector(".themebutton#back")
	let BgEl = document.querySelector(".themebutton#bg")

	ThemeEl.onclick = () => {
		theme.dark = !theme.dark;
		applyTheme();
		ThemeEl.innerHTML = (theme.dark ? icon.dark : icon.light)
	}

	BgEl.onclick = () => {
		theme.bg++; if (theme.bg > 6) theme.bg = 1;
		applyBg();
	}
	
	BackEl.onclick = () => {
		document.location.href = 'index.html'
	}

	fetch("stuff/DarkIcon.svg")
		.then(response => response.text())
		.then(text => {
			icon.dark = text;
			if (theme.dark) ThemeEl.innerHTML = icon.dark;
		})

	fetch("stuff/LightIcon.svg")
		.then(response => response.text())
		.then(text => {
			icon.light = text;
			if (!theme.dark) ThemeEl.innerHTML = icon.light;
		})

	fetch("stuff/PicIcon.svg")
		.then(response => response.text())
		.then(text => BgEl.innerHTML = text)
		.catch(() => BgEl.innerHTML = `<img src="" alt="bg">`)

	fetch("stuff/BackIcon.svg")
		.then(response => response.text())
		.then(text => BackEl.innerHTML = text)
		.catch(() => BackEl.innerHTML = `<img src="" alt="back">`)

}
