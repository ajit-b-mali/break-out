import Brick from "./Brick.js";
import { game } from "./main.js";

export default function createWorld(tilemap) {
    let temp = [];
    let bricks = [];
    tilemap.forEach((row, i) => {
        row.forEach((tile, j) => {
            if(tile == 0) {
                temp.push(0);
            }
            if(tile == 1) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "None"));
            }
            if(tile == 2) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "TripleBall"));
            }
            if(tile == 3) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "BigBall"));
            }
            if(tile == 4) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "BigPlayer"));
            }
            if(tile == 5) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "ShortPlayer"));
            }
            if(tile == 6) {
                temp.push(new Brick(game.ctx, {x: (j - 1) * game.brickWidth, y: (i - 1) * game.brickheight}, "SlowBall"));
            }
        });
        bricks.push(temp);
        temp = [];
    });
    return bricks;
}
