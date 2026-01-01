let humanScore = 0;
let computerScore = 0;
let rounds = 5;
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

function playgame(rounds) {
    for (let i=0; i<rounds; i++) {
        getComputerChoice = randomChooser();
        getHumanChoice = prompt("Stone/Paper/Scissor?");
        getHumanChoice = getHumanChoice.toLowerCase();
        playRound(getHumanChoice, getComputerChoice);
    }
    if (humanScore > computerScore) {
        console.log("Player Wins!");
    }
    else if (computerScore > humanScore) {
        console.log("Computer wins...");
    }
    else {
        console.log("It's a draw");
    }
}

function playRound(humanChoice, computerChoice) {

    console.log("Human Choice:" + humanChoice);
    console.log("Computer Choice:" + computerChoice);

    if (humanChoice === "stone" && computerChoice === "paper"){
        console.log("Result: " + computerChoice + " beats " + humanChoice);
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "stone" && computerChoice === "scissor"){
        console.log("Result: " + computerChoice + " loses to " + humanChoice);
        humanScore = humanScore + 1;
    }
    else if (humanChoice === "paper" && computerChoice === "stone"){
        console.log("Result: " + computerChoice + " loses to " + humanChoice);
        humanScore = humanScore + 1;
    }
    else if (humanChoice === "paper" && computerChoice === "scissor"){
        console.log("Result: " + computerChoice + " beats " + humanChoice);
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "scissor" && computerChoice === "stone"){
        console.log("Result: " + computerChoice + " beats " + humanChoice);
        computerScore = computerScore + 1;
    }
    else if (humanChoice === "scissor" && computerChoice === "paper"){
        console.log("Result: " + computerChoice + " loses to " + humanChoice);
        computerScore = computerScore + 1;
    }
    else {
        console.log("It's a draw");
    }

    console.log();
    
}

playgame(rounds);
