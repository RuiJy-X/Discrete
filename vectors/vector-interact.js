// script.js
const canvas = document.getElementById('vectorCanvas');
const ctx = canvas.getContext('2d');
const origin = { x: canvas.width / 2, y: canvas.height / 2 };
let vectors = [];

document.addEventListener("DOMContentLoaded", () => {
    drawGrid(); // Draw grid right after HTML loads
  });

function addVector() {
    const x = parseFloat(document.getElementById('x-input').value);
    const y = parseFloat(document.getElementById('y-input').value);
    const container = document.getElementById('vector-container');
    const vectorDiv = document.createElement('div');
    vectorDiv.innerText = `Vector: (${x}, ${y})`;
    container.appendChild(vectorDiv);
    if (!isNaN(x) && !isNaN(y)) {
    vectors.push({ x, y });
    drawVectors();
    }
}

function drawArrow(fromX, fromY, toX, toY, color = 'black') {
  const headLength = 10;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Draw arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6),
              toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6),
              toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.lineTo(toX, toY);
  ctx.fill();
}
function drawGrid() {
    const spacing = 20; // pixels between lines
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
  
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
  
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  
    // Draw X and Y axis
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
  
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, canvas.height);
    ctx.stroke();
  
    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(canvas.width, origin.y);
    ctx.stroke();
  }
  

function drawVectors() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  for (let v of vectors) {
    drawArrow(origin.x, origin.y, origin.x + v.x * 20, origin.y - v.y * 20);
  }
}
