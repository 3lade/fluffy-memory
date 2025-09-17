// const expense = document.getElementById('expense') as HTMLInputElement;
// const amount = document.getElementById('amount') as HTMLInputElement;
// const date = document.getElementById('date') as HTMLInputElement;
//look up generic in tsLang handbook
function getElement(id) {
    var element = document.getElementById(id);
    if (!element) {
        throw new Error("Element with the ".concat(id, " is not defined"));
    }
    return element;
}
var expenseInput = getElement('expense');
console.log(expenseInput);
var amountInput = getElement('amount');
var dateInput = getElement('date');
var addBtn = getElement('addExpenseBtn');
var expenseList = getElement('expense-list');
var errorMsg = getElement('error-message');
var clearForm = function () {
    expenseInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
};
var renderExpense = function (expense) {
    console.log("second");
    expenseList.textContent = "".concat(expense.name, " - ").concat(expense.amount, " on ").concat(expense.date);
};
var handleClick = function () {
    console.log("first");
    var expense = expenseInput.value;
    var amount = parseInt(amountInput.value);
    var date = dateInput.value;
    if (expense.length < 3) {
        errorMsg.innerHTML = 'Expense name must be at least 3 characters';
        return;
    }
    if (amount < 0 || isNaN(amount)) {
        errorMsg.innerHTML = 'Amount must be a positive number';
        return;
    }
    if (!date) {
        errorMsg.innerHTML = 'Please select a date';
        return;
    }
    var newExpense = {
        name: expense,
        amount: amount.toString(),
        date: date
    };
    console.log(newExpense);
    renderExpense(newExpense);
    clearForm();
};
document.addEventListener('DOMContentLoaded', function () {
    addBtn.addEventListener('click', function () { return handleClick(); });
});
