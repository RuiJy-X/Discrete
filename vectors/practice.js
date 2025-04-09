const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let vectors = [];

let scale = 1;
let spacing = 20; // base grid spacing in pixels
let origin = { x: 0, y: 0 };

document.addEventListener("DOMContentLoaded", () => {
    resizeCanvasToDisplaySize();
     // move origin to center
    drawGrid();
})


function addVector(){
    const x = parseFloat(document.getElementById('x-input').value);
    const y = parseFloat(document.getElementById('y-input').value);
    const container = document.getElementById('vector-container');
    const vectorDiv = document.createElement('div');
    vectorDiv.innerText = `Vector: (${x}, ${y})`;
    container.appendChild(vectorDiv);

    if (!isNaN(x) || !isNaN(y)) {
        vectors.push({x,y})
        drawVectors();  
    }
}

function resizeCanvasToDisplaySize() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    origin = { x: rect.width / 2, y: rect.height / 2 }; // move origin to center
}

function drawGrid(){
    const displayHeight = canvas.getBoundingClientRect().height;
    const displayWidth = canvas.getBoundingClientRect().width;
    
   

    const step = spacing*scale // 20 pixels per scale 

    ctx.strokeStyle = "black";
    ctx.linewidth = 1;

    for (let x = origin.x % step; x < displayWidth; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, displayHeight);
        ctx.stroke();
    }

    

    
    
