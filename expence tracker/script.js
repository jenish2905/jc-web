// ===============================
// Expense Tracker
// ===============================


// Get HTML elements

const form = document.getElementById("transactionForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const transactionList =
    document.getElementById("transactionList");

const balanceElement =
    document.getElementById("balance");

const incomeElement =
    document.getElementById("income");

const expenseElement =
    document.getElementById("expense");

const clearAllButton =
    document.getElementById("clearAll");


// ===============================
// Load transactions
// ===============================

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// ===============================
// Save transactions
// ===============================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// ===============================
// Add transaction
// ===============================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const description =
        descriptionInput.value.trim();

    const amount =
        Number(amountInput.value);

    const type =
        typeInput.value;


    if (description === "" || amount <= 0) {

        alert("Please enter valid information.");

        return;
    }


    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        type: type,

        category: categorizeExpense(description)

    };


    transactions.push(transaction);


    saveTransactions();

    updateUI();


    form.reset();

});


// ===============================
// Update UI
// ===============================

function updateUI() {

    transactionList.innerHTML = "";


    let income = 0;

    let expense = 0;


    if (transactions.length === 0) {

        transactionList.innerHTML =
            `<li class="empty">
                No transactions yet.
            </li>`;

    }


    transactions.forEach(function(transaction) {


        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }


        const li =
            document.createElement("li");


        li.className =
            `transaction ${transaction.type}`;


        const sign =
            transaction.type === "income"
                ? "+"
                : "-";


        li.innerHTML = `

            <div class="transaction-info">

                <span class="transaction-name">
                    ${transaction.description}
                </span>

                <span class="transaction-category">
                    ${transaction.category}
                </span>

            </div>


            <div class="transaction-right">

                <span class="transaction-amount">

                    ${sign} ₹${transaction.amount.toLocaleString("en-IN")}

                </span>


                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        transactionList.appendChild(li);

    });


    const balance =
        income - expense;


    balanceElement.textContent =
        `₹${balance.toLocaleString("en-IN")}`;

    incomeElement.textContent =
        `₹${income.toLocaleString("en-IN")}`;

    expenseElement.textContent =
        `₹${expense.toLocaleString("en-IN")}`;

}


// ===============================
// Delete transaction
// ===============================

function deleteTransaction(id) {

    transactions =
        transactions.filter(function(transaction) {

            return transaction.id !== id;

        });


    saveTransactions();

    updateUI();

}


// ===============================
// Clear all
// ===============================

clearAllButton.addEventListener(
    "click",
    function() {

        if (transactions.length === 0) {
            return;
        }


        const confirmDelete =
            confirm(
                "Delete all transactions?"
            );


        if (confirmDelete) {

            transactions = [];

            saveTransactions();

            updateUI();

        }

    }
);


// ===============================
// AI-like Categorization
// ===============================

function categorizeExpense(description) {

    const text =
        description.toLowerCase();


    // Food

    if (
        text.includes("food") ||
        text.includes("pizza") ||
        text.includes("burger") ||
        text.includes("restaurant") ||
        text.includes("dinner") ||
        text.includes("lunch") ||
        text.includes("breakfast") ||
        text.includes("coffee")
    ) {

        return "🍔 Food";

    }


    // Transport

    if (
        text.includes("uber") ||
        text.includes("ola") ||
        text.includes("bus") ||
        text.includes("train") ||
        text.includes("petrol") ||
        text.includes("fuel") ||
        text.includes("auto")
    ) {

        return "🚗 Transport";

    }


    // Education

    if (
        text.includes("book") ||
        text.includes("course") ||
        text.includes("college") ||
        text.includes("school") ||
        text.includes("study") ||
        text.includes("exam")
    ) {

        return "📚 Education";

    }


    // Electronics

    if (
        text.includes("laptop") ||
        text.includes("computer") ||
        text.includes("keyboard") ||
        text.includes("mouse") ||
        text.includes("phone") ||
        text.includes("mobile") ||
        text.includes("headphone")
    ) {

        return "💻 Electronics";

    }


    // Shopping

    if (
        text.includes("shirt") ||
        text.includes("shoes") ||
        text.includes("clothes") ||
        text.includes("shopping") ||
        text.includes("amazon") ||
        text.includes("flipkart")
    ) {

        return "🛍️ Shopping";

    }


    // Entertainment

    if (
        text.includes("movie") ||
        text.includes("game") ||
        text.includes("netflix") ||
        text.includes("spotify")
    ) {

        return "🎮 Entertainment";

    }


    return "📦 Other";

}


// ===============================
// AI Assistant
// ===============================

const analyzeButton =
    document.getElementById("analyzeBtn");

const aiInput =
    document.getElementById("aiInput");

const aiResult =
    document.getElementById("aiResult");


analyzeButton.addEventListener(
    "click",
    function() {

        const text =
            aiInput.value.trim();


        if (text === "") {

            alert("Enter an expense description.");

            return;

        }


        const amountMatch =
            text.match(/₹?\s*(\d+(?:\.\d+)?)/);


        let amount = 0;


        if (amountMatch) {

            amount =
                Number(amountMatch[1]);

        }


        const category =
            categorizeExpense(text);


        aiResult.style.display =
            "block";


        aiResult.innerHTML = `

            <strong>🤖 Smart Analysis</strong>

            <br><br>

            Description:
            ${text}

            <br>

            Amount:
            ₹${amount.toLocaleString("en-IN")}

            <br>

            Category:
            ${category}

            <br>

            Type:
            Expense

        `;

    }
);


// ===============================
// Start application
// ===============================

updateUI();