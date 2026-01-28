const outerContainer = document.querySelector(".outerContainer");
const button = document.querySelector("button");
const choiceBox = document.querySelector('#customValue');
const gridChoices = document.querySelectorAll("input[name='gridSelection']");
let gridChoosen;
let option = true; // To track the whether text field or radio button has the value


// Radio buttons are unchecked if text field is selected
choiceBox.addEventListener('click', () => {
    gridChoices.forEach(gridChoice => {
        gridChoice.checked = false; 
    });
    option = true;
});

// Text field entry is limited to maximum of 100 on defocus.
choiceBox.addEventListener('blur', () => {
    if(option == true && choiceBox.value > 100) {
        choiceBox.value = 100;
    }
});

// Focusing Radio buttons deletes the text field value
gridChoices.forEach(gridChoice => {
    gridChoice.addEventListener('click', () => {
        option = false;
        choiceBox.value = '';
    }); 
});


button.addEventListener("click",() => {
    outerContainer.textContent = '';

    // Grid size taken from either Text field or Radio buttons
    if (option){
        gridChoosen = choiceBox.value; 
    } 
    else {
        gridChoosen = document.querySelector("input[name='gridSelection']:checked").value;
    }


    let dimension = 560 / gridChoosen; // Size of each small box within etcher div

    for (let i=1; i<=(gridChoosen*gridChoosen); i++) {
        let opacity = 0.1; // importance of Scope
        // Declaring within the loop allows each box to have its own opacity value to track. Setting it globally will not allow it(as it updates globally)
        let gridBox = document.createElement('div');
        gridBox.style.width = dimension + "px";
        gridBox.style.height = dimension + "px";
        outerContainer.appendChild(gridBox);
        gridBox.addEventListener('mouseover', (event) => {
            if (opacity <= 1) { 
                opacity = opacity + 0.1; //Since opacity was declared within the loop, 
                // only each loop's version of opacity variable is tracked. So each div will have different values.  
            }
            event.target.style.opacity = opacity;
        });
    }
    // Adding an eventListener to the outerContainer(so that bubbling of the event can be utilized) has some nice buggy behaviour. 
    // The whole outerContainer changes its property for no reason.
    // Sometmes, all the divs get the eventListener triggered at the same time, i.e., All of the divs within outercontainer change their property at once.
})








