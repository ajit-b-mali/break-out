import { balls, player } from "./main.js";

export let timers = [];

class Timer {
    constructor(time, func) {
        this.time = time;
        this.func = func;

        this.timePassed = 0;
        this.start = false;
        this.timeOut = false;
    }

    update(dt) {
        if(!this.start) return;
        this.timePassed += dt;
        if (this.timePassed > this.time) {
            this.func();
            this.timePassed = 0;
            this.start = false;
        }
    }

    startTimer() {
        this.start = true;
        this.timePassed = 0;
    }
}

function bigBallReset() {
    balls.forEach(ball => {
        ball.r = 10;
    });
}

function bigPlayerReset() {
    if(player.w < 100) return;
    player.pos.x += 25;
    player.w = 100;
}

function shortPlayerReset() {
    if(player.w > 100) return;
    player.pos.x -= 25;
    player.w = 100;
}

export let bigBallTimer;
export let bigPlayerTimer;
export let shortPlayerTimer;

bigBallTimer = new Timer(5, bigBallReset);
bigPlayerTimer = new Timer(5, bigPlayerReset);
shortPlayerTimer = new Timer(5, shortPlayerReset)

timers.push(bigBallTimer, bigPlayerTimer, shortPlayerTimer);