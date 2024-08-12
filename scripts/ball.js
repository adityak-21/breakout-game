// This code is written by Aditya
var containerSelector = '#container';
var containerElement = document.getElementById("container");
const ballLayout = Object.freeze({
    height: 20,
    width: 20,
    radius: 50
});
class Ball {
   
    constructor(containerSelector){
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
        ballElement.style.bottom = `100px`;
        ballElement.style.left = `100px`;
        this.container.appendChild(ballElement);
        this.ballElement = ballElement;
    }
    getBottom() {
        return parseInt(this.ballElement.style.bottom) || 0;
    }
    getLeft() {
        return parseInt(this.ballElement.style.left) || 0;
    }
    setBottom(bottom) {
        if(this.ballElement) this.ballElement.style.bottom = `${bottom}px`;
    }
    setLeft(left) {
        if(this.ballElement) this.ballElement.style.left = `${left}px`;
    }
}
const ball = new Ball(containerSelector);
// ball.createBall();

let ballSpeed=10.0;

//Do not change
let ydir=1.0;
let xdir=1.0;

const l = containerElement.getBoundingClientRect();

// console.log(parseInt(l.top));
// console.log(parseInt(l.bottom));

const left = 0
const right = parseInt(l.right - l.left)
const up = parseInt(l.bottom-l.top)
const down = 0

function ballmovement(){
    const paddle_ball = document.getElementById('paddle');
    const p = paddle_ball.getBoundingClientRect();
    collision(p);
    ball.setBottom(ball.getBottom()+ydir);
    ball.setLeft(ball.getLeft()+xdir);
}
