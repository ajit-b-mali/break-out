/**
 * @type HTMLCanvasElement
 */

import Player from "./Player.js";
import Ball from "./Ball.js";
import { timers } from "./Timer.js";
import Particle from "./Particle.js";
import createWorld from "./createWorld.js";
import level from "./level.js";

const canvas = document.getElementById("world")
const ctx = canvas.getContext("2d");

const startSrn = document.querySelector(".start");
const startBtn = document.querySelector(".start button");
const canvasSrn = document.querySelector(".main")
const levelCount = document.querySelector(".main div")
const restartSrn = document.querySelector(".end");
const dialog = document.querySelector(".end div");
const restartBtn = document.querySelector(".end button");

canvasSrn.style.display = "none";
restartSrn.style.display = "none";
startSrn.style.display = "grid";

startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", restart);

let oldTimeStamp = 0;
let dt = 0;
let pause = true
let pw = 100;
let ph = 15;
export let shake = false;
export let player;
export let balls = [];
export let powers = [];
export let bricks = [];

export let game = {
    brickWidth: canvas.width / 12,
    brickheight: 15,
    ctx: ctx,
}
let cl = 0;
let maxLevel = 4;
bricks = createWorld(level[cl].tileMap)
levelCount.innerHTML = `level:${cl + 1}`;
export let particle = [];

player = new Player(
    ctx,
    {
        x: canvas.width / 2 - pw / 2,
        y: canvas.height - ph - 10,
    }
);

balls.push(new Ball(ctx, {
    x: canvas.width / 2,
    y: player.pos.y - 10 - 0.01
}, 10));

const sfx = {
    player: new Howl({
        src: ["assets/player-ball.wav",],
    }),
    brick: new Howl({
        src: ["assets/brick-ball.wav",],
        volume: 0.5,
    }),
    ballOut: new Howl({
        src: ["assets/ball-out.wav",],
    }),
    power: new Howl({
        src: ["assets/power-up.wav",],
    })
};
const sound = new Howl({
    src: "assets/bgSound.mp3",
    volume: 0.05,
});
sound.play();

function start() {
    startSrn.style.display = "none";
    restartSrn.style.display = "none";
    canvasSrn.style.display = "block";
}

function restart() {
    reset(0);
}

function reset(cl) {
    startSrn.style.display = "none";
    restartSrn.style.display = "none";
    canvasSrn.style.display = "block";
    levelCount.innerHTML = `level = ${cl + 1}`;
    powers = []
    player = new Player(
        ctx,
        {
            x: canvas.width / 2 - pw / 2,
            y: canvas.height - ph - 10,
        }
    );
    balls = [];
    balls.push(new Ball(ctx, {
        x: canvas.width / 2,
        y: player.pos.y - 10 - 0.01
    }, 10));
    bricks = createWorld(level[cl].tileMap)
    pause = true;
}

function end() {
    startSrn.style.display = "none";
    restartSrn.style.display = "grid";
    canvasSrn.style.display = "none";
    sfx.ballOut.play();
    pause = true;
}

function next() {
    pause = true;
    cl += 1;
    if (cl >= maxLevel) {
        dialog.innerHTML = "WoW, You Won!!!!"
        end();
    } else {
        reset(cl);
    }
}

function noBricks() {
    let maxCount = bricks.length * 14;
    let temp = 0;
    bricks.forEach(row => {
        row.forEach(brick => {
            if (brick == 0)
                temp++;
        });
    });
    if (temp == maxCount) return true
    return false
}

function rectRectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2) {
        return false;
    }
    return true;
}

function playerPowerUpCollision(player, powers) {
    for (let i = 0; i < powers.length; i++) {
        const power = powers[i];
        if (rectRectIntersect(player.pos.x, player.pos.y, player.w, player.h, power.pos.x, power.pos.y, power.w, power.h)) {
            power.onCatch();
            powers.splice(i, 1);
            sfx.power.play();
        }
    }
}

function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function destroyBrick(brick, i, j) {
    let x = brick.pos.x;
    let y = brick.pos.y;
    for (let k = 0; k < 10; k++) {
        particle.push(new Particle(ctx, rand(x, x + brick.w), rand(y, y + brick.h), rand(brick.h / 10, brick.h / 2), rand(0, 360)));
    }
    brick.powerUp();
    bricks[i][j] = 0;
}

export function ballbrickXCollosion(ball, bricks) {
    bricks.forEach((row, i) => {
        row.forEach((brick, j) => {
            if (brick == 0) return;
            if (circleRectIntersect(ball.pos.x, ball.pos.y, ball.r, brick.pos.x, brick.pos.y, brick.w, brick.h)) {
                if (ball.vel.x < 0) {
                    ball.pos.x = brick.pos.x + brick.w + ball.r + 0.01;
                    ball.vel.x *= -1;
                }
                else if (ball.vel.x > 0) {
                    ball.pos.x = brick.pos.x - ball.r - 0.01;
                    ball.vel.x *= -1;
                }
                if (ball.r > 10) {
                    shake = true;
                    if (bricks[i][j + 1] && pointRectCollition(brick.pos.x + brick.w + 5, brick.pos.y + 5, bricks[i][j + 1])) {
                        destroyBrick(bricks[i][j + 1], i, j + 1);
                    }
                    if (bricks[i][j - 1] && pointRectCollition(brick.pos.x - 5, brick.pos.y + 5, bricks[i][j - 1])) {
                        destroyBrick(bricks[i][j - 1], i, j - 1);
                    }
                    if (bricks[i - 1][j] && pointRectCollition(brick.pos.x + 5, brick.pos.y - 5, bricks[i - 1][j])) {
                        destroyBrick(bricks[i - 1][j], i - 1, j);
                    }
                    if (bricks[i + 1][j] && pointRectCollition(brick.pos.x + 5, brick.pos.y + brick.h + 5, bricks[i + 1][j])) {
                        destroyBrick(bricks[i + 1][j], i + 1, j);
                    }
                }
                destroyBrick(brick, i, j)
                sfx.brick.play();
            }
        });
    });
}

function pointRectCollition(x, y, brick) {
    if (x < brick.pos.x || y < brick.pos.y || x > brick.pos.x + brick.w || y > brick.pos.y + brick.h) {
        return false;
    }
    return true;
}

export function ballbrickYCollosion(ball, bricks) {
    bricks.forEach((row, i) => {
        row.forEach((brick, j) => {
            if (brick == 0) return;
            if (circleRectIntersect(ball.pos.x, ball.pos.y, ball.r, brick.pos.x, brick.pos.y, brick.w, brick.h)) {
                if (ball.vel.y < 0) {
                    ball.pos.y = brick.pos.y + brick.h + ball.r + 0.01;
                    ball.vel.y *= -1;
                }
                else if (ball.vel.y > 0) {
                    ball.pos.y = brick.pos.y - ball.r - 0.01;
                    ball.vel.y *= -1;
                }
                if (ball.r > 10) {
                    shake = true;
                    if (bricks[i][j + 1] && pointRectCollition(brick.pos.x + brick.w + 5, brick.pos.y + 5, bricks[i][j + 1])) {
                        destroyBrick(bricks[i][j + 1], i, j + 1);
                    }
                    if (bricks[i][j - 1] && pointRectCollition(brick.pos.x - 5, brick.pos.y + 5, bricks[i][j - 1])) {
                        destroyBrick(bricks[i][j - 1], i, j - 1);
                    }
                    if (bricks[i - 1][j] && pointRectCollition(brick.pos.x + 5, brick.pos.y - 5, bricks[i - 1][j])) {
                        destroyBrick(bricks[i - 1][j], i - 1, j);
                    }
                    if (bricks[i + 1][j] && pointRectCollition(brick.pos.x + 5, brick.pos.y + brick.h + 5, bricks[i + 1][j])) {
                        destroyBrick(bricks[i + 1][j], i + 1, j);
                    }
                }
                destroyBrick(brick, i, j)
                sfx.brick.play();
            }
        });
    });
}

function circleRectIntersect(x1, y1, r1, x2, y2, w2, h2) {
    if (x1 + r1 < x2 || x1 - r1 > x2 + w2 || y1 + r1 < y2 || y1 - r1 > y2 + h2) {
        return false;
    }
    return true;
}

export function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function ballPlayerCollision(balls, p) {
    for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const maxA = 150;
        const minA = 30;
        const maxD = p.w + b.r * 2;
        if (circleRectIntersect(b.pos.x, b.pos.y, b.r, p.pos.x, p.pos.y, p.w, p.h)) {
            b.pos.y = p.pos.y - b.r - 0.01;
            let dx = Math.abs(b.pos.x - (p.pos.x - b.r))
            let per = dx * (100 / maxD);
            let angle = per * 180 / 100;
            angle = 180 - clamp(angle, minA, maxA);
            angle *= -1;
            let rad = angle * Math.PI / 180;
            b.vel = {
                x: b.speed * Math.cos(rad),
                y: b.speed * Math.sin(rad),
            }
            sfx.player.play();
        }
    }
}

function ballCanvasCollision(balls, c) {
    for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (b.pos.x < b.r) {
            b.pos.x = b.r + 0.01;
            b.vel.x *= -1;
        } else if (b.pos.x + b.r > c.width) {
            b.pos.x = c.width - b.r - 0.01;
            b.vel.x *= -1;
        }

        if (b.pos.y < b.r) {
            b.pos.y = b.r + 0.01;
            b.vel.y *= -1;
        } else if (b.pos.y > c.height + b.r) {
            balls.splice(i, 1);
            // b.pos.y = canvas.height - b.r - 0.01;
            // b.vel.y *= -1; 
        }
    }
}

function rectCanvasCollision(p, c) {
    if (p.pos.x < 0) {
        p.pos.x = 0.01;
        p.vel.x = 0;
    } else if (p.pos.x + p.w > c.width) {
        p.pos.x = c.width - p.w - 0.01;
        p.vel.x = 0;
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update(dt) {
    particle.forEach((p, i) => {
        if (p.del) particle.splice(i, 1);
        p.update(dt);
    });
    if (pause) return

    if (noBricks()) {
        next();
        return;
    }

    if (balls.length == 0) {
        end();
        return;
    }

    if (shake) {
        ctx.translate(0, -10);
        shake = false;
    } else {
        ctx.reset();
    }

    balls.forEach(ball => {
        ball.update(dt);
    });
    bricks.forEach(row => {
        row.forEach(tile => {
            if (!tile) return
            tile.update(dt);
        });
    });
    powers.forEach(power => {
        power.update(dt);
    });
    player.update(dt);
    timers.forEach(timer => {
        timer.update(dt);
    });
}

function draw() {
    player.draw();
    balls.forEach(ball => {
        ball.draw();
    });
    bricks.forEach(row => {
        row.forEach(tile => {
            if (!tile) return
            tile.draw()
        });
    });
    particle.forEach(p => {
        p.draw();
    })
    powers.forEach(power => {
        power.draw();
    })
}

function gameLoop(timeStamp) {
    dt = Math.min((timeStamp - oldTimeStamp) / 1000, 0.1);
    oldTimeStamp = timeStamp;

    update(dt);
    playerPowerUpCollision(player, powers);
    ballPlayerCollision(balls, player);
    rectCanvasCollision(player, canvas);
    ballCanvasCollision(balls, canvas);
    clear();
    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener('keydown', e => {
    if (e.code == "ArrowLeft") {
        player.vel.x = -500;
    } else if (e.code == "ArrowRight") {
        player.vel.x = 500;
    }
    if (e.code == 'Space' && canvasSrn.style.display != "none") {
        pause = false
    }
});

window.addEventListener('keyup', e => {
    if (e.code == "ArrowLeft" || e.code == "ArrowRight") {
        player.vel.x = 0;
    }
})

const box = canvas.getBoundingClientRect();
let clicked = false

canvas.addEventListener('touchstart', e => {
    if (canvasSrn.style.display != "none")
    pause = false
    player.pos.x = e.touches[0].clientX;
});
canvas.addEventListener('touchmove', e => {
    player.pos.x = e.touches[0].clientX;
});
canvas.addEventListener('mousedown', e => {
    if (canvasSrn.style.display != "none")
    pause = false
    clicked = true;
    player.pos.x = e.offsetX - 100;
});
canvas.addEventListener('mousemove', e => {
    if (!clicked) return;
    player.pos.x = e.offsetX - 100;
});
canvas.addEventListener('mouseup', e => {
    clicked = false
});