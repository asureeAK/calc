// scripts.js for Investment Return Calculator

function calculateInvestmentReturn() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const annualRate = parseFloat(document.getElementById('annual-rate').value) / 100; // Convert to decimal
    const investmentDuration = parseInt(document.getElementById('investment-duration').value);
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);

    // Calculate final amount using the compound interest formula
    const finalAmount = initialInvestment * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * investmentDuration);
    const totalInterest = finalAmount - initialInvestment;

    // Display the results
    document.getElementById('initial-investment-output').textContent = `₹${initialInvestment.toFixed(2)}`; // Show initial investment
    document.getElementById('final-amount-output').textContent = `₹${finalAmount.toFixed(2)}`;
    document.getElementById('total-interest-output').textContent = `₹${totalInterest.toFixed(2)}`;

    // Generate graph and table
    generateGraph(initialInvestment, annualRate, investmentDuration, compoundingFrequency);
    generateTable(initialInvestment, annualRate, investmentDuration, compoundingFrequency);
}

function generateGraph(initialInvestment, annualRate, investmentDuration, compoundingFrequency) {
    const labels = [];
    const dataPoints = [];

    for (let year = 0; year <= investmentDuration; year++) {
        const amount = initialInvestment * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * year);
        labels.push(year.toString());
        dataPoints.push(amount);
    }

    const ctx = document.getElementById('investmentGraph').getContext('2d');
    const investmentGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth',
                data: dataPoints,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}

function generateTable(initialInvestment, annualRate, investmentDuration, compoundingFrequency) {
    const tableBody = document.querySelector("#investment-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    for (let year = 1; year <= investmentDuration; year++) {
        const amount = initialInvestment * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * year);
        const interestEarned = amount - (initialInvestment * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * (year - 1)));
        const totalAmount = amount + interestEarned; // Calculate total as amount + interest

        // Create the table row
        const row = `<tr>
                        <td>${year}</td>
                        <td>₹${amount.toFixed(2)}</td>
                        <td>₹${interestEarned.toFixed(2)}</td>
                        <td>₹${totalAmount.toFixed(2)}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateInvestmentReturn);
});
