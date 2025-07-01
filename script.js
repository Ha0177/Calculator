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

let number;
let numberN;
let operator;
const display = document.querySelector("p");

function operate(number, numberN, operator) {
    if (operator === "+") {
        return add(number, numberN);
    }
    if (operator === "-") {
        return subtract(number, numberN);
    }
    if (operator === "*") {
        return multiply(number, numberN);
    }
    if (operator === "/") {
        return divide(number, numberN);
    }
}

const digitBtn = document.querySelectorAll("button.digit")
const operatorBtn = document.querySelectorAll("button.operator")
const clearBtn = document.querySelector("button.clear")
const resultBtn = document.querySelector("button.result")
display.textContent = 0;

digitBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        const op = button.textContent;
        const operation = display.textContent;

        if (!/[+\-*÷]/.test(operation) && /\d$/.test(operation)) {
            display.textContent += op;
        }
    });
});

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
});

let operation = display.textContent;

resultBtn.addEventListener("click", () => {
    let operation = display.textContent;
});
