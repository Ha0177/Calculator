function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        alert("Error: Division by zero");
        return null;
    }
    return a / b;
}

// State flags
let waitingForNextInput = false; // True after operator is pressed, waiting for next number
let hasSecondOperand = false;    
let justCalculated = false;   
let hasDecimalPoint = false;   // True after result is shown
let hasReplaced = false;

// DOM elements
const calculationLine = document.querySelector("p.calculation"); 
const mainDisplay = document.querySelector("p.current");         // Shows the current number/result

// current calculation state
let calculation = {
    firstOperand: null,
    operator: null,
    secondOperand: null
};

mainDisplay.textContent = "0";

// Main operate function
function operate(a, b, operator) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "÷": return divide(a, b);
        default: return b;
    }
}

// Button selectors
const digitButtons = document.querySelectorAll("button.digit");
const operatorButtons = document.querySelectorAll("button.operator");
const clearButton = document.querySelector("button.clear");
const equalsButton = document.querySelector("button.result");
const decimalButton = document.querySelector("button.decimal");
const deleteButton = document.querySelector("button.delete");

// digit button clicks
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (waitingForNextInput) {
            mainDisplay.textContent = button.textContent;
            waitingForNextInput = false;
            hasSecondOperand = true;
        } else if (mainDisplay.textContent === "0" || mainDisplay.textContent === "") {
            // Replace leading zero
            mainDisplay.textContent = button.textContent;
        } else {
            mainDisplay.textContent += button.textContent;
        }

        // Replace result if digit is pressed
        if (justCalculated && !hasReplaced) {
            mainDisplay.textContent = "";
            hasReplaced = true;
            mainDisplay.textContent += button.textContent;
        }
    });
});

// operator button clicks
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const operator = button.textContent;
        const currentValue = mainDisplay.textContent;

        // use result as first operand
        if (justCalculated) {
            calculation.firstOperand = parseFloat(currentValue);
            calculation.operator = operator;
            calculationLine.textContent = `${currentValue} ${operator}`;
            justCalculated = false;
            waitingForNextInput = true;
            hasSecondOperand = false;
            return;
        }

        // Prevent multiple operators
        if (!/[+\-*÷]/.test(calculationLine.textContent) && /\d$/.test(currentValue)) {
            calculation.firstOperand = parseFloat(currentValue);
            calculation.operator = operator;
            calculationLine.textContent = `${currentValue} ${operator}`;
            waitingForNextInput = true;
            hasSecondOperand = false;
        }

        // Chaining calculation logic
        if (calculation.operator && hasSecondOperand) {
            calculation.secondOperand = parseFloat(mainDisplay.textContent);
            let result = operate(
                calculation.firstOperand,
                calculation.secondOperand,
                calculation.operator
            );
            result = parseFloat(result.toFixed(2)); 
            calculationLine.textContent = `${result} ${operator}`;
            mainDisplay.textContent = result;
            calculation.firstOperand = result;
            calculation.operator = operator;
            waitingForNextInput = true;
            hasSecondOperand = false;
            justCalculated = false;
            hasDecimalPoint = false;
            return;
        }
    });
});

clearButton.addEventListener("click", () => {
    mainDisplay.textContent = "0";
    calculationLine.textContent = "";
    waitingForNextInput = false;
    hasDecimalPoint = false;
    hasSecondOperand = false;
    justCalculated = false;
    calculation = {
        firstOperand: null,
        operator: null,
        secondOperand: null
    };
});

equalsButton.addEventListener("click", () => {
    if (calculation.operator && hasSecondOperand) {
        calculation.secondOperand = parseFloat(mainDisplay.textContent);
        let result = operate(
            calculation.firstOperand,
            calculation.secondOperand,
            calculation.operator
        );
        result = parseFloat(result.toFixed(2)); 
        calculationLine.textContent = `${calculation.firstOperand} ${calculation.operator} ${calculation.secondOperand} =`;
        mainDisplay.textContent = result;
        justCalculated = true;
        hasSecondOperand = false;
        hasDecimalPoint = false;
    }
});

decimalButton.addEventListener("click", () => {
    if (!mainDisplay.textContent.includes(".")) {
        mainDisplay.textContent += decimalButton.textContent; 
        hasDecimalPoint = true;
    }
});

deleteButton.addEventListener("click", () => {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    if (mainDisplay.textContent.length === 0) {
        mainDisplay.textContent = "0";
    }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Prevent browser zoom 
    if ((event.ctrlKey || event.metaKey || event.shiftKey) &&
        (key === "+" || key === "-" || key === "=" || key === "0")) {
        event.preventDefault();
    }

    // Digits
    if (/\d/.test(key)) {
        document.querySelector(`button.digit:nth-child(${parseInt(key) + 1})`).click();
        return;
    }

    if (key === "+") document.querySelector("button.operator:nth-child(1)").click();
    if (key === "-") document.querySelector("button.operator:nth-child(2)").click();
    if (key === "*") document.querySelector("button.operator:nth-child(3)").click();
    if (key === "/" || key === "÷") document.querySelector("button.operator:nth-child(4)").click();

    if (key === ".") decimalButton.click();

    if (key === "Enter" || key === "=") equalsButton.click();

    if (key === "Escape" || key.toLowerCase() === "c") clearButton.click();

    if (key === "Backspace") deleteButton.click();
});

