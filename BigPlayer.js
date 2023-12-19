import Power from "./Power.js";
import { bigPlayerTimer } from "./Timer.js";
import { player } from "./main.js";

export default class BigPlayer extends Power {
    constructor(ctx, pos) {
        super(ctx, pos);
    }


    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.pos.x + 2, this.pos.y + 2, this.w - 4, this.h - 4);

        let x = this.pos.x + this.w / 3;
        let y = this.pos.y + this.h / 4;

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x - this.h / 4, y + this.h / 4)
        this.ctx.lineTo(x, y + this.h / 2)

        x += this.w / 3;
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + this.h / 4, y + this.h / 4)
        this.ctx.lineTo(x, y + this.h / 2)
        this.ctx.stroke();
        this.ctx.closePath();

        x = this.pos.x + this.w / 2 - this.h / 4;
        y = this.pos.y + this.h / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + this.h / 2, y)
        this.ctx.stroke();
        this.ctx.closePath();
    }

    onCatch() {
        bigPlayerTimer.startTimer();
        if (player.w > 100) return;
        player.pos.x -= (150 - player.w) / 2;
        player.w = 150;
    }
}