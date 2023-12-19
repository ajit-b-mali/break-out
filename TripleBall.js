import Power from "./Power.js";
import Ball from "./Ball.js";
import { balls } from "./main.js";

export default class TripleBall extends Power {
    constructor(ctx, pos) {
        super(ctx, pos);
    }
    
    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.pos.x + 2, this.pos.y + 2, this.w - 4, this.h - 4);

        let r = this.h / 6;
        let x = this.pos.x + this.w / 2;
        let y = this.pos.y + this.h / 2

        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(x - r * 2 - 1, y, r, 0, Math.PI * 2);
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.arc(x + r * 2 + 1, y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    onCatch() {
        this.x = balls[0].pos.x;
        this.y = balls[0].pos.y;
        this.r = balls[0].r;
        balls.push(new Ball(this.ctx, {x: this.x, y:this.y}, this.r));
        balls.push(new Ball(this.ctx, {x: this.x, y:this.y}, this.r));
    }
}