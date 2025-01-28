// scripts.js for Car Loan EMI Calculator

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTenure = parseInt(document.getElementById('loan-tenure').value);

    const principal = loanAmount - downPayment;

    if (isNaN(principal) || isNaN(interestRate) || isNaN(loanTenure) || principal <= 0 || interestRate < 0 || loanTenure <= 0) {
        alert("Please enter valid values!");
        return;
    }

    const emi = (principal * interestRate * Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);
    
    document.getElementById('result').textContent = `Your Monthly EMI: ₹${emi.toFixed(2)}`;

    generateAmortizationTable(principal, interestRate, loanTenure, emi);
}

function generateAmortizationTable(principal, interestRate, loanTenure, emi) {
    const tableBody = document.querySelector("#amortization-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    let balance = principal;

    for (let month = 1; month <= loanTenure; month++) {
        const interestPayment = balance * interestRate;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;
        if (balance < 0) balance = 0; // Ensure balance doesn't go below zero

        const totalPayment = principalPayment + interestPayment;

        const row = `<tr>
                        <td>${month}</td>
                        <td>₹${principalPayment.toFixed(2)}</td>
                        <td>₹${interestPayment.toFixed(2)}</td>
                        <td>₹${totalPayment.toFixed(2)}</td>
                        <td>₹${balance.toFixed(2)}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateEMI);
});
