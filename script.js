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

digitBtn.forEach((button) => {
    button.addEventListener("click", () => {
        display.textContent += button.textContent;
    });
});