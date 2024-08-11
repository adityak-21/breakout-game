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
    else {
        for (let i = 0; i < brickWall.bricks.length; i++) {
            var brick = brickWall.bricks[i];
            if (
                ball.getLeft() + ball.width >= brick.bottomLeft.x &&
                ball.getLeft() <= brick.bottomRight.x &&
                ball.getBottom() + ball.height >= brick.bottomLeft.y &&
                ball.getBottom() <= brick.topLeft.y
            ) {
                ydir = ydir * (-1);
                brick.element.parentNode.removeChild(brick.element);
                brickWall.bricks.splice(i,1);
                break;
            }
        }
    }
}

setInterval(() => ballmovement(), ballSpeed);
