const app = document.getElementById('app');
const video = document.querySelector('video');
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600;
let timer;
let isPlaying = false;

timeButtons.forEach(button => {
  button.addEventListener('click', function () {
    switch (this.id) {
      case 'smaller-mins': fakeDuration = 120; break;
      case 'medium-mins': fakeDuration = 300; break;
      case 'long-mins': fakeDuration = 600; break;
    }
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${fakeDuration % 60}`;
  });
});

soundButtons.forEach(button => {
  button.addEventListener('click', function () {
    const soundSrc = this.getAttribute('data-sound');
    const videoSrc = this.getAttribute('data-video');
    audio.src = soundSrc;
    video.src = videoSrc;
    checkPlaying(audio);
  });
});

play.addEventListener('click', () => {
  checkPlaying(audio);
});

function checkPlaying(audio) {
  if (!isPlaying) {
    audio.play();
    video.play();
    playPauseIcon(true);
    isPlaying = true;
    startTimer();
  } else {
    audio.pause();
    video.pause();
    playPauseIcon(false);
    isPlaying = false;
    clearInterval(timer);
  }
}

function startTimer() {
  let currentTime = fakeDuration;
  timer = setInterval(() => {
    currentTime--;
    timeDisplay.textContent = `${Math.floor(currentTime / 60)}:${currentTime % 60}`;
    if (currentTime <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playPauseIcon(false);
      isPlaying = false;
    }
  }, 1000);
}

function playPauseIcon(isPlaying) {
  play.innerHTML = isPlaying
    ? `<circle cx="50" cy="50" r="45"></circle><rect x="35" y="30" width="10" height="40" fill="#fff"></rect><rect x="55" y="30" width="10" height="40" fill="#fff"></rect>`
    : `<circle cx="50" cy="50" r="45"></circle><polygon points="40,30 70,50 40,70" fill="#fff" />`;
}
