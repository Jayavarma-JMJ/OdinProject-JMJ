const player = (() => {

    let playerOne = {};
    playerOne.name = "Player 1";
    playerOne.symbol = 'X';
    playerOne.score = 0;
    let playerTwo = {};
    playerTwo.name = "Player 2";
    playerTwo.symbol = 'O';
    playerTwo.score = 0;
    const playerOneNameInput = document.querySelector('.playerOneNameInput');
    const playerTwoNameInput = document.querySelector('.playerTwoNameInput');
    const playerOneName = document.querySelector('.playerOneName');
    const playerTwoName = document.querySelector('.playerTwoName');
    const playerOneScore = document.querySelector('.playerOneScore');
    const playerTwoScore = document.querySelector('.playerTwoScore');

    playerOneName.innerText = playerOne.name;
    playerTwoName.innerText = playerTwo.name;

    playerOneNameInput.addEventListener('input', (e) => {
        playerOneName.innerText = e.target.value;
        playerOne.name = e.target.value
    })

    playerTwoNameInput.addEventListener('input', (e) => {
        playerTwoName.innerText = e.target.value;
        playerTwo.name = e.target.value;
    })

    const upPlayerOneScore = () => {
        playerOne.score++;
        player.updateScoreBoard();
    };

    const upPlayerTwoScore = () => {
        playerTwo.score++;
        player.updateScoreBoard();
    };

    function updateScoreBoard() {
        playerOneScore.innerText = playerOne.score;
        playerTwoScore.innerText = playerTwo.score;
    }

    function scoreReset(){
        playerOne.score = 0;
        playerTwo.score = 0;
        player.updateScoreBoard();
    }

    const getPlayerOneName = () => playerOne.name;
    const getPlayerTwoName = () => playerTwo.name;
    const getPlayerOneScore = () => playerOne.score;
    const getPlayerTwoScore = () => playerTwo.score;
    const getPlayerOneSymbol = () => playerOne.symbol;
    const getPlayerTwoSymbol = () => playerTwo.symbol;

    return {getPlayerOneName,getPlayerOneScore,upPlayerOneScore,getPlayerTwoName,getPlayerTwoScore,upPlayerTwoScore,getPlayerOneSymbol,getPlayerTwoSymbol,scoreReset,updateScoreBoard};
})();


const board = (() => {

    const boardSizeEle = document.querySelector('.boardSize');
    const lengthToWinEle = document.querySelector('.lengthToWin');
    const redrawBoard = document.querySelector('.redraw');
    let boardSize = 3;
    let lengthToWin = 3;
    let boardMax = boardSizeEle.max;

    boardSizeEle.addEventListener('input', (e) => {  
        // console.log(`boardMax is ${boardMax}`)
        boardSize = parseInt(e.target.value);
        // console.log(`Entered size is ${boardSize}`);
        if (boardSize > boardMax) {
            boardSizeEle.value = boardMax;
            boardSize = boardMax;
            // console.log(`Resized size is ${boardSize}`);
        }
    })

    lengthToWinEle.addEventListener('input', (e) => {
        lengthToWin = parseInt(e.target.value);

        if (Number.isNaN(lengthToWin)) {
            lengthToWin = 3;
            lengthToWinEle.value = 3;
        }

        if (lengthToWin > boardSize && lengthToWin !== 3) {
            lengthToWinEle.value = boardSize;
            lengthToWin = boardSize;
        }

        // console.log(lengthToWin);
    })

    function getBoardSize() {
        return boardSize;
    }

    function getLengthToWin() {
        return lengthToWin;
    }

    let cells = [];
    const boardElement = document.querySelector('.board');
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
        console.log('reset pressed');
        resetBoard(true);
    });

    function resetBoard(complete) {
        if(complete === true){
            player.scoreReset();
        }
        cells = [];
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 30px)`;
        boardElement.style.gridTemplateRows = `repeat(${boardSize}, 30px)`;
        for(let i=0; i < boardSize ; i++){
            cells[i] = [];
            for(let j=0; j < boardSize; j++){
                let cell = document.createElement('button');
                cell.addEventListener('click', setSymbol);
                cell.XID = i;
                cell.YID = j; 
                cells[i][j] = cell; 
                //append element from last item in array
                boardElement.appendChild(cells[i][j]);
            }   
        }
    }
    resetBoard();

    function getAllCells() {
        return cells;
    }

    function getCellSymbol(x,y){
        return cells[x][y].symbol;
    }

    function setSymbol(e) {
        cell = e.target;
        let symbol = turnController.turnChange();
        turnController.turnAnnouncement();
        cell.innerText = symbol;
        cell.symbol = symbol;
        cell.removeEventListener('click', setSymbol);
        turnController.upTurnCounter();
        matchChecker(cell.XID, cell.YID, cell.symbol);
    }

    function stopGame(){
        board.getAllCells().forEach((cellRow) => {
            cellRow.forEach((cell) => {
                cell.removeEventListener('click', setSymbol);
            });
        });
    }

    redrawBoard.addEventListener('click', () => {
        board.resetBoard(true);
    });

    return {resetBoard,getAllCells,getCellSymbol,stopGame,getLengthToWin,getBoardSize};
})();



const turnController = (() => {
    let tracker = 1;
    let turnCounter = 0;
    let boardSize;

    // function searchBoardSize(){
        
    // }

    function upTurnCounter(){
        boardSize = board.getBoardSize();
        turnCounter++;
        // console.log(turnCounter);
        if(turnCounter === (boardSize * boardSize)){
            gameEnd(null);
        }
    }

    function resetTurnCounter(){
        turnCounter = 0;
    }

    function turnChange() {
        let symbol = tracker === 1? player.getPlayerOneSymbol() : player.getPlayerTwoSymbol();
        tracker = tracker === 0 ? 1 : 0;
        return symbol;
    }

    function resetTracker(){
        tracker = 1;
    }

    const announcement = document.querySelector('.announcement');

    function turnAnnouncement() {
        announcement.innerText = tracker === 1? `${player.getPlayerOneName()}'s turn` : `${player.getPlayerTwoName()}'s turn`;
    }

    function winnerAnnouncement(winner) {
            announcement.innerText = `${winner} wins!!`;
    }

    
    return {turnChange,turnAnnouncement,winnerAnnouncement,upTurnCounter,resetTurnCounter,resetTracker};
})();

function matchChecker(x,y, symbol) {

    let lengthToWin = board.getLengthToWin();
    // console.log(`Length to win is ${lengthToWin}`);
    let columncounter = 0;
    let rowcounter = 0;
    let forwardDiagcounter = 0;
    let backwardDiagcounter = 0;
    let cells = board.getAllCells();


    // column check
    for(let i=x+1, j=x-1, k=1; k < cells.length ; i++, j--, k++) {
        
        if((i >= cells.length || (board.getCellSymbol(i,y) !== symbol)) && (j < 0 ||(board.getCellSymbol(j,y) !== symbol))){
            break;
        }
        console.log(`cells[${x},${y}] compared with cells[${i},${y}]`);
        
        if(i < cells.length){
            if(board.getCellSymbol(i,y) === symbol){
                
                columncounter = columncounter + 1;
                console.log(`Match! Counter is ${columncounter}`);
            }   
        }
        console.log(`cells[${x},${y}] compared with cells[${j},${y}]`);
        if(j >= 0 && j!==x){
            if(board.getCellSymbol(j,y) === symbol) {
                columncounter = columncounter + 1;
                console.log(`Match! Counter is ${columncounter}`);
            }
            
        }
        
        
        // if(i < board.getAllCells().length){
        //     console.log(`cells[${x},${y}] compared with cells[${i}${y}]`);
        //     // if(cells[i][y].symbol !== symbol){
        //     if(board.getCellSymbol(i,y) !== symbol){
        //         break;
        //     }
        //     columncounter = columncounter + 1;
        // }

        // if(j >= 0){
        //     // if(cells[j][y].symbol !== symbol){
        //     console.log(`cells[${x},${y}] compared with cells[${j}${y}]`);
        //     if(board.getCellSymbol(j,y) !== symbol){
        //         break;
        //     }
        //     columncounter = columncounter + 1;
        // } 

        if(columncounter === (lengthToWin - 1)) {
            gameEnd(symbol);
            console.log('Winner');
            return null;
        }
    }

    // row check
    for(let i=y+1, j=y-1, k=1; k < cells.length; i++, j--, k++) {
        
        if(i < board.getAllCells().length){
            // if(cells[x][i].symbol !== symbol){
            if(board.getCellSymbol(x,i) !== symbol){
                break;
            }
            rowcounter = rowcounter + 1;
        }

        if(j >= 0){
            // if(cells[x][j].symbol !== symbol){
            if(board.getCellSymbol(x,j) !== symbol){
                break;
            }
            rowcounter = rowcounter + 1;
        } 
        if(rowcounter === (lengthToWin - 1)) {
            gameEnd(symbol);
            console.log('Winner');
            return null;
        }
    }


    // '\' diagonal check
    for(let i=1; i <= board.getAllCells().length; i++) {

        if( (x+i < board.getAllCells().length) && (y+i < board.getAllCells().length)){
            // if(cells[x+i][y+i].symbol !== symbol){
            if(board.getCellSymbol(x+i,y+i) !== symbol){
                break;
            }
            else {
                backwardDiagcounter = backwardDiagcounter + 1;
            }
        }

        if((x-i >= 0) && (y-i >= 0)) {
            // if(cells[x-i][y-i].symbol !== symbol){
            if(board.getCellSymbol(x-i,y-i) !== symbol){
                break;
            }
            else {
                backwardDiagcounter = backwardDiagcounter + 1;
            }
        }
        
        if(backwardDiagcounter === (lengthToWin - 1)) {
            gameEnd(symbol);
            console.log('Winner');
            return null;
        }
    }


    // '/' diagonal check
    for(let i=1; i <= board.getAllCells().length; i++) {

        if((x-i >= 0) && (y+i < board.getAllCells().length)){
            // if(cells[x-i][y+i].symbol !== symbol){
            if(board.getCellSymbol(x-i,y+i) !== symbol){
                break;
            }
            else {
                forwardDiagcounter = forwardDiagcounter + 1;
            }
        }

        if((x+i < board.getAllCells().length) && (y-i >= 0)) {
            // if(cells[x+i][y-i].symbol !== symbol){
            if(board.getCellSymbol(x+i,y-i) !== symbol){
                break;
            }
            else {
                forwardDiagcounter = forwardDiagcounter + 1;
            }
        }
        
        if(forwardDiagcounter === (lengthToWin - 1)) {
            gameEnd(symbol);
            console.log('Winner');
            return null;
        }
    }


}


function gameEnd(symbol) {
    // board.getAllCells().forEach((cellRow) => {
    //     cellRow.forEach((cell) => {
    //         cell.removeEventListener('click', setSymbol);
    //     });
    // });
    board.stopGame();
    turnController.resetTurnCounter();

    let winningPlayer;
    const dialog = document.querySelector('.dialog');
    const dialogText = document.querySelector('.dialogText');
    const dialogCloseButton = document.querySelector('.dialogCloseButton');

    if(player.getPlayerOneSymbol() === symbol){
        winningPlayer = player.getPlayerOneName();
        player.upPlayerOneScore();
        dialogText.innerText = `${winningPlayer} wins!!`;
    } 
    else if (player.getPlayerTwoSymbol() === symbol) {
        winningPlayer = player.getPlayerTwoName();
        player.upPlayerTwoScore();
        dialogText.innerText = `${winningPlayer} wins!!`;
    }
    else {
        winningPlayer = "Nobody";
        dialogText.innerText = "Stalemate";
    }
    
    turnController.winnerAnnouncement(winningPlayer);
    dialog.showModal();

    dialogCloseButton.addEventListener('click', () => {
        dialog.close();
        turnController.resetTracker();
        board.resetBoard();
        turnController.turnAnnouncement();
    });
}
