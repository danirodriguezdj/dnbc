// Referencias al canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Redimensionar canvas a pantalla completa
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sonidos
const jumpSound = new Audio("assets/jump.wav");
const hitSound = new Audio("assets/hit.wav");
const music = new Audio("assets/music.mp3");
music.loop = true;

// Variables del juego
let player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  color: "#00b894",
  velocityY: 0,
  jumpForce: 15,
  gravity: 1,
  grounded: true
};

let score = 0;
let isPlaying = false;
let obstacles = [];
let gameSpeed = 6;

// Mostrar puntuación
function drawHUD() {
  ctx.fillStyle = "#535353";
  ctx.font = "24px 'Courier New'";
  ctx.fillText("Score: " + score, canvas.width - 200, 50);
}

// Crear obstáculo
function spawnObstacle() {
  const height = 50;
  obstacles.push({
    x: canvas.width,
    y: canvas.height - height,
    width: 30 + Math.random() * 30,
    height: height,
    color: "#d63031"
  });
}

// Dibujar personaje
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Dibujar obstáculos
function drawObstacles() {
  obstacles.forEach(obs => {
    ctx.fillStyle = obs.color;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

// Actualizar jugador
function updatePlayer() {
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.grounded = true;
  }
}

// Detectar colisiones
function checkCollisions() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      isPlaying = false;
      hitSound.play();
      music.pause();
      alert("¡Has perdido! Puntuación: " + score);
      location.reload();
    }
  }
}

// Bucle principal
function gameLoop() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();

  // Mover obstáculos
  obstacles.forEach(o => o.x -= gameSpeed);
  obstacles = obstacles.filter(o => o.x + o.width > 0);

  // Crear obstáculos aleatoriamente
  if (Math.random() < 0.02) spawnObstacle();

  drawPlayer();
  drawObstacles();
  drawHUD();
  checkCollisions();

  score++;

  requestAnimationFrame(gameLoop);
}

// Saltar con barra espaciadora o click
window.addEventListener("keydown", e => {
  if ((e.code === "Space" || e.code === "ArrowUp") && player.grounded) {
    player.velocityY = -player.jumpForce;
    player.grounded = false;
    jumpSound.play();
  }
});

window.addEventListener("click", () => {
  if (player.grounded) {
    player.velocityY = -player.jumpForce;
    player.grounded = false;
    jumpSound.play();
  }
});

// ⬇️ Nombre del jugador
function askNameIfNeeded() {
  if (localStorage.getItem("hippyrun_name")) {
    startGame();
  } else {
    showNameInput();
  }
}

function showNameInput() {
  const container = document.createElement("div");
  container.id = "nameInputContainer";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Tu nombre...";

  const button = document.createElement("button");
  button.innerText = "Entrar";
  button.onclick = () => {
    if (input.value.trim().length > 1) {
      localStorage.setItem("hippyrun_name", input.value.trim());
      container.remove();
      startGame();
    }
  };

  container.appendChild(input);
  container.appendChild(button);
  document.body.appendChild(container);
}

function startGame() {
  isPlaying = true;
  music.play();
  gameLoop();
}

// Iniciar
askNameIfNeeded();

// Pantalla de inicio
function showStartScreen() {
  const startScreen = document.createElement("div");
  startScreen.id = "startScreen";
  startScreen.style.position = "fixed";
  startScreen.style.top = "0";
  startScreen.style.left = "0";
  startScreen.style.width = "100vw";
  startScreen.style.height = "100vh";
  startScreen.style.backgroundColor = "black";
  startScreen.style.display = "flex";
  startScreen.style.flexDirection = "column";
  startScreen.style.justifyContent = "center";
  startScreen.style.alignItems = "center";
  startScreen.style.zIndex = "10";

  const title = document.createElement("h1");
  title.innerText = "🎧 HIPPY RUN 🎧";
  title.style.color = "#00ffcc";
  title.style.fontFamily = "'Courier New', monospace";
  title.style.fontSize = "48px";
  title.style.marginBottom = "20px";

  const subtitle = document.createElement("p");
  subtitle.innerText = "Pulsa para empezar";
  subtitle.style.color = "#ffffff";
  subtitle.style.fontFamily = "'Courier New', monospace";
  subtitle.style.fontSize = "20px";

  startScreen.appendChild(title);
  startScreen.appendChild(subtitle);
  document.body.appendChild(startScreen);

  startScreen.addEventListener("click", () => {
    startScreen.remove();
    askNameIfNeeded();
  });
}

// Mostrar pantalla de inicio
showStartScreen();
