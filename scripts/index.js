export let is_started = 0; 
import { ball } from "./ball.js";
import { startStopwatch } from "./watch.js";
var button = document.getElementById('start_button');
button.addEventListener('click', function () {
    startStopwatch();
    if (!is_started) ball.createBall();
    is_started = 1;
});

