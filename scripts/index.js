var is_started = 0;
var button = document.getElementById('start_button');
button.addEventListener('click', function () {
    startStopwatch();
    if (!is_started) ball.createBall();
    is_started = 1;
});
var containerSelector = '#container';
var containerElement = document.getElementById("container");
const rect = containerElement.getBoundingClientRect();
var containerTopMargin = parseInt(window.getComputedStyle(containerElement).height);
const initialBottom = containerTopMargin;
const brickWall = new BrickWall(containerSelector);
brickWall.buildWall();