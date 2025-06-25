const audio = document.getElementById("audio");
const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const timeDisplay = document.getElementById("time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 0;
let timer;
let isPlaying = false;

// Default audio and video
const sounds = {
  rain: {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    video: "https://www.w3schools.com/howto/rain.mp4"
  },
  beach: {
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    video: "https://www.w3schools.com/howto/beach.mp4"
  }
};

// Default
let currentSound = sounds.rain;
loadMedia();

soundButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSound = sounds[btn.id];
    loadMedia();
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = parseInt(btn.id === "smaller-mins" ? 5 : 10) * 60;
    updateTimeDisplay(duration);
  });
});

playBtn.addEventListener("click", () => {
  if (!duration) return alert("Please select time first!");
  if (!isPlaying) {
    audio.play();
    video.play();
    startTimer();
    isPlaying = true;
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    isPlaying = false;
  }
});

function loadMedia() {
  audio.src = currentSound.audio;
  video.src = currentSound.video;
  audio.load();
  video.load();
}

function startTimer() {
  let timeLeft = duration;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      isPlaying = false;
      return;
    }
    updateTimeDisplay(timeLeft);
    timeLeft--;
  }, 1000);
}

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  timeDisplay.textContent = `${mins}:${secs}`;
}
