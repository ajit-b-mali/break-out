import { game } from "./main.js";

export default class Power {
    constructor(ctx, pos) {
        this.ctx = ctx;
        this.pos = pos;

        this.w = game.brickWidth;
        this.h = game.brickheight;
        this.vel = {
            x: 0,
            y: -50,
        }
        this.g = 150
    }

    update(dt) {
        this.vel.y += this.g * dt;

        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    }
}