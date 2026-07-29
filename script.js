const InputElement = document.getElementById("inputNum");
const SubmitButton = document.getElementById("submit");
const ErorrDisplay = document.getElementById("error-msg");
const BoardDisplay = document.getElementById("board");
const StartButton = document.getElementById("start-anim");
let BoardMatrix = [];
let CurrentQueens=[];
let N = BoardMatrix.length;

//Enter Event Listener
InputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        validateInput();
    }
})

//Submit Button logic
SubmitButton.addEventListener("click", () => {
    validateInput();
})

//input validation
function validateInput() {
    const value = InputElement.value;
    if (value <= 3) {
        ErorrDisplay.textContent = "Solution Doesn't Exist!";
        StartButton.classList.replace("show", "hide");
    }
    else if (value > 10) {
        StartButton.classList.replace("show", "hide");
        ErorrDisplay.textContent = "Thinking Capacity exceeded!";
    }
    else {
        ErorrDisplay.textContent = "";
        StartButton.classList.replace("hide", "show");
        buildBoard();
    }
}

//build the inital board
function buildBoard() {
    BoardDisplay.replaceChildren("");
    BoardMatrix = [];
    CurrentQueens=[];
    const n = InputElement.value;
    let str = "";
    for (let i = 0; i < n; i++) {
        str = str + "50px ";
    }
    BoardDisplay.style.gridTemplateColumns = `${str}`;
    BoardDisplay.style.gridTemplateRows=`${str}`;
    for (let i = 0; i < n; i++) {
        let newRow = [];
        for (let j = 0; j < n; j++) {
            const newCell = document.createElement("div");
            newCell.classList.add("cells");
            if ((i + j) % 2 == 0) {
                newCell.classList.add("white");
            }
            else {
                newCell.classList.add("black");
            }
            newRow.push(newCell);
            BoardDisplay.appendChild(newCell);
        }
        BoardMatrix.push(newRow);
    }
    BoardDisplay.style.border = "2px solid black";
    N = BoardMatrix.length;
    addCellEventListeners();
    console.log(BoardMatrix);
}

function addCellEventListeners() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            addQueenToggleListener(BoardMatrix[i][j], i, j);
        }
    }
}

function addQueenToggleListener(target, m, n) {
    target.addEventListener("click", (event) => {
        queenSight(target, m, n);
    })
}

function queenSight(target, m, n) {
    target.classList.toggle("queen");
    if (target.classList.contains("queen")) {
        CurrentQueens.push([m,n]);
        // isOccupied(true, m, n);
    }
    else {
        const idx=CurrentQueens.findIndex((queen)=>{
            return queen[0]===m && queen[1]===n;
        });
        if(idx!==-1){
            CurrentQueens.splice(idx,1);
        }
        // isOccupied(false, m, n);
    }
    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            BoardMatrix[i][j].classList.remove("occupiedWhite");
            BoardMatrix[i][j].classList.remove("occupiedBlack");
            BoardMatrix[i][j].classList.remove("danger");
        }
    }
    CurrentQueens.forEach((value)=>{
        const m=value[0];
        const n=value[1];
        isOccupied(m,n);
        console.log(BoardMatrix);
    })

}

function isOccupied( m, n) { //flag: A boolean for presence of queen ,(m,n): position of cell

    let i = m + 1;
    let j = n + 1;
    //expand bottom right diagonally
    while (i < N && j < N) {
        validateFlag( i, j);
        i++;
        j++;

    }
    i = m - 1;
    j = n - 1;

    //expand top left diagonally
    while (i >= 0 && j >= 0) {
        validateFlag(i, j);
        i--;
        j--;
    }

    i = m - 1;
    j = n + 1;
    //expand top right diagonally
    while (i >= 0 && j < N) {
        validateFlag(i, j);
        i--;
        j++;
    }

    i = m + 1;
    j = n - 1;
    //expand  bottom left diagonally
    while (i < N && j >= 0) {
        validateFlag( i, j);
        i++;
        j--;
    }

    i = m + 1;
    j = n;
    //expand vertically downwards
    while (i < N) {
        validateFlag( i, j);
        i++;
    }

    i = m - 1;
    j = n;
    //expand vertically upwards
    while (i >= 0) {
        validateFlag( i, j);
        i--;
    }

    i = m;
    j = n - 1;
    //expand horizontally left
    while (j >= 0) {
        validateFlag( i, j);
        j--;
    }

    i = m;
    j = n + 1;
    //expand horizontally right
    while (j < N) {
        validateFlag( i, j);
        j++;
    }
}

function validateFlag(i, j) {
    if(BoardMatrix[i][j].classList.contains("queen")){
        BoardMatrix[i][j].classList.add("danger");
    }
    else  {
        if ((i + j) % 2 == 0) {
            BoardMatrix[i][j].classList.add("occupiedWhite");
        }
        else {
            BoardMatrix[i][j].classList.add("occupiedBlack");
        }

    }
    // else {
    //     if ((i + j) % 2 == 0) {
    //         BoardMatrix[i][j].classList.remove("occupiedWhite");
    //     }
    //     else {
    //         BoardMatrix[i][j].classList.remove("occupiedBlack");
    //     }
    // }

}