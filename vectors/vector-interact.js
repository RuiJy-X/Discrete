const canvas = document.getElementById('vectorCanvas'); //get canvas element
const ctx = canvas.getContext('2d'); // make a "pencil" to draw 
let vectors = []; // create a vector list

let scale = 1; //the multiplier for the grid size higher  number means larger space between grids
let spacing = 20; // base grid spacing in pixels
let origin = { x: 0, y: 0 };

function resizeCanvasToDisplaySize() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width ;
    canvas.height = rect.height;

    ctx.setTransform(1, 0,  0, 1, 0, 0); // reset
    

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
    const origin_x = parseFloat(document.getElementById('x-origin').value);
    const origin_y = parseFloat(document.getElementById('y-origin').value);
    const container = document.getElementById('vector-container');
    const vectorDiv = document.createElement('div');
    
    if (!isNaN(x) && !isNaN(y)) {
        vectors.push({ x, y, origin_x, origin_y });
        console.log(vectors)
        vectorDiv.innerText = `Vector: (${x}, ${y})`;
        container.appendChild(vectorDiv);
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

        const label = (x - origin.x) / (spacing * scale)
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.fillText(label.toFixed(0), x + 2, origin.y + 12); // Adjust the position of the label
    }

    // Horizontal lines
    for (let y = origin.y % step; y <= displayHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(displayWidth, y);
        ctx.stroke();

        const label = -1 *((y - origin.y) / (spacing * scale))
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.fillText(label.toFixed(0), origin.x + 2, y - 2); // Adjust the position of the label
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
        

        let startX = origin.x + v.origin_x * scale * spacing; //+ (v.origin_x * scale * spacing)
        let startY = origin.y - v.origin_y * scale * spacing ; //- (v.origin_y * scale * spacing)
 
        const endX = origin.x + v.x * spacing * scale;
        const endY = origin.y - v.y * spacing * scale;

        drawArrow(startX, startY, endX, endY);
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

canvas.addEventListener("mousedown", (e) => {
    let isDragging = true;

    let startX = e.offsetX
    let startY = e.offsetY
    

    canvas.addEventListener("mousemove", (e) => {
        if (isDragging){
            const deltaX = e.offsetX - startX; //distance from where the mouse was clicked toward where the mouse currently is
            const deltaY = e.offsetY - startY

            // update origin

            origin.x += deltaX
            origin.y += deltaY

            startX = e.offsetX
            startY = e.offsetY
            
            drawGrid()
            drawVectors()

        }

    })

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
        
    });

    canvas.addEventListener("mouseleave", () => {
        isDragging = false
    })
})

// Resize support
window.addEventListener('resize', () => {
    resizeCanvasToDisplaySize();
    drawVectors();
});
