let audio = document.querySelector(".audioblock audio");
let pos = document.querySelector(".audioblock #pos");
let volume = document.querySelector(".audioblock #volume");
let playB = document.querySelector(".audioblock .playB");

export const confugureAudio = () => {
    volume.oninput = () => {
        audio.volume = volume.value / 100;
    }
    volume.oninput()
    
    pos.oninput = () => {
        audio.currentTime = +pos.value / 1000.0 * audio.duration;
    }
    
    let UpdateBar = () => {
        if (audio.ended) audio.currentTime = 0;
        pos.value = audio.currentTime / audio.duration * 1000;
    }
    setInterval(UpdateBar, 1000)
    
    document.querySelector(".quest-plb").classList.add("play")
    audio.src = document.querySelector(".quest-plb").getAttribute("src");
    document.querySelectorAll(".quest-plb").forEach((cur) => {
        cur.onclick = () => {
            if (audio.src.endsWith(cur.getAttribute("src"))) {
                if (audio.paused) {//пауза/проигрыш
                    audio.play();
                    cur.innerHTML = "⏸";
                    playB.innerHTML = "⏸";
                }
                else {
                    audio.pause();
                    cur.innerHTML = "⏵";
                    playB.innerHTML = "⏵";
                }
            }
            else {//смены ссылки
                audio.src = cur.getAttribute("src");
                audio.play();
                document.querySelector(".quest-plb.play").innerHTML = "⏵"
                document.querySelector(".quest-plb.play").classList.remove("play")
    
                cur.innerHTML = "⏸";
                playB.innerHTML = "⏸";
                cur.classList.add("play");
            }
        }
    })
    
    playB.onclick = () => {
        if (audio.paused) {//пауза/проигрыш
            audio.play();
            document.querySelector(".quest-plb.play").innerHTML = "⏸";
            playB.innerHTML = "⏸";
        }
        else {
            audio.pause();
            document.querySelector(".quest-plb.play").innerHTML = "⏵";
            playB.innerHTML = "⏵";
        }
    }
    
}
