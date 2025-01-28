// term_insurance_calculator.js for Term Insurance Calculator

function calculatePremium() {
    const age = parseInt(document.getElementById('age').value);
    const annualIncome = parseFloat(document.getElementById('annual-income').value) || 0;
    const policyTerm = parseInt(document.getElementById('policy-term').value);
    const gender = document.getElementById('gender').value;
    const smokingStatus = document.getElementById('smoking-status').value;

    // Basic validation
    if (isNaN(age) || age <= 0 || annualIncome <= 0 || isNaN(policyTerm) || policyTerm <= 0) {
        alert("Please enter valid values!");
        return;
    }

    // Calculate minimum coverage amount based on age and annual income
    let coverageAmount;

    // Determine the minimum coverage amount
    if (age >= 20 && age <= 39) {
        coverageAmount = Math.ceil(annualIncome * 25); // 25 times annual income
    } else if (age >= 40 && age <= 59) {
        coverageAmount = Math.ceil(annualIncome * 15); // 15 times annual income
    } else {
        coverageAmount = Math.ceil(annualIncome * 10); // 10 times annual income
    }

    // Set base premium rate
    let premiumRate = 0.0012; // Average Premium Rate of 0.12%

    // Calculate annual premium
    const annualPremium = coverageAmount * premiumRate;

    // Calculate monthly premium
    const monthlyPremium = annualPremium / 12;

    // Calculate total premium over policy term
    const totalPremiumPaid = annualPremium * policyTerm;

    // Calculate next year's premium if skipped
    const nextYearPremium = annualPremium * 1.3; // Increase current annual premium by 30%

    // Display coverage amount and calculated premiums
    document.getElementById('coverage-amount-output').textContent = `₹${coverageAmount.toFixed(2)}`;
    document.getElementById('annual-premium-output').textContent = `₹${annualPremium.toFixed(2)}`;
    document.getElementById('monthly-premium-output').textContent = `₹${monthlyPremium.toFixed(2)}`;
    document.getElementById('total-premium-paid-output').textContent = `₹${totalPremiumPaid.toFixed(2)}`;
    
    // Display the next year's premium
    document.getElementById('next-year-premium-output').textContent = `₹${nextYearPremium.toFixed(2)}`;

    // Show result container
    document.getElementById('result-container').style.display = 'block';
}

// Add event listener to button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculatePremium);
});
