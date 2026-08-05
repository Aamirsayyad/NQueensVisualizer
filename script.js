//Important Global constants

const InputElement = document.getElementById("inputNum");  //Place where the user inputs size
const SubmitButton = document.getElementById("submit");
const ErorrDisplay = document.getElementById("error-msg");  //p holding the error message just below the input part
const BoardDisplay = document.getElementById("board");      //reference to the board container
const StartButton = document.getElementById("start-anim");
const ResetBoardButton = document.getElementById("reset-board-btn");
const QueenCountDisplay = document.getElementById("result-placeholder");  //queen count displayed on right card
const Description = document.getElementById("description"); //hints for the user
const SliderButton = document.getElementById("slider-btn"); // > button
const ResultContainer = document.getElementById("result");  //the entire right side card
const StartAnimButton = document.getElementById("start-anim");


//State Variables
let rightSideVisible = true; //boolean to check whether right side card is visible or hidden
let BoardMatrix = [];  //saves the DOM reference of each cell in all as a matrix
let CurrentQueens = []; //stores the position of currently onboard queens as [i,j]
let N = BoardMatrix.length; //stores the length of board



// EVENT LISTENERS SECTION

//Submit Button press and "Enter" keydown logic explained breifly
/*
    State explanation: if Input is same as previous N simple do nothing
    else if the input is unique from before then validate the input, change the description text,
    reset the Queens on the board and update the Queens count    
*/


//Enter Event Listener
InputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { //only trigger for "ENTER" press
        if (Number(InputElement.value) == N) {
            return;
        }
        else if (validateInput()) {
            Description.textContent = "Place All the Queens!";
            Description.classList = "desc-normal";
            QueenCountDisplay.classList = "res-normal";
            CurrentQueens = []; //reset current queens
            updateQueensCount();
        }
    }
})

//Submit Button logic
SubmitButton.addEventListener("click", () => {


    if (Number(InputElement.value) == N) return;
    else if (validateInput()) {
        Description.textContent = "Place All the Queens!";
        Description.classList = "desc-normal";
        QueenCountDisplay.classList = "res-normal";
        CurrentQueens = []; //reset current queens
        updateQueensCount();
    }
});

//Reset Button logic explained breifly
/*
    State explanation: When reset it pressed , the right side is simply changed, the attack indicators on the
    board are cleared, then the queens are removed from the board to make it like it was intially,
    CurrentQueens reference array is emptied 
    queens count is updated
*/

//Reset Button Logic
ResetBoardButton.addEventListener("click", () => {
    Description.textContent = "Place All the Queens!";
    Description.classList = "desc-normal";
    QueenCountDisplay.classList = "res-normal";
    clearQueens();
})


//Mostly Self-Explanatory
SliderButton.addEventListener("click", () => {
    rightSideVisible = !rightSideVisible; //toggle the state simply
    if (rightSideVisible) {
        ResultContainer.classList.replace("result-hidden", "result-visible");
        SliderButton.textContent = ">";
    }
    else {
        ResultContainer.classList.replace("result-visible", "result-hidden");
        SliderButton.textContent = "<";
    }
})

//Animation logic
StartAnimButton.addEventListener("click", () => {
    clearQueens();
    animate();
})

async function animate() {
    BoardDisplay.classList.toggle("board-disabled");
    await solveNQueens(0,2000);
    BoardDisplay.classList.toggle("board-disabled");
}

async function solveNQueens(rowNo,speed) {
    if (rowNo == N) {
        await delay(speed);
        return true
    }
    for (let colNo = 0; colNo < N; colNo++) {
        if (isSafeToPlace(rowNo, colNo)) {
            updateQueens(BoardMatrix[rowNo][colNo], rowNo, colNo);
            await delay(speed);
            if (await solveNQueens(rowNo + 1,speed)) {
                return true;
            }
            updateQueens(BoardMatrix[rowNo][colNo], rowNo, colNo);
        }
    }
    return false;
}

/**
 * Checks whether placing Queen on mth row and nth column is safe
 * @param {number} m 
 * @param {number} n 
 * @returns {boolean}
 */
function isSafeToPlace(m, n) {
    const DR = [[-1, 1], [-1, -1],
    [-1, 0]];
    let isSafe = true;
    DR.forEach(([dm, dn]) => {

        let i = m + dm;
        let j = n + dn;
        while (i >= 0 && j >= 0 && i < N && j < N) {
            if (BoardMatrix[i][j].classList.contains("queen")) {
                isSafe = false;
            }
            i += dm;
            j += dn;
        }
    })
    return isSafe;
}

/**
 * Generates a delay in miliseconds provided 
 * @param {number} ms 
 * @returns {Promise}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//clears on board queens and their sights
/**
 * Clears all Queens from the board
 */
function clearQueens() {
    clearAttackIndicators();
    CurrentQueens.forEach((queen) => {  //remove the queens class from all current queen cells
        BoardMatrix[queen[0]][queen[1]].classList.remove("queen");
    })
    CurrentQueens = [];  //empty queen references
    updateQueensCount();    //update the count of queens on board
}

//Calculates the number of queens on board and updates the count on the right result-card
/**
 * Updates the Current Queen Count on board
 */
function updateQueensCount() {
    QueenCountDisplay.textContent = `${CurrentQueens.length} / ${N}`;
}
// INPUT VALIDATION
/**
 * Validates user input
 * @returns {boolean}
 */
function validateInput() {  //used to Build Board only when the input is within valid range
    const value = Number(InputElement.value);
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
        StartButton.classList.replace("hide", "show");  //show the animation start button
        buildBoard();                                   //validation successful now build the board 
        return true;                                    //validation success
    }
    return false;                                       //validation failed 
}


// BUILDING BOARD
/**
 * Simply builds a fresh board
 */
function buildBoard() {
    CurrentQueens = [];                                 //clear the queen references as entire board is being cleared
    BoardDisplay.replaceChildren("");                   //clear the grid first
    BoardMatrix = [];                                   //clear the cell references

    N = Number(InputElement.value);                     //set the board size
    let str = "";
    for (let i = 0; i < N; i++) {                       //generating a template for grid css
        str = str + "50px ";
    }
    BoardDisplay.style.gridTemplateColumns = `${str}`;  //set the width of the cell
    BoardDisplay.style.gridTemplateRows = `${str}`;     //set the height of the cell
    for (let i = 0; i < N; i++) {                       //this 2D loop builds the board
        let newRow = [];                                //initate empty row
        for (let j = 0; j < N; j++) {
            const newCell = document.createElement("div");//create a new column in the row i.e a cell
            newCell.classList.add("cells");
            if ((i + j) % 2 == 0) {                     //this is used to alternate betweeen board colors
                newCell.classList.add("white");
            }
            else {
                newCell.classList.add("black");
            }
            newRow.push(newCell);                       //append the cell to the current row
            BoardDisplay.appendChild(newCell);          //append the cell to DOM to display
        }
        BoardMatrix.push(newRow);                       //push the row to the Matrix holding references
    }
    BoardDisplay.style.border = "2px solid black";      //outline
    addCellEventListeners();
}

/**
 * Adds individual EventListeners to every cell on the board
 */
function addCellEventListeners() { //add event listeners to all cells on the board
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            BoardMatrix[i][j].addEventListener("click", () => {
                updateQueens(BoardMatrix[i][j], i, j);  //clicking toggles the queen's presence
            })
        }
    }
}


/**
 * Main Driver Function
 * | Toggles Queen's State and updates the board
 * @param {Element} target 
 * @param {number} m 
 * @param {number} n 
 * @returns 
 */
function updateQueens(target, m, n) {   //validate the queens with its count and provides the toggling behaviour
    if (!target.classList.contains("queen") && CurrentQueens.length === N) { // check whether we're out of Queens
        return;
    }

    target.classList.toggle("queen");           //toggle the queen state of the currently clicked cell

    if (target.classList.contains("queen")) {   //if the cell now contains a queen then

        CurrentQueens.push([m, n]);             //add the current cell to the CurrentQueens reference array

    }
    else {

        //find the current cell in the CurrentQueens array and remove it as its no longer a queen cell
        const idx = CurrentQueens.findIndex((queen) => {
            return queen[0] === m && queen[1] === n;
        });

        if (idx !== -1) {
            CurrentQueens.splice(idx, 1); //removal part
        }

    }

    updateBoardAttacks();               //updates the Attacks by currenly present Queens

    updateQueensCount();                //self-explanatory
    QueenCountDisplay.classList = "res-normal";
    if (CurrentQueens.length === N) {   //if the queens now have reached their max check whether its a win or fail
        calculateAndDisplayResult();    //then calculate and Display the result
    }
    else if (areQueensUnderAttack()) {
        Description.textContent = "Queens Are Under Attack !";
        Description.classList = "desc-red";
    }
    else {
        Description.textContent = "Place All the Queens!";
        Description.classList = "desc-normal";
        QueenCountDisplay.classList = "res-normal";
    }
    // else {
    //     Description.textContent = "Place All the Queens!";
    // }

}

/**
 * Checks if any Queen contains the "danger" class
 * @returns {boolean}
 */
function areQueensUnderAttack() { //by simply checking whether any queen contain danger class
    let areThey = false;          //assumption
    CurrentQueens.forEach(([row, col]) => {
        if (BoardMatrix[row][col].classList.contains("danger")) {
            areThey = true;       //assumption falsified
        }
    })
    return areThey;               //return inference
}

/**
 * Clears the Board and Callsback to expandSight() for each Queen
 */
function updateBoardAttacks() {
    clearAttackIndicators();                //clear board indicators so the updated board have proper queen sights
    CurrentQueens.forEach((value) => {
        const m = value[0];
        const n = value[1];
        expandSight(m, n);                  //expand the sight of the current queen
    })
}

/**
 * Clears only the Queen's Vision
 */
function clearAttackIndicators() { //simply clears all the indicators of the board entirely
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            BoardMatrix[i][j].classList.remove("occupiedWhite");
            BoardMatrix[i][j].classList.remove("occupiedBlack");
            BoardMatrix[i][j].classList.remove("danger");
        }
    }
}

/**
 * Expand a Queen's vision (Placed on mth row and nth column) in all directions
 * @param {number} m 
 * @param {number} n 
 */
function expandSight(m, n) {   //expand the queen's sight as per chess rules (needs a bit optimization (future task))

    const DR = [[1, 1], [1, -1], [-1, 1], [-1, -1],
    [1, 0], [0, 1], [-1, 0], [0, -1]];

    DR.forEach(([dm, dn]) => {
        let i = m + dm;
        let j = n + dn;
        while (i < N && i >= 0 && j >= 0 && j < N) {
            markAttackedCells(i, j);
            i += dm;
            j += dn;
        }
    })
}

/**
 * Marks the ith row and jth column as occupied, under a queen's sight or danger
 * @param {number} i 
 * @param {number} j 
 */
function markAttackedCells(i, j) {  //simply checks whether the current cell under consideration of the queen's sight involves an empty square or another queen
    if (BoardMatrix[i][j].classList.contains("queen")) {
        BoardMatrix[i][j].classList.add("danger");
    }
    else {
        if ((i + j) % 2 == 0) {
            BoardMatrix[i][j].classList.add("occupiedWhite");
        }
        else {
            BoardMatrix[i][j].classList.add("occupiedBlack");
        }

    }

}

/**
 * Validates and Displays Result 
 */
function calculateAndDisplayResult() {
    let isSolved = !areQueensUnderAttack();
    displayRightResult(isSolved); //callback to the actuall displaying function
}

/**
 * Displays result to the right card
 * @param {boolean} isSolved 
 */
function displayRightResult(isSolved) { //self-explantory
    if (isSolved) {
        Description.textContent = "Solved! Great Job!";
        Description.classList = "desc-green";
        QueenCountDisplay.classList = "res-green";
    }
    else {
        Description.textContent = "Failed!";
        QueenCountDisplay.classList = "res-red";
        Description.classList = "desc-red";
    }
}



