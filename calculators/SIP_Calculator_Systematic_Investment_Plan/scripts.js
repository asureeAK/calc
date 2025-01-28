// sip_calculator.js for Step-Up SIP Calculator

function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100; // Convert to decimal
    const investmentDuration = parseInt(document.getElementById('investment-duration').value);
    const stepUpAmount = parseFloat(document.getElementById('step-up-amount').value) || 0; // Default to 0 if not provided
    const stepUpFrequency = parseInt(document.getElementById('step-up-frequency').value) || 1; // Default to 1 year if not provided

    const months = investmentDuration * 12; // Total months of investment
    const monthlyReturn = annualReturn / 12; // Convert annual return to monthly

    // Ensure valid inputs
    if (isNaN(monthlyInvestment) || isNaN(annualReturn) || isNaN(investmentDuration) ||
        monthlyInvestment <= 0 || annualReturn < 0 || investmentDuration <= 0 ||
        stepUpAmount < 0 || stepUpFrequency <= 0) {
        alert("Please enter valid values!");
        return;
    }

    let totalValue = 0;
    let totalInvested = 0;
    let monthlyInvestmentCurrent = monthlyInvestment;

    // Generate amortization table
    const tableBody = document.querySelector("#amortization-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    for (let month = 1; month <= months; month++) {
        totalValue += monthlyInvestmentCurrent; // Add monthly investment
        const interestEarned = totalValue * monthlyReturn; // Calculate interest for the current total value
        totalValue += interestEarned; // Add interest to the total value
        totalInvested += monthlyInvestmentCurrent; // Update total invested

        // Create a new table row
        const row = `<tr>
                        <td>${month}</td>
                        <td>₹${monthlyInvestmentCurrent.toFixed(2)}</td>
                        <td>₹${interestEarned.toFixed(2)}</td>
                        <td>₹${totalValue.toFixed(2)}</td>
                     </tr>`;
        tableBody.innerHTML += row;

        // Step-Up Logic
        if (month % (stepUpFrequency * 12) === 0) { // Step-Up happens every stepUpFrequency years
            monthlyInvestmentCurrent += stepUpAmount; // Increase monthly investment by the step-up amount
        }
    }

    const futureValue = totalValue; // Future value of investment
    const totalGains = futureValue - totalInvested; // Total gains

    // Display results
    document.getElementById('future-value-output').textContent = `₹${futureValue.toFixed(2)}`;
    document.getElementById('total-invested-output').textContent = `₹${totalInvested.toFixed(2)}`;
    document.getElementById('total-gains-output').textContent = `₹${totalGains.toFixed(2)}`;

    // Generate graph
    generateGraph(monthlyInvestment, annualReturn, investmentDuration, stepUpAmount, stepUpFrequency);
}

function generateGraph(monthlyInvestment, annualReturn, investmentDuration, stepUpAmount, stepUpFrequency) {
    const labels = [];
    const dataPoints = [];

    const totalMonths = investmentDuration * 12;
    let monthlyInvestmentCurrent = monthlyInvestment;
    let totalValue = 0;
    const monthlyReturn = annualReturn / 12;

    for (let month = 1; month <= totalMonths; month++) {
        totalValue += monthlyInvestmentCurrent; // Add monthly investment
        totalValue *= (1 + monthlyReturn); // Apply monthly return
        labels.push(month.toString());
        dataPoints.push(totalValue);

        // Step-Up Logic
        if (month % (stepUpFrequency * 12) === 0) { // Step-Up happens every stepUpFrequency years
            monthlyInvestmentCurrent += stepUpAmount; // Increase monthly investment by the step-up amount
        }
    }

    const ctx = document.getElementById('sipGraph').getContext('2d');
    const sipGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth with Step-Up',
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
                        text: 'Future Value (₹)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            }
        }
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateSIP);
});
