let matrices =[] //array of matrix

document.addEventListener("DOMContentLoaded",function(){
    function generateMatrix(){
        let matrix1 = [
            [null,null],
            [null,null]
        ]
        let matrixHTML = `<div class = "container text-white h-100 ">`
        for (let i =0; i<matrix1.length; i++){
            matrixHTML += `<div class = "row h-50 align-items-center">`;
            for (let j = 0; j<matrix1[i].length; j++){
                let randomNumber = Math.floor(Math.random()*51);
                matrix1[i][j] = randomNumber;
                matrixHTML += `<div class = "col-6 text-center">${randomNumber}</div>`
            }
            matrixHTML += `</div>`
        }
        
        matrixHTML += `</div>`
        return {matrix1, matrixHTML}
    }
    let matrixContainers = document.querySelectorAll(".matrix-container")

    matrixContainers.forEach(container =>{
        let {matrix1 , matrixHTML} = generateMatrix();
        container.innerHTML = matrixHTML
        matrices.push(matrix1)
    })
});

function validate(input){
    if (input.value !== "" && isNaN(input.value)){
        alert("Insert numbers only")
        input.value = ""
    }

}

function answer(){
    matrix1 = matrices[0]
    matrix2 = matrices[1]
    
    result = [
        [0,0],
        [0,0]
    ]
    input = [
        [document.querySelector("#a11").value, document.querySelector("#a12").value],
        [document.querySelector("#a21").value, document.querySelector("#a22").value]
    ]
    
    result[0][0] = matrix1[0][0] + matrix2[0][0];   
    result[0][1] = matrix1[0][1] + matrix2[0][1];
    result[1][0] = matrix1[1][0] + matrix2[1][0];
    result[1][1] = matrix1[1][1] + matrix2[1][1];

    let isCorrect = (
        input[0][0] == result [0][0] && 
        input[0][1] == result [0][1] &&
        input[1][0] == result [1][0] && 
        input[1][1] == result [1][1] )

    let modalBody = document.querySelector(".modal-body")
    modalBody.innerHTML = `
        <div class = "container">
            <div class = "row">
                <div class = "col-6">
                    <h4>Your Answer</h4>
                    <div class = "row">
                        <div class = "col-6">${input[0][0]}</div>
                        <div class = "col-6">${input[0][1]}</div>
                    </div>
                    <div class = "row">
                        <div class = "col-6">${input[1][0]}</div>
                        <div class = "col-6">${input[1][1]}</div>
                    </div>
                </div>
                <div class = "col-6">
                    <h4>Correct Answer</h4>
                    <div class = "row">
                        <div class = "col-6">${result[0][0]}</div>
                        <div class = "col-6">${result[0][1]}</div>
                    </div>
                    <div class = "row">
                        <div class = "col-6">${result[1][0]}</div>
                        <div class = "col-6">${result[1][1]}</div>
                    </div>
                </div>
            </div>
            <div class = "row mt-3">
                <div class = "col-12">
                    ${isCorrect ? `<div class = "alert alert-success">Correct</div>` : `<div class = "alert alert-danger">Incorrect</div>`}
                </div>
            </div>
        </div>
    `

    let resultModal = new bootstrap.Modal(document.getElementById("resultModal"));
    resultModal.show();
    
    
    
}