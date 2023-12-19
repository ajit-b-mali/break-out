import { powers , balls } from "./main.js";
import TripleBall from "./TripleBall.js";
import BigBall from "./BigBall.js";
import BigPlayer from "./BigPlayer.js";
import ShortPlayer from "./ShortPlayer.js";
import SlowBall from "./SlowBall.js";
import { game } from "./main.js";

export default class Brick {
    constructor(ctx, pos, power) {
        this.pos = pos;
        this.power = power;
        this.ctx = ctx;
        this.w = game.brickWidth;
        this.h = game.brickheight;
    }
    
    update(dt) {

    }
    
    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.pos.x + 1, this.pos.y + 1, this.w - 2, this.h - 2);
        this.ctx.restore();
    }

    powerUp() {
        switch (this.power) {
            case "TripleBall":
                powers.push(new TripleBall(this.ctx, this.pos));
                break;

            case "BigBall":
                powers.push(new BigBall(this.ctx, balls, this.pos));
                break;
        
            case "BigPlayer":
                powers.push(new BigPlayer(this.ctx, this.pos));
                break;

            case "ShortPlayer":
                powers.push(new ShortPlayer(this.ctx, balls, this.pos));
                break;

            case "SlowBall":
                powers.push(new SlowBall(this.ctx, balls, this.pos))
                break;

            default:
                break;
        }
    }
}