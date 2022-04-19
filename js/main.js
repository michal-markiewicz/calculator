"use strict";

printCalculationHistory();

const calculatorInput = document.getElementById('calculator-input');

window.addEventListener('keypress', addKeyboardInput);

function addKeyboardInput (e)
{
    const keyValue = e.key;
    const numberPattern = /[0-9]/;
    const operatorPattern = /[\%\.\+\-\/\*]/;

    if (keyValue.match(numberPattern))
    {
       calculatorInput.textContent += keyValue;

       return true;
    }
    else if (keyValue.match(operatorPattern))
    {
        const calculatorInputLength = calculatorInput.textContent.length;

        if (calculatorInputLength === 0)
        {
            return false;
        }

        const calculatorInputLastChar = calculatorInput.textContent[calculatorInputLength - 1];

        if (calculatorInputLastChar.match(operatorPattern))
        {        
            // remove operator

            if (calculatorInput.textContent.slice(-2) === "**")
            {
                calculatorInput.textContent = calculatorInput.textContent.slice(0, -2);
            }
            else
            {
                calculatorInput.textContent = calculatorInput.textContent.slice(0, -1);
            }
        }

        calculatorInput.textContent += keyValue;
        return true;
    }
}

window.addEventListener('click', addButtonInput);

function addButtonInput (e)
{
    if (e.target.className !== "value" && e.target.className !== "operator")
    {
        return false;
    }

    if (e.target.className === "value")
    {
        calculatorInput.textContent += e.target.textContent;
        return true;
    }
    else if (e.target.className === "operator")
    {
        const calculatorInputLength = calculatorInput.textContent.length;

        if (calculatorInputLength === 0)
        {
            return false;
        }

        const calculatorInputLastChar = calculatorInput.textContent[calculatorInputLength - 1];
        const operatorPattern = /[\%\.\+\-\/\*]/;

        if (calculatorInputLastChar.match(operatorPattern))
        {        
            // remove operator

            if (calculatorInput.textContent.slice(-2) === "**")
            {
                calculatorInput.textContent = calculatorInput.textContent.slice(0, -2);
            }
            else
            {
                calculatorInput.textContent = calculatorInput.textContent.slice(0, -1);
            }
        }

        calculatorInput.textContent += e.target.textContent;
        return true;
    }
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', calculate)

function calculate () 
{
    const calculatorInputLength = calculatorInput.textContent.length;

    if (calculatorInputLength === 0)
    {
        return false;
    }

    const operatorPattern = /[\%\.\+\-\/\*]/;
    const calculatorInputLastChar = calculatorInput.textContent[calculatorInputLength - 1];

    if (calculatorInputLastChar.match(operatorPattern))
    {
        return false;
    }

    const finalValue = document.getElementById('final-value');
    const sum = eval(calculatorInput.textContent);
    finalValue.textContent = `Sum: ${sum}`;

    saveToLocalStorage(calculatorInput.textContent, sum);
    printCalculationHistory();
}

function saveToLocalStorage (arithmeticExpression, sum)
{
    if (localStorage.getItem('calculationHistory') === null)
    {
        const calculationHistory = [];
        localStorage.setItem('calculationHistory', calculationHistory);

        let calculation = {
            arithmeticExpression : arithmeticExpression,
            sum : sum
        }

        calculationHistory.push(calculation);
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));

        return true;
    }   

    const jsonObj = localStorage.getItem('calculationHistory');
    const rawObj = JSON.parse(jsonObj); 

    let calculation = {
        arithmeticExpression : arithmeticExpression,
        sum : sum
    }

    rawObj.push(calculation);
    localStorage.setItem('calculationHistory', JSON.stringify(rawObj));
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearInput);

function clearInput () 
{
    calculatorInput.textContent = "";
}

function printCalculationHistory ()
{

    if (localStorage.getItem('calculationHistory') === null)
    {
        return false;
    }

    const jsonObj = localStorage.getItem('calculationHistory');
    const rawObj = JSON.parse(jsonObj);
    
    const calculationHistoryList = document.querySelector('#previous-calculations > ol');

    calculationHistoryList.innerHTML = "";

    rawObj.forEach((calculation) => {
        const listElement = document.createElement('li');
        listElement.textContent = `${calculation.arithmeticExpression}=${calculation.sum}`;
        calculationHistoryList.appendChild(listElement);
    })
}


