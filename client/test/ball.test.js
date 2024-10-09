import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
let ball, ballmovement;

describe('Ball Tests with JSDOM', () => {
    let dom;
    let container;
    
    before(async() => {
        dom = new JSDOM(`
            <html>
                <body>
                    <div id="container"></div>
                    <div id="paddle"></div>
                    <button id="start_button">Start</button>
                </body>
            </html>
        `);
        global.window = dom.window;
        global.document = dom.window.document;
        ({ ball, ballmovement } = await import('../scripts/ball.js'));
    });

    beforeEach(() => {
        container = document.querySelector('#container');
        container.innerHTML = '';
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create a ball element when createBall is called', () => {
        ball.createBall();
        const ballElement = document.querySelector('.ball');
        expect(ballElement).to.not.be.null;
        expect(ballElement.style.height).to.equal('15px');
        expect(ballElement.style.width).to.equal('15px');
        expect(ballElement.style.borderRadius).to.equal('50%');
        expect(ballElement.style.bottom).to.equal('10px');
        expect(ballElement.style.left).to.equal('10px');
    });

    it('should update ball bottom position when setBottom is called', () => {
        ball.createBall();
        ball.setBottom(20, true);
        const ballElement = document.querySelector('.ball');
        expect(ballElement.style.bottom).to.equal('20px');
    });

    it('should update ball left position when setLeft is called', () => {
        ball.createBall();
        ball.setLeft(30, true);
        const ballElement = document.querySelector('.ball');
        expect(ballElement.style.left).to.equal('30px');
    });

    it('should return ball bottom position when getBottom is called', () => {
        ball.createBall();
        ball.setBottom(25, true);
        expect(ball.getBottom(true)).to.equal(25);
    });

    it('should return ball left position when getLeft is called', () => {
        ball.createBall();
        ball.setLeft(35, true);
        expect(ball.getLeft(true)).to.equal(35);
    });
});
