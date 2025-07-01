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

digitBtn.forEach((button) => {
    button.addEventListener("click", () => {
        display.textContent += button.textContent;
    });
});

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
    const op = button.textContent;
    const operation = display.textContent;
    const lastChar = operation.slice(-1);

    if (operation === "") {
        if (op === "-") {
            display.textContent += op;
        }
    } else if (/\d/.test(lastChar)) {
        display.textContent += op;
    }
    });
});

clearBtn.addEventListener("click", () => {
    display.textContent = "";
});

let operation = display.textContent;

resultBtn.addEventListener("click", () => {
    let operation = display.textContent;
});
