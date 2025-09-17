export {};

interface Expense {
    name: string,
    amount: string,
    date: string
}

// const expense = document.getElementById('expense') as HTMLInputElement;
// const amount = document.getElementById('amount') as HTMLInputElement;
// const date = document.getElementById('date') as HTMLInputElement;


//look up generic in tsLang handbook

function getElement<T extends HTMLElement>(id: string): T{
    const element = document.getElementById(id)

    if(!element)
    {
        throw new Error(`Element with the ${id} is not defined`);
    }
    return element as T;
    
}

const expenseInput = getElement<HTMLInputElement>('expense');
console.log(expenseInput)
const amountInput = getElement<HTMLInputElement>('amount');
const dateInput = getElement<HTMLInputElement>('date');
const addBtn = getElement<HTMLButtonElement>('addExpenseBtn');
const expenseList = getElement<HTMLDivElement>('expense-list');
const errorMsg = getElement<HTMLDivElement>('error-message');


const clearForm = ():void => {
    expenseInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
}


const renderExpense = (expense:Expense):void => {
    console.log("second")
    expenseList.textContent = `${expense.name} - ${expense.amount} on ${expense.date}`
}


const handleClick = () => {
    console.log("first")
    const expense = expenseInput.value;
    const amount = parseInt(amountInput.value);
    const date = dateInput.value;

    if(expense.length < 3) {
        errorMsg.innerHTML = 'Expense name must be at least 3 characters';
        return;
    }

    if(amount < 0 || isNaN(amount)) {
        errorMsg.innerHTML = 'Amount must be a positive number';
        return;
    }

    if(!date) {
        errorMsg.innerHTML = 'Please select a date';
        return;
    }

    const newExpense: Expense = {
        name: expense,
        amount: amount.toString(),
        date: date
    }
    console.log(newExpense)

    renderExpense(newExpense);
    clearForm();
}



document.addEventListener('DOMContentLoaded', ()=> {
    addBtn.addEventListener('click', () => handleClick())
})