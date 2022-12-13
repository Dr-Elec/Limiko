import { confugureAudio } from "stuff/audio.js";
let questions = JSON.parse(sessionStorage.getItem("questions"));

let block = document.querySelector(".ans-block");
let progress = document.getElementById("progress")
let resultEl = document.getElementById("result")
let correct = 0;
questions.forEach((cur,index)=>{
	if(cur.given == cur.answer) correct++;
	if(cur.given == undefined) cur.given = "Нет ответа"
	block.innerHTML+=`<div class="ans ${cur.given == cur.answer ?"right":"wrong"}">
			<button class="quest-plb" src="sound/${cur.file}">⏵</button>
			
			<p class="given" id="n${index}">${cur.given}</p>
			<p class="answer" id="n${index}">${cur.answer}</p>
	</div>
	`
})

let result = Math.round(correct/questions.length*100000)/1000;
console.log(result);
const k =0.03;
let updateScoreInt, counter = 0,val =0;

function updateScore() {
    if(counter > 150) {
		progress.value = Math.round(result);
    	resultEl.innerHTML = result+"%";
		clearInterval(updateScoreInt);
		return;
	}
    val += (result - val) *k;
    progress.value = Math.round(val);
    resultEl.innerHTML = Math.round(val*1000)/1000+"%";
    counter++;
}
let f = window.onload;
let g = () => {
	updateScoreInt = setInterval(updateScore, 25)
}
window.onload = () => {
	setTimeout(g,1000)
	confugureAudio();
	f();
}