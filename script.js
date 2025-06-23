// script.js

const app = document.getElementById("app");
const video = document.getElementById("bgVideo");
const audio = document.getElementById("meditation-sound");
const playBtn = document.querySelector(".play");
const playIcon = document.getElementById("play-icon");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // Default 10 minutes
let currentTime = 600;
let timer;

function updateDisplay() {
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    video.play();
    playIcon.src = "pause-icon.png";
    startTimer();
  } else {
    audio.pause();
    video.pause();
    playIcon.src = "play-icon.png";
    clearInterval(timer);
  }
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      audio.pause();
      video.pause();
      clearInterval(timer);
      playIcon.src = "play-icon.png";
    }
  }, 1000);
}

playBtn.addEventListener("click", togglePlay);

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "smaller-mins":
        duration = 120;
        break;
      case "medium-mins":
        duration = 300;
        break;
      case "long-mins":
        duration = 600;
        break;
    }
    currentTime = duration;
    updateDisplay();
  });
});

soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const vid = button.getAttribute("data-video");
    audio.src = sound;
    video.src = vid;
    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

updateDisplay();
