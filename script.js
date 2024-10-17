// Get HTML elements
const balanceEl = document.getElementById('balance');
const incomeTransactionsEl = document.getElementById('income-transactions');
const expenseTransactionsEl = document.getElementById('expense-transactions');
const transactionForm = document.getElementById('transaction-form');
const transactionTypeInput = document.getElementById('transaction-type');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionDescriptionInput = document.getElementById('transaction-description');

// Initialize transactions array
let transactions = [];

// Function to calculate and update balance
function updateBalance() {
  let balance = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      balance += transaction.amount; // Add income to balance
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount; // Subtract expense from balance
    }
  });
  balanceEl.textContent = balance.toFixed(2); // Update balance display
}

// Function to display transactions
function displayTransactions() {
  // Clear previous transactions
  incomeTransactionsEl.innerHTML = '';
  expenseTransactionsEl.innerHTML = '';

  // Loop through transactions array and display each transaction
  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center'; // Bootstrap classes for styling
    listItem.innerHTML = `${transaction.description} <span class="badge bg-${transaction.type === 'income' ? 'success' : 'danger'}">${transaction.amount.toFixed(2)}</span>`; // Add badge for amount

    if (transaction.type === 'income') {
      incomeTransactionsEl.appendChild(listItem);
    } else if (transaction.type === 'expense') {
      expenseTransactionsEl.appendChild(listItem);
    }
  });
}

// Function to add a new transaction
function addTransaction(event) {
  event.preventDefault(); // Prevent form submission

  const type = transactionTypeInput.value;
  const amount = Number(transactionAmountInput.value);
  const description = transactionDescriptionInput.value;

  // Validate inputs
  if (type === '' || isNaN(amount) || amount <= 0 || description.trim() === '') {
    alert('Please fill out all fields correctly.'); // Alert for validation failure
    return;
  }

  // Create new transaction object
  const transaction = {
    type: type,
    amount: amount,
    description: description,
  };

  // Add transaction to array
  transactions.push(transaction);

  // Clear form inputs
  transactionTypeInput.value = 'income'; // Reset type to default
  transactionAmountInput.value = '';
  transactionDescriptionInput.value = '';

  // Update balance and display transactions
  updateBalance();
  displayTransactions();
}

// Add event listener to form submit
transactionForm.addEventListener('submit', addTransaction);