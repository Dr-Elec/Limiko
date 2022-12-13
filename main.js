
import { confugureAudio } from "./stuff/audio.js";
import { RandomInt, shuffle} from "./stuff/lib.js"

let root = document.querySelector(".container section");


let questions = {};

let response = await fetch("question.json");

if (response.ok) { // если HTTP-статус в диапазоне 200-299
	// получаем тело ответа (см. про этот метод ниже)
	questions = await response.json();
}
else {
	alert("Ошибка запроса вопросов: " + response.status);
}



shuffle(questions)
for (let i = 0; i < questions.length; i++) {
	
	let src = "sound/" + questions[i].file

	//let Ans = 
	let ans = []; let usedWrongAns = [];
	ans[RandomInt(0, 3)] = questions[i].answer;
	for (let j = 0; j < 4; j++) {
		if (ans[j]) continue;//если уже есть ответ(прав.) скипаем шаг

		//генерируем, пока ответы совпадают или уже используются
		let rnd_;
		do {
			rnd_ = RandomInt(0, questions.length);
		} while (usedWrongAns.includes(rnd_) || i == rnd_)

		ans[j] = questions[rnd_].answer;
		usedWrongAns.push(rnd_);
	}

	root.innerHTML += `<div class="question">
	<button class="quest-plb" id="pb${i}" src="${src}">⏵</button>
	<button class="quest-variant quest-v1" id="n${i}" pos="0"> ${ans[0]} </button>
	<button class="quest-variant quest-v2" id="n${i}" pos="1"> ${ans[1]} </button>
	<button class="quest-variant quest-v3" id="n${i}" pos="2"> ${ans[2]} </button>
	<button class="quest-variant quest-v4" id="n${i}" pos="3"> ${ans[3]} </button>
</div>`;
}

root.innerHTML += `<button class="confirm">Перейти к результатам</button>`

confugureAudio();


document.querySelectorAll(".quest-variant").forEach((cur) => {
	cur.onclick = () => {
		document.querySelectorAll(".quest-variant#"+cur.id).forEach((cur) => {
			cur.classList.remove("selected");
		})
		cur.classList.add("selected");
		let num = +(cur.id.slice(1))
		questions[num].given = cur.innerHTML.trim();
	}
})


document.querySelector(".confirm").onclick = () => {
	sessionStorage.setItem("questions",JSON.stringify(questions));
	document.location.href = './result.html'
}
/* устаревшее
function configureA(id) {
	var audio = document.getElementById(String(id) + "-a"); audio.volume = 0.3
	var playB = document.getElementById(String(id) + "-pb");
	var progress = document.getElementById(String(id) + "-prog");
	audio.oncanplay = function () {
		//console.log(this.duration);
		document.getElementById(String(id) + "-prog").max = Math.floor(this.duration * 1000);
		this.oncanplay = null
	}
	playB.onclick = function () {
		for (let i = 0; i < questions.length; i++) {
			let audios = document.getElementById(String(i) + "-a");
			if (audios == audio) continue;
			if (audios.paused) continue;
			document.getElementById(String(i) + "-pb").innerText = "⏵";
			audios.pause();
		}
		if (audio.paused) { audio.play(); playB.innerText = "⏸"; }
		else { audio.pause(); playB.innerText = "⏵" }
	}
	progress.onchange = function () {
		//console.log(audio.currentTime + "<--->" + progress.value)
		audio.currentTime = progress.value / 1000;
		//console.log(audio.currentTime + "<>" + progress.value)
	}
}
function UpdateBar() {
	for (let i = 0; i < questions.length; i++) {
		let audios = document.getElementById(String(i) + "-a");
		document.getElementById(String(i) + "-prog").value = Math.floor(audios.currentTime * 1000);
		if (audios.ended) {
			audios.currentTime = 0;
			document.getElementById(String(i) + "-pb").innerText = "⏵";
		}
		//  document.getElementById(String(i)+"-pb").innerText=(document.getElementById(String(i)+"-a").paused ? "⏵" : "⏸")
	}
}
function UpdateStorage() {
	sessionStorage.setItem("animeopen-ingtestloh", JSON.stringify({ vars: vars, answers: answers, quest: questions, }));
	console.log(JSON.parse(sessionStorage.getItem("animeopeningtestloh")))
}
setInterval(UpdateBar, 1000);//⏸⏵
for (let i = 0; i < vars.length; i++) {
	//"Выбор"
	for (let j = 1; j <= 4; j++) {
		document.getElementById(String(i) + "-" + String(j)).onclick = function () {
			let sel = document.getElementsByClassName("selected");
			for (let k = 0; k < sel.length; k++) {
				if (sel[k].id.startsWith(String(i))) {
					sel = sel[k];
					sel.classList.remove("selected");
					break;
				}
			}
			let ss = document.getElementById(String(i) + "-" + String(j))
			ss.classList.add("selected");
			answers[i] = document.getElementById(String(i) + "-" + String(j)).innerText;
			UpdateStorage();
		}
	}
	setTimeout(function () { configureA(i); }, 500);
}
UpdateStorage()
*/