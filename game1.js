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

class Maze {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.cellsize = 100
        this.walls = []
        this.generate()
    }

    generate() {
        this.walls = []
        const grid = []

        for(let r = 0; r<this.rows; r++) {
            grid[r] = []

            for(let c=0; c<this.cols; c++) {
                grid[r][c] = {
                    visited: false,
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    row: r,
                    col: c
                };
            }
        }

        const stack = []
        const current = grid[0][0]
        current.visited = true
        stack.push(current)

        while(stack.length>0) {
            const curr = stack[stack.length - 1]
            const neighbors = this.getNeighbors(grid, curr.row, curr.col)

            if(neighbors.length > 0) {
                const next = neighbors[Math.floor(Math.random()*neighbors.length)]
                this.removeWalls(curr, next)
                next.visited = true
                stack.push(next)
            } else {
                stack.pop()
            }
        }

        this.walls.push({
            x: 0,
            y: 0,
            w: this.cols*this.cellsize,
            h:5
        }) // top wall
        this.walls.push({
            x: 0,
            y: this.rows*this.cellSize,
            w: this.cols*this.cellsize,
            h:5
        }) //bottom wall
        this.walls.push({
            x: 0,
            y: 0,
            w: 5,
            h: this.rows*this.cellSize
        }) // left wall
        this.walls.push({
            x: 0,
            y: 0,
            w: this.cols*this.cellsize,
            h:5
        }) // right wall

        for(let r=0; r<this.rows; r++) {
            for(let c=0; c<this.cols; c++) {
                const cell = grid[r][c]
                const x = c * this.cellsize
                const y = r*this.cellsize

                if(cell.bottom && r<this.rows-1) {
                    this.walls.push({
                        x: x,
                        y: y+this.cellSize+5,
                        w: this.cellSize,
                        h: 5
                    })
                }
                if(cell.right && c<this.cols-1) {
                    this.walls.push({
                        x: x+this.cellSize,
                        y: y, 
                        w: 5,
                        h: this.cellSize+5
                    })
                }
            }
        }
    }

    getNeighbors(grid, r, c) {
        const neighbors = []
        if(r>0 && !grid[r-1][c].visited) {
            neighbors.push(grid[r-1][c])
        }
        if(r<this.rows-1 && !grid[r+1][c].visited) {
            neighbors.push(grid[r+1][c])
        }
        if(c>0 && !grid[r][c-1].visited) {
            neighbors.push(grid[r][c-1])
        }
        if(c< this.cols-1 && !grid[r][c+1].visited) {
            neighbors.push(grid[r][c+1])
        }
        return neighbors
    }

    removeWalls(a, b) {
        const x = a.col-b.col
        if(x === 1) {
            a.left = false
            b.right = false
        }
        else if(x===-1) {
            a.right = false
            b.left = false
        }

        const y = a.row-b.row
        if(y===1) {
            a.top = false
            b.bottom = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#00ffff'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00ffff'
        this.walls.forEach(w => {
            ctx.fillRect(w.x, w.y, w.w, w.h)
        })
        ctx.shadowBlur = 0
    }

}