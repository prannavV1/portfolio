document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.textContent = name + ': $' + amount;

    // Add a delete button to the expense item
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        // Remove the expense item from the DOM
        expenseItem.remove();

        // Remove the expense item from localStorage
        var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        var index = expenses.findIndex(function(expense) {
            return expense.name === name && expense.amount === amount;
        });
        if (index !== -1) {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
    });
    expenseItem.appendChild(deleteButton);

    document.getElementById('expenses').appendChild(expenseItem);
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';

    // Store the expense in localStorage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ name: name, amount: amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
});

// Load expenses from localStorage on page load
window.onload = function() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(function(expense) {
        var expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.textContent = expense.name + ': $' + expense.amount;

        // Add a delete button to the expense item
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // Remove the expense item from the DOM
            expenseItem.remove();

            // Remove the expense item from localStorage
            var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            var index = expenses.findIndex(function(exp) {
                return exp.name === expense.name && exp.amount === expense.amount;
            });
            if (index !== -1) {
                expenses.splice(index, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
            }
        });
        expenseItem.appendChild(deleteButton);

        document.getElementById('expenses').appendChild(expenseItem);
    });
};
