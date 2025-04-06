function generateMatrix(size, matrix) {
   
   
    const container = document.getElementById(matrix);
    container.innerHTML = ""; // clear old matrix
    
    
    for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.style.width = "auto"
    row.classList.add("row", "align-items-center", "d-flex", "justify-content-center")
    

    for (let j = 0; j < size; j++) {
        const col = document.createElement("div");
        col.classList.add("col", "text-center", );
        const input = document.createElement("input");
        input.type = "text";
        input.id = `${matrix}-a${i}${j}`; // unique id for each input
        input.classList.add("form-control", "text-center", "h-100", "matrix-input");
        input.style.background = "transparent"
        input.style.border = "none"
        input.style.borderBottom = "1px solid white"
        input.style.outline = "none"
        input.style.borderRadius = "0px"
        input.style.color = "white"
        col.appendChild(input);
        row.appendChild(col);
    }

    container.appendChild(row);
    
    
    }
  }

function operand(operand){
    const operatorElement = document.getElementById("operator")
    operatorElement.innerText = ""
    operatorElement.innerText = operand
}

function solve(){
    const matrix1 = document.getElementById("matrix1")
    const matrix2 = document.getElementById("matrix2")
    const result = document.getElementById("resultMatrix")
    const operator = document.getElementById("operator").innerText
    const size = Math.sqrt(matrix1.querySelectorAll("input").length);

    result.innerHTML = ""; // clear old result

    const m1 = [];
    const m2 = [];
    const matrix1Inputs = matrix1.querySelectorAll("input")
    const matrix2Inputs = matrix2.querySelectorAll("input")

    // Build 2D array for matrix1
    for (let i = 0; i < size; i++) {
        m1[i] = [];
        for (let j = 0; j < size; j++) {
            m1[i][j] = parseInt(matrix1Inputs[i * size + j].value) || 0;
        }
    }

    // Build 2D array for matrix2
    for (let i = 0; i < size; i++) {
        m2[i] = [];
        for (let j = 0; j < size; j++) {
            m2[i][j] = parseInt(matrix2Inputs[i * size + j].value) || 0;
        }
    }

    console.log("Matrix 1:", m1);
    console.log("Matrix 2:", m2);
    
    let results = []
    if (operator == "+"){    
        for (let i =0; i < size; i++){
            results[i] = []
            for (let j = 0; j < size; j++){
                
                let sum = m1[i][j] + m2[i][j]
                results[i].push(sum)
            }
            
        }

        
    }

    if (operator == "-"){
        for (let i =0; i < size; i++){
            results[i] = []
            for (let j = 0; j < size; j++){
                
                let sum = m1[i][j] - m2[i][j]
                results[i].push(sum)
            }
            
        }
    }

    if (operator === "*") {
       
        // Multiply matrices
        for (let i = 0; i < size; i++) {
            results[i] = [];
            for (let j = 0; j < size; j++) {
                let sum = 0
                for (let k = 0; k < size; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                results[i].push(sum);
            }

        }
    
        console.log("Multiplication Result:", results);

    }



    for (let i = 0; i < results.length; i++){
        const row = document.createElement("div");
        row.style.width = "auto"
        row.classList.add("row", "align-items-center", "d-flex", "justify-content-center")
        
        for (let j = 0; j < results[i].length; j++){
            const col = document.createElement("div");
            col.classList.add("col", "text-center","text-white" );
            const output = document.createElement("h6");
            output.id = `result-a${i}${j}`; // unique id for each input
            output.classList.add("form-control", "text-center", "h-100", "matrix-input");
            output.style.background = "transparent"
            output.style.border = "none"
            output.style.outline = "none"
            output.style.color = "white"
            output.innerText = results[i][j] || 0;
            col.appendChild(output);
            row.appendChild(col);
        }
        result.appendChild(row);
    }
    
}