const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentInput = "0";
let firstOperand = null;
let operator = null;

const historyDisplay = document.getElementById("history");
const history = [];

buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
});

document.getElementById("clear-history").addEventListener("click", clearHistory);

document.addEventListener("keydown", event => {
    const key = event.key;
    handleKeyPress(key);
});

function handleButtonClick(value) {
    if (isNumber(value)) {
        if (currentInput === "0" || operator === "=") {
            currentInput = value;
        } else {
            currentInput += value;
        }
    } else if (value === ".") {
        if (!currentInput.includes(".")) {
            currentInput += value;
        }
    } else if (value === "C") {
        clear();
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
        handleOperator(value);
    } else if (value === "=") {
        calculate();
        updateHistory();
    } else if (value === "←") {
        backspace();
    } else if (value === "Tab") {
        clearHistory();
    }
    
    if (operator !== null && firstOperand !== null) {
        display.textContent = `${firstOperand} ${operator} ${currentInput || ''}`;
    } else {
        updateDisplay();
    }
}


function updateHistory() {
    const historyEntry = `${firstOperand} ${operator} ${currentInput} = ${calculate()}`;
    history.push(historyEntry);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyDisplay.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}


function clearHistory() {
    history.length = 0;
    updateHistoryDisplay();
}

function handleKeyPress(key) {
    if (isNumber(key)) {
        handleButtonClick(key);
    } else if (key === ".") {
        handleButtonClick(key);
    } else if (key === "Enter") {
        handleButtonClick("=");
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleButtonClick(key);
    } else if (key === "Backspace") {
        handleButtonClick("←");
    } else if (key === "Tab") {
        clearHistory();
    }
}

function isNumber(value) {
    return !isNaN(value) && value !== ".";
}

function updateDisplay() {
    display.textContent = currentInput;
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    firstOperand = currentInput;
    operator = op;
    currentInput = "";
}

function calculate() {
    if (operator && firstOperand !== null && currentInput !== "") {
        firstOperand = parseFloat(firstOperand);
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
            case "+":
                return (firstOperand + secondOperand).toString();
            case "-":
                return (firstOperand - secondOperand).toString();
            case "*":
                return (firstOperand * secondOperand).toString();
            case "/":
                return (firstOperand / secondOperand).toString();
        }
    }
}


function clear() {
    currentInput = "0";
    operator = null;
    firstOperand = null;
}
function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

updateDisplay();
