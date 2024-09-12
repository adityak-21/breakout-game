let startTime;
let stopwatchInterval;
let elapsedPausedTime = 0;

export function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime;
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
}

export function stopStopwatch() {
  clearInterval(stopwatchInterval);
  elapsedPausedTime = new Date().getTime() - startTime;
  stopwatchInterval = null;
}

export function resetStopwatch() {
  stopStopwatch();
  elapsedPausedTime = 0;
  document.getElementById("time").innerHTML = "00:00:00";
}

function updateStopwatch() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  let seconds = Math.floor(elapsedTime / 1000) % 60;
  let minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  let hours = Math.floor(elapsedTime / 1000 / 60 / 60);
  let displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("time").innerHTML = displayTime;
}

function pad(number) {
  return (number < 10 ? "0" : "") + number;
}