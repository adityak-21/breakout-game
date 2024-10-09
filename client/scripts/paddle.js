import { is_started } from "./index.js";

let containerElement = document.getElementById("container");
const mainConatiner = containerElement.getBoundingClientRect();
const paddle = document.getElementById('paddle');
let isDragging = false;
paddle.addEventListener('mousedown', function () {
    isDragging = true;
});
document.addEventListener('mousemove', function (event) {
    if (is_started && isDragging) {
        const mouseX = event.clientX;
        const paddleWidth = paddle.offsetWidth;
        let newPaddleX = mouseX - paddleWidth / 2;
        if (newPaddleX < mainConatiner.left) {
            newPaddleX = mainConatiner.left;
        } else if (newPaddleX >= mainConatiner.right - paddleWidth) {
            newPaddleX = mainConatiner.right - paddleWidth;
        }
        paddle.style.left = `${newPaddleX-mainConatiner.left}px`;
    }
});
document.addEventListener("keydown", function (event) {
    if (is_started) {
        if (event.key == "ArrowLeft") {
            paddle.style.left = `${parseInt(paddle.style.left)-10}px`;
        } else if (event.key == "ArrowRight") {
            paddle.style.left = `${parseInt(paddle.style.left)+10}px`;
        }
    }
});