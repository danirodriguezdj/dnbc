const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 200;
const ctx = canvas.getContext('2d');

let trex = { x: 50, y: 150, vy: 0, jumping: false };
let gravity = 0.6;
let jumpStrength = -12;
let obstacles = [];
let speed = 6;
let score = 0;
let gameOver = false;

function drawTrex() {
  ctx.fillStyle = '#000';
  ctx.fillRect(trex.x, trex.y, 40, 40); // Personaje cuadrado
}

function drawObstacle(ob) {
  ctx.fillStyle = '#888';
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
}

function drawGround() {
  ctx.strokeStyle = '#333';
  ctx.beginPath();
  ctx.moveTo(0, 190);
  ctx.lineTo(canvas.width, 190);
  ctx.stroke();
}

function drawScore() {
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText(`Score: ${score}`, 650, 30);
}

function spawnObstacle() {
  if (Math.random() < 0.02) {
    obstacles.push({ x: canvas.width, y: 160, width: 20 + Math.random() * 20, height: 30 });
  }
}

function updateTrex() {
  if (trex.jumping) {
    trex.vy += gravity;
    trex.y += trex.vy;
    if (trex.y >= 150) {
      trex.y = 150;
      trex.vy = 0;
      trex.jumping = false;
    }
  }
}

function updateObstacles() {
  obstacles.forEach(ob => ob.x -= speed);
  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function checkCollision() {
  for (let ob of obstacles) {
    if (
      trex.x < ob.x + ob.width &&
      trex.x + 40 > ob.x &&
      trex.y < ob.y + ob.height &&
      trex.y + 40 > ob.y
    ) {
      gameOver = true;
    }
  }
}

function gameLoop() {
  if (gameOver) {
    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#a00';
    ctx.fillText('GAME OVER', 300, 100);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawnObstacle();
  updateTrex();
  updateObstacles();
  checkCollision();

  drawGround();
  drawTrex();
  obstacles.forEach(drawObstacle);
  drawScore();

  score++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if ((e.key === ' ' || e.key === 'ArrowUp') && !trex.jumping) {
    trex.vy = jumpStrength;
    trex.jumping = true;
  }
});

gameLoop();
