import { musicList } from "./data.js";
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".stop");
const forwardBtn = document.querySelector(".forward");
const backBtn = document.querySelector(".back");
const audioElement = document.querySelector("audio");
const album = document.querySelector(".album");
const singerImg = document.querySelector(".cover-photo");
const scrollBar = document.querySelector("#scrollbar");
const currentTimeElem = document.querySelector(".currentTime");
const musicInfoActive = document.querySelector(".music-info-active");
const singerName = document.querySelector(".singer");
let index = 0;

playBtn.addEventListener("click", () => {
  audioPlay(index);
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});

function audioPlay(i) {
  audioElement.src = `./assets/audios/${musicList[i].musicPath}`;
  audioElement.play();
  scrollBar.max = 0;

  scrollBar.max = musicList[index].duration;
  singerName.innerHTML = `${musicList[i].artistName}`;
  singerImg.src = `./assets/images/${musicList[i].imagePath}`;
  musicInfoActive.stop();
  musicInfoActive.start();
  musicInfoActive.innerHTML = `${musicList[i].artistName},${musicList[i].musicName}`;
}
forwardBtn.addEventListener("click", () => {
  index++;
  if (index === musicList.length) {
    index = 0;
  }
  audioPlay(index);
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});
backBtn.addEventListener("click", () => {
  index--;
  if (index === -1) {
    index = musicList.length - 1;
  }
  audioPlay(index);
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});

pauseBtn.addEventListener("click", () => {
  audioElement.pause();
  pauseBtn.classList.add("active");
  playBtn.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  musicList.forEach((music, i) => {
    let mn = Math.trunc(music.duration / 60);
    let sn = Math.trunc(music.duration % 60);
    album.innerHTML += `
    <div class="album-box" data-index="${i}">
          <div class="album-elements">
            <img
              src="./assets/images/${music.imagePath}"
              alt=""
              class="album-image"
            />
            <p class="album-item-singer">${music.artistName}</p>
            
          </div>
          <div class="album-elements">
            <p class="album-item-song">${music.musicName}</p>
            <p class="time">${mn >= 10 ? mn : "0" + mn} :${
      sn >= 10 ? sn : "0" + sn
    }</p>
          </div>
        </div> 
    `;
  });
  const albumBoxes = document.querySelectorAll(".album-box");
  albumBoxes.forEach((albumBox) => {
  albumBox.addEventListener("click", (event) => {
    const clickedIndex = event.currentTarget.dataset.index;
    index = parseInt(clickedIndex, 10);
    audioPlay(index);
    playBtn.classList.add("active");
    pauseBtn.classList.remove("active");
  });
});
});
audioElement.addEventListener("timeupdate", () => {
  let mn = Math.trunc(audioElement.currentTime / 60);
  let sn = Math.trunc(audioElement.currentTime % 60);
  currentTimeElem.innerHTML = `${mn >= 10 ? mn : "0" + mn}:${
    sn >= 10 ? sn : "0" + sn
  }`;
  scrollBar.value = audioElement.currentTime;
});

scrollBar.addEventListener("input", (e) => {
  audioElement.currentTime = e.target.value;
});

audioElement.addEventListener("ended", () => {
  index++;
  if (index === musicList.length) {
    index = 0;
  }
  audioPlay(index);
});


