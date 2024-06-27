let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#resetbtn");
let newGameBtn=document.querySelector("#newBtn");
let messageCont=document.querySelector(".mes-container");
let message=document.querySelector("#mess");


let count=0;
const draw=()=>{
    if(count==9){
        message.innerText="Opps! Match draw";
        messageCont.classList.remove("hide");
        disableBoxes();
    }
}



let turn0=true;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]; 

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="O";
            box.style.color="black";  
            turn0=false;
        }else{
            box.innerText="X";
            box.style.color="red"; 
            turn0=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
        if(count===9 && !checkWinner()){
            draw();
        }
    });
})

const checkWinner=(count)=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}


let showWinner=(winner)=>{
    message.innerText=`Congratulations! Winner is ${winner}`;
    messageCont.classList.remove("hide");
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}


const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame=()=>{
    enableBoxes();
    count=0;
    turn0=true;
    messageCont.classList.add("hide");
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);