var containerElement = document.getElementById("container");
const mainConatiner = containerElement.getBoundingClientRect();
const paddle = document.getElementById('paddle');
let isDragging = false;
paddle.addEventListener('mousedown', function (event) {
    isDragging = true;
});
document.addEventListener('mouseup' ,function(event){
    isDragging=false;
});
document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        const mouseX = event.clientX;
        const paddleWidth = paddle.offsetWidth;
        let newPaddleX = mouseX-paddleWidth/2;
        console.log(newPaddleX);
        if (newPaddleX < mainConatiner.left) {
            newPaddleX = mainConatiner.left;
        } else if (newPaddleX-mainConatiner.left >= 356) {
            newPaddleX = 356+mainConatiner.left;
        }
        paddle.style.left = `${newPaddleX-mainConatiner.left}px`;
    }
})