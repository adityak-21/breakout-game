var startTime;
var stopwatchInterval;
var elapsedPausedTime = 0;

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
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var seconds = Math.floor(elapsedTime / 1000) % 60;
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60);
  var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("time").innerHTML = displayTime;
}

function pad(number) {
  return (number < 10 ? "0" : "") + number;
}