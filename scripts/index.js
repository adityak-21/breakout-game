    var is_started=0;
    var button=document.getElementById('start_button');
    button.addEventListener('click',function(){
        if(!is_started)ball.createBall();
        is_started=1;
       
    });
    // oject for bricklayout freezed so can't change on live size change
    const brickLayout = Object.freeze({
        height:15,
        width:50
    });
    // spacing between bricks
    const spacing = Object.freeze({
        horizontal: 10,
        vertical: 15
    });
    // brick count will change it later according to the level
    const brickCount = Object({
        row : 7,
        column : 9
    });    
    var containerSelector = '#container';
    // const initialBottom = 570;  // hardcoded for now
    var containerElement = document.getElementById("container");
    const rect = containerElement.getBoundingClientRect();
    const corners = {
        topLeft: { x: rect.left, y: rect.top },
        topRight: { x: rect.right, y: rect.top },
        bottomLeft: { x: rect.left, y: rect.bottom },
        bottomRight: { x: rect.right, y: rect.bottom }
      };
      
      // Log the coordinates
      console.log(corners);
    var containerTopMargin = parseInt(window.getComputedStyle(containerElement).height);
    

    const initialBottom =  containerTopMargin; 

    // brick class that is individual brick
    class Brick {
        constructor(left, bottom) {
            this.bottomLeft = { x: left, y: bottom };
            this.bottomRight = { x: left + brickLayout.width, y: bottom };
            this.topLeft = { x: left, y: bottom + brickLayout.height };
            this.topRight = { x: left + brickLayout.width, y: bottom + brickLayout.height };
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

    // list of bricks
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
    const brickWall = new BrickWall(containerSelector);
    brickWall.buildWall();

   