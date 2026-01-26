let humanScore = 0;
let computerScore = 0;
let rounds = 5;
let roundsOver = 0;
let getHumanChoice;
let getComputerChoice;

function randomChooser() {
    let roll = ((Math.random()*100) - 1)
    if (roll > 32){
        if (roll > 65) {
            return "scissor";
        }
        return "paper";
    }
    else {
        return "stone";
    }
}

function playGame() {
    getComputerChoice = randomChooser();
    playRound(getHumanChoice, getComputerChoice);
    roundsOver++;
}

function playRound(humanChoice, computerChoice) {

    console.log("Human Choice:" + humanChoice);
    console.log("Computer Choice:" + computerChoice);

    if (humanChoice === "stone" && computerChoice === "paper"){
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "stone" && computerChoice === "scissor"){
        humanScore = humanScore + 1;
    }
    else if (humanChoice === "paper" && computerChoice === "stone"){
        humanScore = humanScore + 1;
    }
    else if (humanChoice === "paper" && computerChoice === "scissor"){
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "scissor" && computerChoice === "stone"){
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "scissor" && computerChoice === "paper"){
        computerScore = computerScore + 1;
    }
    else {
    }
    roundResult.textContent = `Result : Human chose ${humanChoice} vs Computer's ${computerChoice}`;
    playerScoreBoard.textContent = `You : ${humanScore}`;
    computerScoreBoard.textContent = `Computer : ${computerScore}`;
}

const stone = document.createElement('button');
stone.textContent = 'Stone';
stone.value = 'stone';

const paper = document.createElement('button');
paper.textContent = 'Paper';
paper.value = 'paper';

const scissors = document.createElement('button');
scissors.textContent = 'Scissor';
scissors.value = 'scissor';

const roundResult = document.createElement('div');
roundResult.textContent = 'Result:';

const scoreBoard = document.createElement('div');
const playerScoreBoard = document.createElement('div');
const computerScoreBoard = document.createElement('div');
const finalResult = document.createElement('div');

scoreBoard.appendChild(playerScoreBoard);
scoreBoard.appendChild(computerScoreBoard);

document.body.appendChild(stone);
document.body.appendChild(paper);
document.body.appendChild(scissors);
document.body.appendChild(roundResult);
document.body.appendChild(scoreBoard);
document.body.appendChild(finalResult);

const buttonList = document.querySelectorAll('button');
buttonList.forEach((button) => {
    button.addEventListener('click', ()=> {
        if (roundsOver === 1){
            finalResult.textContent = '';
        }

        getHumanChoice = button.value;
        playGame();

        if (roundsOver === rounds) {
            if (humanScore > computerScore) {
                finalResult.textContent = 'You Win!';
            }
            else if (computerScore > humanScore) {
                finalResult.textContent = 'Computer Wins';
            }
            else {
                finalResult.textContent = "It's a Draw";
            }
            humanScore = 0;
            computerScore = 0;
            roundsOver = 1;
        }

    });
});



