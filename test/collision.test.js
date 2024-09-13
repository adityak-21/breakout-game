import { expect } from "chai";
import sinon from "sinon";
import { JSDOM } from "jsdom";
let scoreValue,
  ball,
  brickWall,
  paddle,
  collision,
  ydir,
  xdir,
  getYDir,
  getXDir;
var left, right, up, down, check, check0, check1, check2, check3, check4;
describe("Collision Tests with JSDOM", () => {
  let dom;
  let container;
  before(async () => {
    dom = new JSDOM(`
            <html>
              <body>
                <div id="container"></div>
                <div id="score_value">0</div>
                <div id="paddle"></div>
                <button id="start_button">Start</button>
              </body>
            </html>
        `);
    global.window = dom.window;
    global.document = dom.window.document;
    ({ ball } = await import("../scripts/ball.js"));
    ({ brickWall } = await import("../scripts/bricks.js"));
    ({ collision, ydir, xdir, getYDir, getXDir } = await import(
      "../scripts/collision.js"
    ));
    const containerElement = document.getElementById("container");
    sinon.stub(containerElement, "getBoundingClientRect").returns({
      left: 0,
      right: 200,
      top: 0,
      bottom: 200,
    });
    global.l = containerElement.getBoundingClientRect();
  });

  beforeEach(() => {
    container = document.querySelector("#container");
    scoreValue = document.querySelector("#score_value");
    paddle = document.querySelector("#paddle");
    container.innerHTML = "";
    scoreValue.innerHTML = "0";
    ydir = 1.0;
    xdir = 1.0;
    ball.getBottom = () => 100;
    ball.getTop = () => 50;
    ball.getRight = () => 100;
    ball.getLeft = () => 50;
    ball.height = 15;
    ball.width = 15;
    brickWall.length = 0;
    left = 0;
    right = 0;
    up = 0;
    down = 0;
    check = 0;
    check0 = 0;
    check1 = 0;
    check2 = 0;
    check3 = 0;
    check4 = 0;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should reverse ydir when ball hits the top boundary", () => {
    ball.getBottom = () => 200;
    const paddleRect = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    sinon.stub(paddle, "getBoundingClientRect").returns(paddleRect);
    (left = 0), (right = 0), (up = 200), (down = 0), (check = 0), (check0 = 1);
    collision(
      paddle.getBoundingClientRect(),
      left,
      right,
      up,
      down,
      check,
      check0,
      0,
      0,
      0,
      0,
    );
    expect(getYDir()).to.equal(-1.0);
  });

  it("should reverse xdir when ball hits the left boundary", () => {
    ball.getLeft = () => 200;
    const paddleRect = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    sinon.stub(paddle, "getBoundingClientRect").returns(paddleRect);
    (left = 0), (right = 200), (up = 0), (down = 0), (check = 0), (check1 = 1);
    collision(
      paddle.getBoundingClientRect(),
      left,
      right,
      up,
      down,
      check,
      0,
      check1,
      0,
      0,
      0,
    );
    expect(getXDir()).to.equal(-1.0);
  });

  it("should reverse xdir when ball hits the right boundary", () => {
    ball.getRight = () => 200;
    const paddleRect = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    sinon.stub(paddle, "getBoundingClientRect").returns(paddleRect);
    (left = 0), (right = 200), (up = 0), (down = 0), (check = 0), (check1 = 1);
    collision(
      paddle.getBoundingClientRect(),
      left,
      right,
      up,
      down,
      check,
      0,
      check1,
      0,
      0,
      0,
    );
    expect(getXDir()).to.equal(-1.0);
  });

  it("should increase score when ball hits the brick", () => {
    var brick = brickWall.bricks[0];
    // console.log(brickWall.bricks[0]);
    ball.getRight = () => brick.bottomLeft.x;
    ball.getLeft = () => brick.bottomRight.x;
    ball.getBottom = () => 100;
    // console.log(ball.getBottom());
    const paddleRect = {
      getTop: () => 90,
      getBottom: () => 100,
      getLeft: () => 50,
      getRight: () => 100,
    };
    sinon.stub(paddle, "getBoundingClientRect").returns(paddleRect);
    collision(paddle.getBoundingClientRect());
    expect(parseInt(scoreValue.innerHTML)).to.equal(0);
  });
});
