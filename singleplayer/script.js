const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement =  document.getElementById("winning-message");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn = false;
let arrayboard = [[0,0,0],[0,0,0],[0,0,0]];

startGame();


restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessageTextElement.innerText = '';
    winningMessageElement.classList.remove('show');
    arrayboard = [[0,0,0],[0,0,0],[0,0,0]];
    setBoardHoverClass();
}

function handleClick(e){
    // player move updated in array and display
    const cell = e.target;
    if(!cell.classList.contains(CIRCLE_CLASS)){
    let a = cell.id.split(',');
    console.log("cell: ",a);
    arrayboard[a[0]][a[1]] = "X";
    console.log(arrayboard);
    placeMark(cell, X_CLASS);
    // checking for winner/draw
    let winner = checkWin(arrayboard);
    console.log("winner:  ",winner)
    if (winner === "X" || winner ===  "O"){
        endgame(winner);
    }else if (winner === "Draw"){
        endgame("Draw");
    }else{
        computerMove(); // computer makes a move
        // checks for winner/draw again 
        winner = checkWin(arrayboard);
        if (winner === "x" || winner ===  "O"){
            endgame(winner);
        }else if (winner === "Draw"){
            endgame("Draw");
        }   
    }
}
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function endgame(whoWon){
    if (whoWon === "Draw"){
        winningMessageTextElement.innerText = "Draw";
    }else{
        winningMessageTextElement.innerText = `${whoWon} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function computerMove(){ 
    // let randomNumber = Math.floor(Math.random() * 8);
    // if (cellElements[randomNumber].classList.contains(X_CLASS)){
    //     computerMove();
    // }else if (cellElements[randomNumber].classList.contains(CIRCLE_CLASS)){
    //     computerMove();
    // }else{
    //     // cellElements[randomNumber].classList.add(CIRCLE_CLASS);
    //     placeMark(cellElements[randomNumber], CIRCLE_CLASS);
    //     let b = cellElements[randomNumber].id.split(',');
    //     arrayboard[b[0]][b[1]] = 'O'
    // }
    let randomNumber = findBestMove(arrayboard);
    console.log("random number =",randomNumber);
    let arr = [[0,1,2],[3,4,5],[6,7,8]];
    let b = randomNumber.split(',');
    console.log("arr number =",arr[b[0]][b[1]]);
    placeMark(cellElements[arr[b[0]][b[1]]], CIRCLE_CLASS);
    // let b = cellElements[randomNumber].id.split(',');
    arrayboard[b[0]][b[1]] = 'O';
}

function setBoardHoverClass(){ // implement chose between X & O for user
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(arrayboard){

    // Horizontal
    for(let i =0;i<3;i++){
        if (arrayboard[i][0] === arrayboard[i][1] && arrayboard[i][1] === arrayboard[i][2] && arrayboard[i][0] !== 0){
            return arrayboard[i][0];
        }
    }
    // veritical
    for(let i =0;i<3;i++){
        if (arrayboard[0][i] === arrayboard[1][i] && arrayboard[1][i] === arrayboard[2][i] && arrayboard[0][i] !== 0){
            return arrayboard[0][i];
        }
    }
    // dignal
    if (arrayboard[0][0] === arrayboard[1][1] && arrayboard[1][1] === arrayboard[2][2] && arrayboard[0][0] !== 0){
        return arrayboard[0][0];
    }
    if (arrayboard[0][2] === arrayboard[1][1] && arrayboard[1][1] === arrayboard[2][0] && arrayboard[0][2] !== 0){
        return arrayboard[0][2];
    }
    // check draw
    if ( !(arrayboard[0].includes(0) || arrayboard[1].includes(0) || arrayboard[2].includes(0))){
        return "Draw";
    }
    return false;
}