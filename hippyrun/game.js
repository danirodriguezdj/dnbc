// Mostrar el formulario si no hay nombre guardado
const nameFormContainer = document.getElementById('nameFormContainer');
const playerNameInput = document.getElementById('playerName');

if (!localStorage.getItem('hippyRunPlayerName')) {
  nameFormContainer.style.display = 'flex';
} else {
  nameFormContainer.style.display = 'none';
  startGame(); // función principal del juego
}

document.getElementById('nameForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = playerNameInput.value.trim();
  if (name) {
    localStorage.setItem('hippyRunPlayerName', name);
    nameFormContainer.style.display = 'none';
    startGame();
  }
});

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.fillText("HIPPY RUN", 50, 50);

function startGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Ajustar al tamaño de la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Fondo negro
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texto de bienvenida
  ctx.fillStyle = '#0f0';
  ctx.font = '30px monospace';
  ctx.fillText("¡Bienvenido, " + localStorage.getItem('hippyRunPlayerName') + "!", 50, 100);
}
