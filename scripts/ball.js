import { is_started } from "./index.js";
import { xdir } from "./collision.js";
import { ydir } from "./collision.js";
import { collision } from "./collision.js";
var containerSelector = '#container';
const ballLayout = Object.freeze({
    height: 15,
    width: 15,
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
        ballElement.style.bottom = `10px`;
        ballElement.style.left = `10px`;
        this.container.appendChild(ballElement);
        this.ballElement = ballElement;
    }
    getBottom() {
        if(is_started)
        return parseInt(this.ballElement.style.bottom) || 0;
    }
    getLeft() {
        if(is_started)
        return parseInt(this.ballElement.style.left) || 0;
    }
    setBottom(bottom) {
        if(is_started)
        if (this.ballElement) this.ballElement.style.bottom = `${bottom}px`;
    }
    setLeft(left) {
        if(is_started)
        if (this.ballElement) this.ballElement.style.left = `${left}px`;
    }
}
export const ball = new Ball(containerSelector);




export function ballmovement() {
    const paddle_ball = document.getElementById('paddle');
    const p = paddle_ball.getBoundingClientRect();
    collision(p);
    ball.setBottom(ball.getBottom() + ydir);
    ball.setLeft(ball.getLeft() + xdir);
}