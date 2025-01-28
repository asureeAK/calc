// scripts.js for Compound Interest Calculator

function calculateFutureValue() {
    const principal = parseFloat(document.getElementById('principal-amount').value);
    const annualRate = parseFloat(document.getElementById('annual-rate').value) / 100;
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);
    const investmentDuration = parseInt(document.getElementById('investment-duration').value);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(compoundingFrequency) || isNaN(investmentDuration) || principal <= 0 || annualRate < 0 || compoundingFrequency <= 0 || investmentDuration <= 0) {
        alert("Please enter valid values!");
        return;
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const totalAmount = principal * Math.pow((1 + annualRate / compoundingFrequency), compoundingFrequency * investmentDuration);
    const totalInterest = totalAmount - principal;

    // Display the results
    document.getElementById('principal-output').textContent = `₹${principal.toFixed(2)}`;
    document.getElementById('interest-output').textContent = `₹${totalInterest.toFixed(2)}`;
    document.getElementById('total-output').textContent = `₹${totalAmount.toFixed(2)}`;

    // Generate the amortization table
    generateAmortizationTable(principal, annualRate, compoundingFrequency, investmentDuration);
}

function generateAmortizationTable(principal, annualRate, compoundingFrequency, investmentDuration) {
    const tableBody = document.querySelector("#amortization-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    let amount = principal;

    for (let year = 1; year <= investmentDuration; year++) {
        // Calculate the interest earned during this year
        const interestEarned = amount * annualRate; // Interest earned for the year
        const totalAmount = amount + interestEarned; // Total amount at end of year

        // Create a new table row
        const row = `<tr>
                        <td>${year}</td>
                        <td>₹${amount.toFixed(2)}</td>
                        <td>₹${interestEarned.toFixed(2)}</td>
                        <td>₹${totalAmount.toFixed(2)}</td>
                    </tr>`;
        tableBody.innerHTML += row;

        // Update the amount for the start of the next year
        amount = totalAmount; // Carrying forward the total amount for the next year
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateFutureValue);
});
