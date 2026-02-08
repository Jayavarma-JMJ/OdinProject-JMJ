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

let answerfield = document.querySelector('.displayField');
let buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', buttonActions);
});

function buttonActions(e) {
    answerfield.textContent = e.target.id;
    console.log(e.target.id);
}

//[a,+,b]

