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
    input = [[0,0],[0,0]]

    input[0][0] = document.querySelector("#a11").value
    input[0][1] = document.querySelector("#a12").value
    input[1][0] = document.querySelector("#a21").value
    input[1][1] = document.querySelector("#a22").value

    

    for (let i = 0; i< matrix1.length; i++){
        for(let j = 0; j<matrix1.length; j++){
            let left = matrix1[i][j]
            let right = matrix2[i][j]
            let total = left + right
            result[i][j] = total
        }
    }

    if (input[0][0] == result [0][0] && input[0][1] == result [0][1] &&
        input[1][0] == result [1][0] && input[1][1] == result [1][1] ){
            alert("Correct")
        }else{
            alert("Wrong")
        }
    console.log(input)
    console.log(result)
    alert(result)
    
    
    
}