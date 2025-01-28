// lumpsum_calculator.js for Lumpsum Investment Calculator

function calculateLumpsumReturn() {
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    const annualRate = parseFloat(document.getElementById('annual-rate').value) / 100; // Convert to decimal
    const investmentDuration = parseInt(document.getElementById('investment-duration').value);
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);

    // Calculate future value using the compound interest formula
    const futureValue = investmentAmount * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * investmentDuration);
    const totalInterest = futureValue - investmentAmount;

    // Display the results
    document.getElementById('initial-amount-output').textContent = `₹${investmentAmount.toFixed(2)}`; // Show initial investment
    document.getElementById('future-value-output').textContent = `₹${futureValue.toFixed(2)}`;
    document.getElementById('total-interest-output').textContent = `₹${totalInterest.toFixed(2)}`;

    // Generate graph and table
    generateGraph(investmentAmount, annualRate, investmentDuration, compoundingFrequency);
    generateTable(investmentAmount, annualRate, investmentDuration, compoundingFrequency);
}

function generateGraph(investmentAmount, annualRate, investmentDuration, compoundingFrequency) {
    const labels = [];
    const dataPoints = [];

    for (let year = 0; year <= investmentDuration; year++) {
        const amount = investmentAmount * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * year);
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


function generateTable(investmentAmount, annualRate, investmentDuration, compoundingFrequency) {
    const tableBody = document.querySelector("#investment-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    for (let year = 1; year <= investmentDuration; year++) {
        const totalAmount = investmentAmount * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * year);
        const previousAmount = investmentAmount * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * (year - 1));
        const interestEarned = totalAmount - previousAmount; // Interest earned in that year

        // Create the table row
        const row = `<tr>
                        <td>${year}</td>
                        <td>₹${totalAmount.toFixed(2)}</td>
                        <td>₹${interestEarned.toFixed(2)}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}



// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateLumpsumReturn);
});
