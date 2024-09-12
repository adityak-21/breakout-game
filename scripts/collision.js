import { ball, ballmovement } from "./ball.js";
import { startStopwatch, stopStopwatch, resetStopwatch } from "./watch.js";
import { brickWall } from "./bricks.js";
export let ydir = 1.0;
export let xdir = 1.0;
let score_value = document.getElementById('score_value');
let max_score = 0;
let containerElement = document.getElementById("container");
const l = containerElement.getBoundingClientRect();
export function getYDir() {
    return ydir;
}
export function getXDir() {
    return xdir;
}
let ballSpeed = 10.0;
export function collision(p, left=0, right=parseInt(l.right-l.left), up=parseInt(l.bottom - l.top), down=0, check=1, check0=0, check1=0, check2=0, check3=0, check4=0) {
    if ((check || check0) && ball.getBottom() + ball.height >= up) {
        ydir = ydir * (-1);
    }
    if ((check || check1) && ball.getLeft() + ball.width >= right || ball.getLeft() <= left) {
        xdir = xdir * (-1);
    }
    if ((check || check2) && (ball.getLeft() + ball.width >= parseInt(p.left - l.left) && 
        ball.getLeft() <= parseInt(p.right - l.left) && 
        ball.getBottom() + (ball.height) <= (l.bottom - p.top))
        ) {
        ydir = ydir * (-1);
        while(ball.getBottom() + (ball.height) <= (l.bottom - p.top)){
            ball.setBottom(ball.getBottom() + ydir);
            ball.setLeft(ball.getLeft() + xdir);
        }
    } else if ((check || check3) && ball.getBottom() < down) {
        if(check)
        {
            stopStopwatch();
            max_score=Math.max(max_score,score_value.innerHTML);
            window.alert(`Game Over:Score ${score_value.innerHTML}`);
            score_value.innerHTML = 0;
        }
        if (ydir > 0) ydir = -1;
        else if (ydir < 0) ydir = 1;
        if (xdir > 0) xdir = 1;
        else if (xdir < 0) xdir = -1;
        if(check3)
        {
            ball.getLeft = () => 10;
            ball.getLeft = () => 10;
        }
        ball.setLeft(10);
        ball.setBottom(10);
        if(check) startStopwatch();
    } else if((check || check4)) {
        for (let i = 0; i < brickWall.bricks.length; i++) {
            let brick = brickWall.bricks[i];
            if (
                ball.getLeft() + ball.width >= brick.bottomLeft.x &&
                ball.getLeft() <= brick.bottomRight.x &&
                ball.getBottom() + ball.height >= brick.bottomLeft.y &&
                ball.getBottom() <= brick.topLeft.y
            ) {
                if (
                    ball.getBottom() + ball.height == brick.bottomLeft.y ||
                    ball.getBottom() == brick.topLeft.y
                )
                    ydir = ydir * (-1);
                else xdir = xdir * (-1);
                score_value.innerHTML = parseInt(score_value.innerHTML) + 5;
                brick.element.parentNode.removeChild(brick.element);
                if (ydir > 0) ydir += 0.2;
                if (ydir < 0) ydir -= 0.2;
                if (xdir > 0) xdir += 0.2;
                if (xdir < 0) xdir -= 0.2;
                brickWall.bricks.splice(i, 1);
                if (check && brickWall.bricks.length === 0) {
                    max_score=Math.max(max_score,score_value.innerHTML);
                    window.alert(`Game Over:Score ${max_score} Time:${document.getElementById("time").innerHTML}`);
                    resetStopwatch();
                    location.reload();
                }
                break;
            }
        }
    }
}

setInterval(() => ballmovement(), ballSpeed);