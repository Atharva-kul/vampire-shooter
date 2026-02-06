const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d')

const ui = {
    hud: document.getElementById('hud'),
    startScreen: document.getElementById('startScreen'),
    gameOverScreen: document.getElementById('game-over-screen'),
    upgradeScreen: document.getElementById('upgrade-screen'),
    score: document.getElementById('score'),
    finalScore: document.getElementById('final-score'),
    hpBar: document.getElementById('hp-bar'),
    xpBar: document.getElementById('xp-bar'),
    level: document.getElementById('level'),
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    upgradeOptions: document.getElementById('upgrade-options')
}

let gameState = 'MENU';
let score = 0
let level = 1
let lastZTime = 0

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if(window.game) {
        window.game.createMaze();
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas()

let gameData = gameDataJSON;

class InputHandler {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            down: false
        };
        window.addEventListener('keydown', e => 
            this.keys[e.key.toLowerCase()] = true
        )

        window.addEventListener('keyup', e => 
            this.keys[e.key.toLowerCase()] = false
        )

        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mousedown', () => this.mouse.down = true);
        window.addEventListener('mouseup', () => this.mouse.down = false);
    }
}

class Particle {
    constructor(x, y, color, speed, size) {
        this.x = x
        this.y = y
        this.color = color
        this.size = size
        this.angle = Math.random() * Math.PI * 2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.life = 1.0
        this.decy = Math.random() * 0.02 + 0.02;

    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decy
        this.size *= 0.95;

    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore();
    }
}
