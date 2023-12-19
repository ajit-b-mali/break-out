import Power from "./Power.js";
import { shortPlayerTimer } from "./Timer.js";
import { player } from "./main.js";

export default class ShortPlayer extends Power {
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


        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x + this.w / 2, this.pos.y + this.h / 2, 2, 0, Math.PI * 2)
        this.ctx.closePath();
        this.ctx.fill();

        let x = this.pos.x + this.w / 2 - this.h / 4;
        let y = this.pos.y + this.h / 2;

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x - this.h / 4, y - this.h / 4)
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x - this.h / 4, y + this.h / 4)
        
        x += this.h / 2;
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + this.h / 4, y - this.h / 4)
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + this.h / 4, y + this.h / 4)
        this.ctx.stroke();
        this.ctx.closePath();
    }

    onCatch() {
        shortPlayerTimer.startTimer();
        if (player.w < 100) return;
        player.pos.x += (player.w - 50) / 2;
        player.w = 50;
    }
}