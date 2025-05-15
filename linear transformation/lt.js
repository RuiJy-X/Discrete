const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const origin = { x: 250, y: 250 };

    const originalVectors = [
      [1, 1],
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, -1]
    ];
    let transformedVectors = JSON.parse(JSON.stringify(originalVectors));

    const animSlider = document.getElementById("animSlider");
    const vectorList = document.getElementById("vector-list");

    let matrix = [
      [1, 0],
      [0, 1]
    ];

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#ddd";
      for (let i = -10; i <= 10; i++) {
        drawLine([i, -10], [i, 10], false);
        drawLine([-10, i], [10, i], false);
      }

      ctx.strokeStyle = "#00f";
      for (let i = -10; i <= 10; i++) {
        drawLine([i, -10], [i, 10], true);
        drawLine([-10, i], [10, i], true);
      }

      ctx.strokeStyle = "#000";
      drawLine([-10, 0], [10, 0], false);
      drawLine([0, -10], [0, 10], false);
    }

    function drawLine([x1, y1], [x2, y2], transform = false) {
      const t = parseFloat(animSlider.value);

      let p1 = [x1, y1];
      let p2 = [x2, y2];

      if (transform) {
        const p1Trans = applyMatrix(p1);
        const p2Trans = applyMatrix(p2);
        p1 = [interpolate(x1, p1Trans[0], t), interpolate(y1, p1Trans[1], t)];
        p2 = [interpolate(x2, p2Trans[0], t), interpolate(y2, p2Trans[1], t)];
      }

      const p1x = origin.x + p1[0] * 25;
      const p1y = origin.y - p1[1] * 25;
      const p2x = origin.x + p2[0] * 25;
      const p2y = origin.y - p2[1] * 25;

      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();
    }

    function interpolate(start, end, t) {
      return (1 - t) * start + t * end;
    }

    function applyMatrix([x, y]) {
      const a11 = matrix[0][0];
      const a12 = matrix[0][1];
      const a21 = matrix[1][0];
      const a22 = matrix[1][1];
      return [a11 * x + a12 * y, a21 * x + a22 * y];
    }

    function drawArrow(x, y, color = "red") {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(origin.x + x * 50, origin.y - y * 50);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(origin.x + x * 50, origin.y - y * 50, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    function draw() {
      
      drawGrid();
      const t = parseFloat(animSlider.value);
      vectorList.innerHTML = "<h3>Vector Transformations:</h3><ul>";
      for (let i = 0; i < originalVectors.length; i++) {
        const [x0, y0] = originalVectors[i];
        const [x1, y1] = transformedVectors[i];
        const x = (1 - t) * x0 + t * x1;
        const y = (1 - t) * y0 + t * y1;
        drawArrow(x, y, "red");

        vectorList.innerHTML += `<li>[${x0}, ${y0}] → [${x1.toFixed(2)}, ${y1.toFixed(2)}]</li>`;
      }
      vectorList.innerHTML += "</ul>";
    }

    function applyTransformation() {
      const a11 = parseFloat(document.getElementById("a11").value);
      const a12 = parseFloat(document.getElementById("a12").value);
      const a21 = parseFloat(document.getElementById("a21").value);
      const a22 = parseFloat(document.getElementById("a22").value);

      matrix = [
        [a11, a12],
        [a21, a22]
      ];

      transformedVectors = originalVectors.map(([x, y]) => [
        a11 * x + a12 * y,
        a21 * x + a22 * y
      ]);
      animSlider.value = 0;
      draw();
    }

    animSlider.addEventListener("input", draw);

    applyTransformation();
    draw();