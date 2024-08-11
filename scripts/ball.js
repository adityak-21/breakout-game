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
ball.createBall();

const ballSpeed=1;

let ydir=1;
let xdir=1;

const l = containerElement.getBoundingClientRect();

console.log(parseInt(l.top));
console.log(parseInt(l.bottom));

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


function collision(p){
    if(ball.getBottom()>=up || ball.getBottom()<=down) ydir = ydir*(-1);
    if(ball.getLeft()>=right|| ball.getLeft()<=left) xdir = xdir*(-1);
    if((ball.getLeft()>=parseInt(p.left-l.left) && ball.getLeft()<=parseInt(p.right-l.left) && ball.getBottom()<=(l.bottom-p.top))) ydir = ydir*(-1);
    else if(ball.getBottom()<=(l.bottom-p.top)){
        window.alert("Game Over");
        ydir = ydir*(-1);
        ball.setLeft(100);
        ball.setBottom(100);
    }
}
setInterval(() => ballmovement(), ballSpeed);