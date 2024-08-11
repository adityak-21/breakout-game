var containerSelector = '#container';
var containerElement = document.getElementById("container");
const ballLayout = Object.freeze({
    height: 20,
    width: 20,
    radius: 50
});
class Ball {
    constructor(containerSelector) {
        this.height = ballLayout.height;
        this.width = ballLayout.width;
        this.radius = ballLayout.radius;
        this.container = document.querySelector(containerSelector);
        this.ballElement = null;
    }
    createBall() {
        const ballElement = document.createElement('div');
        ballElement.classList.add('ball');
        ballElement.style.height = `${this.height}px`;
        ballElement.style.width = `${this.width}px`;
        ballElement.style.borderRadius = `${this.radius}%`;
        this.container.appendChild(ballElement);
        this.ballElement = ballElement;
    }
    getBottom() {
        return parseInt(this.ballElement.style.bottom) || 0;;
    }
    getLeft() {
        return parseInt(this.ballElement.style.left) || 0;;
    }
    setBottom(bottom) {
        if (this.ballElement) this.ballElement.style.bottom = `${bottom}px`;
    }
    setLeft(left) {
        if (this.ballElement) this.ballElement.style.left = `${left}px`;
    }
}
const ball = new Ball(containerSelector);
ball.createBall();

const ballSpeed = 500;

let ydir = 5;
let xdir = 5;

function ballmovement() {
    // collision();
    ball.setBottom(ball.getBottom() + 5);
    ball.setLeft(ball.getLeft() + 5);
}
setInterval(() => ballmovement(), ballSpeed);