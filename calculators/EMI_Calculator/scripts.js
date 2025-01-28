// scripts.js for EMI Calculator

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12; // Monthly interest
    const tenureInYears = parseInt(document.getElementById('tenure').value);
    const tenureInMonths = tenureInYears * 12;

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(tenureInMonths) || loanAmount <= 0 || interestRate < 0 || tenureInMonths <= 0) {
        alert("Please enter valid values!");
        return;
    }

    // EMI Calculation Formula
    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, tenureInMonths)) / (Math.pow(1 + interestRate, tenureInMonths) - 1);
    const totalPayment = emi * tenureInMonths; // Total amount paid over the loan tenure
    const totalInterest = totalPayment - loanAmount; // Total interest paid

    // Display results
    document.getElementById('emi-output').textContent = `₹${emi.toFixed(2)}`;
    document.getElementById('total-output').textContent = `₹${totalPayment.toFixed(2)}`;
    document.getElementById('interest-output').textContent = `₹${totalInterest.toFixed(2)}`;

    // Generate the amortization table
    generateAmortizationTable(loanAmount, emi, interestRate, tenureInMonths);
}

function generateAmortizationTable(loanAmount, emi, interestRate, tenureInMonths) {
    const tableBody = document.querySelector("#amortization-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    let balance = loanAmount;

    for (let month = 1; month <= tenureInMonths; month++) {
        const interestPayment = balance * interestRate; // Interest payment for the month
        const principalPayment = emi - interestPayment; // Principal payment for the month
        balance -= principalPayment; // Update remaining balance

        // Create a new table row
        const row = `<tr>
                        <td>${month}</td>
                        <td>₹${principalPayment.toFixed(2)}</td>
                        <td>₹${interestPayment.toFixed(2)}</td>
                        <td>₹${emi.toFixed(2)}</td>
                        <td>₹${Math.max(balance, 0).toFixed(2)}</td> <!-- Ensure no negative balance -->
                     </tr>`;
        tableBody.innerHTML += row;
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateEMI);
});
