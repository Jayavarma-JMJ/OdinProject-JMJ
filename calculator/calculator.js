let answerfield = document.querySelector('.displayFieldFinal');  // Bottom screen of Answer field
let errorfield = document.querySelector('.displayField'); // Top screen of Answer field
let buttons = document.querySelectorAll('button');
let temporaryCarrier = "";
let displayCarrier = []; // Variable for final output on the lower screen
let operators = "+-/x";
let opPress = false;
let answerReady = false; // Prevents entering digits if answer was returned. Done so that you cant add digits directly to the answer

buttons.forEach((button) => {
    button.addEventListener('click', buttonActions);
});


function buttonActions(e) {

    if(e.target.id == "clear") {
        displayCarrier.length = 0;
        answerReady = false;
        temporaryCarrier = '';
        errorfield.textContent = '';
    }

    else if(displayCarrier.length == 3 && operators.includes(e.target.id)){
        temporaryCarrier = calculation(displayCarrier);
        displayCarrier.length = 0;   // Reset the array and fill it with the answer of prior calculation
        displayCarrier.push(temporaryCarrier);
        displayCarrier.push(e.target.id);
        temporaryCarrier = '';
        answerReady = false;  
        opPress = true;
    }

    else if(displayCarrier.length < 3 && (e.target.id == '=')) { // Placeholder to prevent '=' from being printed on-screen
    }

    else if(displayCarrier.length == 3 && (e.target.id == '=')) {
        temporaryCarrier = calculation(displayCarrier);
        displayCarrier.length = 0;
        displayCarrier.push(temporaryCarrier);
        temporaryCarrier = '';
        answerReady = true;  
        opPress = false;
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

        if (temporaryCarrier.includes('.') && (e.target.id == ".")) {  // Prevent multiple decimal points in a number
            errorfield.textContent = 'Multiple decimal points not allowed';
        }
        else {
            temporaryCarrier += `${e.target.id}`;
            errorfield.textContent = '';
        }

        if(opPress == false){  // Updates the displaycarrier with the additional digits only if the previous input is a number
            displayCarrier.pop();
        }
        displayCarrier.push(temporaryCarrier);
        opPress = false; // Allows updating (using pop) when next digit is pressed
    }

    if(!operators.includes(e.target.id) && operators.includes(displayCarrier[0])) {
        displayCarrier.pop();
        if(displayCarrier[0]=='-') {  // Allows negative numbers to be entered first. 'x', '/', '+' operators are ignored.
            temporaryCarrier = `${displayCarrier[0]}${temporaryCarrier}`;
            displayCarrier[0] = temporaryCarrier;
        }
        else {
            displayCarrier[0] = temporaryCarrier;
        }
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
        return (Number(arr[0]) / Number(arr[2]);
//        return (Math.floor(Number(arr[0]) / Number(arr[2]) * 100)) / 100;  // Uncheck if higher precison is not needed
    }
}

