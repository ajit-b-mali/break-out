import { ballbrickXCollosion, ballbrickYCollosion, bricks, clamp } from "./main.js";

export default class Ball {
    constructor(ctx, pos, r) {
        this.ctx = ctx;
        this.r = r;
        this.pos = pos;
        this.minSpeed = 300;
        this.maxSpeed = 600;
        this.speed = this.minSpeed;
        this.min = 45;
        this.max = 135;
        this.angle = -(Math.random() * (this.max - this.min) + this.min);
        this.rad = this.angle * Math.PI / 180;
        this.vel = {
            x: this.speed * Math.cos(this.rad),
            y: this.speed * Math.sin(this.rad),
        }
        this.a = 5;
    }
    
    update(dt) {
        this.speed = clamp(Math.abs(this.speed) + this.a * dt, 300, this.maxSpeed);

        this.rad = Math.atan2(this.vel.y, this.vel.x);
        this.vel = {
            x: this.speed * Math.cos(this.rad),
            y: this.speed * Math.sin(this.rad),
        }
        this.pos.x += this.vel.x * dt;
        ballbrickXCollosion(this, bricks);
        this.pos.y += this.vel.y * dt;
        ballbrickYCollosion(this, bricks);
    }
    
    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = 'black'
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.r - 4, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}