const canvas = document.getElementById('vectorCanvas');
const ctx = canvas.getContext('2d');
let vectors = [];

let scale = 1;
let spacing = 20; // base grid spacing in pixels
let origin = { x: 0, y: 0 };

function resizeCanvasToDisplaySize() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    origin = { x: rect.width / 2, y: rect.height / 2 }; // move origin to center
}

document.addEventListener("DOMContentLoaded", () => {
    resizeCanvasToDisplaySize();
    drawGrid();
    drawVectors();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const displayWidth = canvas.getBoundingClientRect().width;
    const displayHeight = canvas.getBoundingClientRect().height;

    const step = spacing * scale;

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = origin.x % step; x <= displayWidth; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, displayHeight);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = origin.y % step; y <= displayHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(displayWidth, y);
        ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, displayHeight);
    ctx.stroke();

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(displayWidth, origin.y);
    ctx.stroke();
}

function drawVectors() {
    drawGrid();
    for (let v of vectors) {
        const endX = origin.x + v.x * spacing * scale;
        const endY = origin.y - v.y * spacing * scale;
        drawArrow(origin.x, origin.y, endX, endY);
    }
}

// 🔍 Zoom using mouse wheel
canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const prevScale = scale;
    if (e.deltaY < 0) {
        scale *= zoomFactor;
    } else {
        scale /= zoomFactor;
    }

    // Keep origin centered around mouse
    origin.x = mouseX - (mouseX - origin.x) * (scale / prevScale);
    origin.y = mouseY - (mouseY - origin.y) * (scale / prevScale);

    drawVectors();
});

// Resize support
window.addEventListener('resize', () => {
    resizeCanvasToDisplaySize();
    drawVectors();
});
