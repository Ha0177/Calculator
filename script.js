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
