import Power from "./Power.js";
import { bigBallTimer } from "./Timer.js";

export default class BigBall extends Power {
    constructor(ctx, balls, pos) {
        super(ctx, pos);

        this.balls = balls;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.pos.x + 2, this.pos.y + 2, this.w - 4, this.h - 4);

        let r = this.h / 2.5;
        let x = this.pos.x + this.w / 2;
        let y = this.pos.y + this.h / 2;

        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    onCatch() {
        bigBallTimer.startTimer();
        this.balls.forEach(ball => {
            ball.r = 25;
        })
    }
}