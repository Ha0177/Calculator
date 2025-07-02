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
    return a / b;
}

let waitingForNextNumber = false;
let hasSecondNumber = false;
let number;
let numberN;
let operator;
const calculationDisplay = document.querySelector("p.calculation");
const currentDisplay = document.querySelector("p.current");
let currentCalculation = {
    firstNumber: null,
    operator: null,
    secondNumber: null
};

currentDisplay.textContent = "0";

function operate(firstNumber, secondNumber, operator) {
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    }
    if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    }
    if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    }
    if (operator === "÷") {
        return divide(firstNumber, secondNumber);
    }
}

const digitBtn = document.querySelectorAll("button.digit")
const operatorBtn = document.querySelectorAll("button.operator")
const clearBtn = document.querySelector("button.clear")
const resultBtn = document.querySelector("button.result")

digitBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (waitingForNextNumber) {
            currentDisplay.textContent = button.textContent;
            waitingForNextNumber = false;
            hasSecondNumber = true;
        } else if (currentDisplay.textContent === "0" || currentDisplay.textContent === "") {
            currentDisplay.textContent = button.textContent;
        } else {
            currentDisplay.textContent += button.textContent;
        }
    });
});



operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        const op = button.textContent;
        const operation = currentDisplay.textContent;

        if (waitingForNextNumber) {
            return;
        }
        
        if(justCalculated) {
            currentCalculation.firstNumber = parseFloat(operation);
            currentCalculation.operator = op;
            calculationDisplay.textContent = operation + " " + op;
            justCalculated = false;
            waitingForNextNumber = true;
            hasSecondNumber = false;
            return;
        }

        if (!/[+\-*÷]/.test(calculationDisplay.textContent) && /\d$/.test(operation)) {
            currentCalculation.firstNumber = parseFloat(operation);
            currentCalculation.operator = op;
            calculationDisplay.textContent = operation + " " + op;
            waitingForNextNumber = true;
            hasSecondNumber = false;
        }
    });
});

clearBtn.addEventListener("click", () => {
    currentDisplay.textContent = "0";
    calculationDisplay.textContent = "";
    waitingForNextNumber = false;
    hasSecondNumber = false;
});

let justCalculated = false;

resultBtn.addEventListener("click", () => {
    if (currentCalculation.operator && hasSecondNumber) {
        currentCalculation.secondNumber = parseFloat(currentDisplay.textContent);
        let opSymbol = currentCalculation.operator
        let result = operate(
            currentCalculation.firstNumber,
            currentCalculation.secondNumber,
            opSymbol 
        );
        calculationDisplay.textContent = `${currentCalculation.firstNumber} ${opSymbol} ${currentCalculation.secondNumber} =`;
        currentDisplay.textContent = result;
        justCalculated = true;
        hasSecondNumber = false;
    }
});
