function findBestMove(board){
    let move = null;
    let bestScore = -Infinity;
    for(let i=0; i<3;i++){
        for(let j=0; j<3; j++){
            if (board[i][j] === 0){
                board[i][j] = "O";
               let score = minimax(board, false);
               console.log("minimax = ", score);
               board[i][j] = 0; //undo the move
               if(score > bestScore){
                   bestScore = score;
                   move = String(i + "," +j);
               }

            }
        }
    }
    return move;
}

let scores = {
    X: -10,
    O: 10,
    Draw: 0
};

function minimax (board, isMaximzingPlayer){
   
    let win = checkWin(board);
    if(win !== false){
        return scores[win];
    }

    if (isMaximzingPlayer){
       let bestScore = -Infinity;
    
        for(let i=0; i<3;i++){
            for(let j=0; j<3; j++){
                if (board[i][j] === 0){
                
                    board[i][j] = "O";
                    let score = minimax(board, false);
                    board[i][j] = 0; //undo the move
                    // if(score > bestScore){
                    //     bestScore = score;
                    // }else if (score < bestScore){
                    //     bestScore = bestScore;
                    // }
                    bestScore = Math.max(score, bestScore); 
                    
                }
            }
       }
       return bestScore;
    }else{

        let bestScore = Infinity;
    
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if (board[i][j] === 0){
                
                    board[i][j] = "X";
                    let score =  minimax(board, true);
                    board[i][j] = 0; //undo the move
                    // if(score < bestScore){
                    //     bestScore = score;
                    // }else if (score > bestScore){
                    //     bestScore = bestScore;
                    // }
                    bestScore = Math.min(score,bestScore);
                }
            }
       }
       return bestScore;

    }
    
}


