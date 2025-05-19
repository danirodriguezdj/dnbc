// Lógica principal del juego, animaciones, colisiones, puntuación
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dibujar fondo negro
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Dibujar texto de prueba
ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.fillText("HIPPY RUN", 50, 50);
