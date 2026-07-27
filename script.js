const InputElement = document.getElementById("inputNum");
const SubmitButton=document.getElementById("submit");
const ErorrDisplay=document.getElementById("error-msg");
const BoardDisplay=document.getElementById("board");
let BoardMatrix=[];





InputElement.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        validateInput();
    }
})

SubmitButton.addEventListener("click",()=>{
    validateInput();
})

function validateInput(){
    const value=InputElement.value;
    if(value<=3){
        ErorrDisplay.textContent="Solution Doesn't Exist!";
    }
    else if(value>10){
        ErorrDisplay.textContent="Thinking Capacity exceeded!";
    }
    else{
        ErorrDisplay.textContent="";
        buildBoard();
    }
}



function buildBoard(){
    BoardDisplay.replaceChildren("");
    BoardMatrix=[];
    const n=InputElement.value;
    let str="";
    for(let i=0;i<n;i++){
        str=str+"50px ";
    }
    BoardDisplay.style.gridTemplateColumns=`${str}`;
    for(let i=0;i<n;i++){
        let newRow=[];
        for(let j=0;j<n;j++){
            const newCell=document.createElement("div");
            newCell.classList.add("cells");
            if((i+j)%2==0){
                newCell.classList.add("white");
            }
            else{
                newCell.classList.add("black");
            }
            newRow.push(newCell);
            BoardDisplay.appendChild(newCell);
            
        }
        BoardMatrix.push(newRow);
    }
    BoardDisplay.style.border="2px solid black";
    console.log(BoardMatrix);
}