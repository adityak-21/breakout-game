var startTime; 
      var stopwatchInterval;
      var elapsedPausedTime = 0; 
      
      function startStopwatch() {
        if (!stopwatchInterval) {
          startTime = new Date().getTime() - elapsedPausedTime; 
          stopwatchInterval = setInterval(updateStopwatch, 1000); 
        }
      }
      
      function stopStopwatch() {
        clearInterval(stopwatchInterval); 
        elapsedPausedTime = new Date().getTime() - startTime;
        stopwatchInterval = null; 
      }
      
      function resetStopwatch() {
        stopStopwatch(); 
        elapsedPausedTime = 0; 
        document.getElementById("time").innerHTML = "00:00:00"; 
      }
      
      function updateStopwatch() {
        var currentTime = new Date().getTime(); // get current time in milliseconds
        var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
        var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
        var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
        var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
        var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
        document.getElementById("time").innerHTML = displayTime; // update the display
      }
      
      function pad(number) {
        // add a leading zero if the number is less than 10
        return (number < 10 ? "0" : "") + number;
      }