

export default class Particle {
    constructor(ctx, x, y, r, angle) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.del = false;
        this.angle = angle;
        this.rad = this.angle * Math.PI / 180;

        this.vx = 10 * Math.cos(this.rad);
        this.vy = 10 * Math.sin(this.rad);
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        this.r -= this.r * 3 * dt;
        if (this.r < 1) {
            this.del = true;
        }
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
}