const brickLayout = Object.freeze({
    height: 15,
    width: 50
});
const spacing = Object.freeze({
    horizontal: 10,
    vertical: 15
});
const brickCount = Object({
    row: 7,
    column: 9
});
class Brick {
    constructor(left, bottom) {
        this.bottomLeft = {
            x: left,
            y: bottom
        };
        this.bottomRight = {
            x: left + brickLayout.width,
            y: bottom
        };
        this.topLeft = {
            x: left,
            y: bottom + brickLayout.height
        };
        this.topRight = {
            x: left + brickLayout.width,
            y: bottom + brickLayout.height
        };
        this.element;
    }
    createBrick() {
        const brickElement = document.createElement('div');
        brickElement.classList.add('brick');
        brickElement.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        brickElement.style.left = `${this.bottomLeft.x}px`;
        brickElement.style.bottom = `${this.bottomLeft.y}px`;
        this.element = brickElement;
        return brickElement;
    }
}

class BrickWall {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.bricks = [];
    }
    createBricks() {
        for (let row = 1; row <= brickCount.row; row++) {
            for (let col = 0; col < brickCount.column; col++) {
                const left = spacing.horizontal + col * (brickLayout.width + spacing.horizontal);
                const bottom = initialBottom - row * (brickLayout.height + spacing.vertical);
                const brick = new Brick(left, bottom);
                this.bricks.push(brick);
            }
        }
    }
    displayBricks() {
        this.bricks.forEach(brick => {
            this.container.appendChild(brick.createBrick());
        });
    }
    buildWall() {
        this.createBricks();
        this.displayBricks();
    }
}