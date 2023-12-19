export default class Player {
    constructor(ctx, pos) {
        this.ctx = ctx;
        this.w = 100;
        this.h = 7;
        this.pos = pos;
        this.vel = {
            x: 0,
            y: 0,
        };
    }

    update(dt) {
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    }
}