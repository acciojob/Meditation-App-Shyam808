// script.js

// Get references
const app = document.getElementById("app");
const video = document.getElementById("bgVideo");
const audio = document.getElementById("meditation-sound");
const playBtn = document.querySelector(".play");
const playIcon = document.getElementById("play-icon");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

// Default duration: 10 minutes (600 seconds)
let duration = 600;
let currentTime = 600;
let timer;

// Update time text
function updateDisplay() {
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Start or pause the audio and video
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

// Start countdown timer
function startTimer() {
  clearInterval(timer); // Reset any existing timer
  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playIcon.src = "play-icon.png";
    }
  }, 1000);
}

// Handle time selection buttons
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

// Handle switching between meditation modes
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const vid = button.getAttribute("data-video");

    // Update sources
    audio.src = sound;
    video.src = vid;

    // Load and resume if already playing
    audio.load();
    video.load();

    if (!audio.paused) {
      audio.play();
      video.play();
    }
  });
});

// Initialize time display
updateDisplay();
