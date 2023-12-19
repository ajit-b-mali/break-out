import Power from "./Power.js";

export default class SlowBall extends Power {
    constructor(ctx, balls, pos) {
        super(ctx, pos);

        this.balls = balls;
        this.time = 3;
        this.timer = 0;
        this.startTimer = false;
        this.hasTimer = true;
    }


    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.pos.x + 2, this.pos.y + 2, this.w - 4, this.h - 4);

        let x = this.pos.x + this.w / 2;
        let y = this.pos.y + this.h / 1.75;

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + this.h / 4);
        this.ctx.closePath();
        this.ctx.stroke();
        
        y -= this.h / 3; 

        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x - this.h / 4, y + this.h / 4)
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + this.h / 4, y + this.h / 4)
        this.ctx.stroke();
        this.ctx.closePath();
    }

    onCatch() {
        this.balls.forEach(ball => {
            ball.speed = 300;
        })
    }
}