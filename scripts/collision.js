var score_value = document.getElementById('score_value');

function collision(p) {
    if (ball.getBottom() + ball.height >= up) {
        ydir = ydir * (-1);
    }
    if (ball.getLeft() + ball.width >= right || ball.getLeft() <= left) {
        xdir = xdir * (-1);
    }
    if ((ball.getLeft() + ball.width >= parseInt(p.left - l.left) && 
        ball.getLeft() <= parseInt(p.right - l.left) && 
        ball.getBottom() + (ball.height) <= (l.bottom - p.top))
        ) {
        ydir = ydir * (-1);
        while(ball.getBottom() + (ball.height) <= (l.bottom - p.top)){
            ball.setBottom(ball.getBottom() + ydir);
            ball.setLeft(ball.getLeft() + xdir);
        }
    } else if (ball.getBottom() < down) {
        stopStopwatch();
        window.alert(`Game Over:Score ${score_value.innerHTML}`);
        score_value.innerHTML = 0;
        if (ydir > 0) ydir = -1;
        if (ydir < 0) ydir = 1;
        if (xdir > 0) xdir = 1;
        if (xdir < 0) xdir = -1;
        ball.setLeft(10);
        ball.setBottom(10);
        startStopwatch();
    } else {
        for (let i = 0; i < brickWall.bricks.length; i++) {
            var brick = brickWall.bricks[i];
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
                if (brickWall.bricks.length === 0) {
                    window.alert(`Game Over:Score ${score_value.innerHTML} Time:${document.getElementById("time").innerHTML}`);
                    resetStopwatch();
                    location.reload();
                }
                break;
            }
        }
    }
}

setInterval(() => ballmovement(), ballSpeed);