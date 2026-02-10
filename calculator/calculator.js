function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return (Math.floor(num1 / num2 * 100)) / 100;
}

let answerfield = document.querySelector('.displayField');  // Bottom screen of Answer field
let answerfieldFinal = document.querySelector('.displayFieldFinal'); // Top screen of Answer field
let buttons = document.querySelectorAll('button');
let temporaryCarrier = "";
let displayCarrier = []; // Variable for final output on the lower screen
let operators = "+-/x";
let opPress = false;
let answerReady = false; // Prevents entering digits if answer was returned. Done so that you cant add digits directly to the answer

buttons.forEach((button) => {
    button.addEventListener('click', buttonActions);
});

/*
function buttonActions(e) {
    if(operators.includes(e.target.id)) {  // check if the input is an operator
        console.log(displayCarrier);

        if(displayCarrier.length == 3){  // Limit the number of items on the lower line and perform the operation
            console.log("limit reach");
            temporaryCarrier = calculation(displayCarrier, e.target.id);
            displayCarrier.length = 0;
            displayCarrier.push(temporaryCarrier);
            console.log(displayCarrier);
        }
        displayCarrier.push(e.target.id);
        temporaryCarrier = '';
    }
    else {
        temporaryCarrier += `${e.target.id}`; // Appends numbers to itself until operators are selected
        if(!(operators.includes(temporaryCarrier[-1]))) {
        console.log(displayCarrier.pop());
        }
        displayCarrier.push(temporaryCarrier);
    }
    answerfield.textContent = displayCarrier.join(" ");
}
*/

function buttonActions(e) {
    if(displayCarrier.length == 3 && operators.includes(e.target.id)){
        temporaryCarrier = calculation(displayCarrier);
        displayCarrier.length = 0;
        displayCarrier.push(temporaryCarrier);
        displayCarrier.push(e.target.id);
        temporaryCarrier = '';
        answerReady = false;  
        opPress = true;
    }
    else if(operators.includes(e.target.id)) {
        if(operators.includes(displayCarrier.at(-1))) {  // Replace the operator if another operator is selected in succession
            displayCarrier.pop();
        }
        displayCarrier.push(`${e.target.id}`);
        temporaryCarrier = '';
        opPress = true; // Prevents popping of operator from displaycarrier array
        answerReady = false;
    }
    else if(!operators.includes(e.target.id) && answerReady == false) {
        temporaryCarrier += `${e.target.id}`;
        if(opPress == false){  // Updates the displaycarrier with the additional digits only if the previous input is a number
            displayCarrier.pop();
        }
        displayCarrier.push(temporaryCarrier);
        opPress = false; // Allows updating (using pop) when next digit is pressed
    }
    answerfield.textContent = displayCarrier.join(" ");
}


function calculation(arr){
    switch (arr[1]) {
        case '+':
        return Number(arr[0]) + Number(arr[2]);

        case '-':
        return Number(arr[0]) - Number(arr[2]);

        case 'x':
        return Number(arr[0]) * Number(arr[2]);

        case '/':
        return Number(arr[0]) / Number(arr[2]);
    }
}

//[a,+,b]
