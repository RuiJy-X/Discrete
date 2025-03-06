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
                let randomNumber = Math.floor(Math.random()*51) -10;
                matrix1[i][j] = randomNumber;
                matrixHTML += `<div class = "col-6 text-center">${randomNumber}</div>`
            }
            matrixHTML += `</div>`
        }
        console.log(matrix1)
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