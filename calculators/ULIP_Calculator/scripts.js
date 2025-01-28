// ulip_calculator.js for ULIP Calculator and Number to Words conversion

function numberToWords(num) {
    const units = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen'
    ];

    const tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    const scales = [
        '', 'thousand', 'lakh', 'crore'
    ];

    if (num === 0) return 'zero';

    let words = '';
    let scaleIndex = 0;

    while (num > 0) {
        let part = num % 1000;
        if (part > 0) {
            words = convertPart(part).trim() + (scaleIndex > 0 ? ' ' + scales[scaleIndex] : '') + (words ? ' ' + words : '');
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
    }

    return words.trim();
}

function convertPart(part) {
    const units = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen'
    ];

    const tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    let result = '';

    if (part >= 100) {
        result += units[Math.floor(part / 100)] + ' hundred';
        part %= 100;
        if (part > 0) result += ' and ';
    }

    if (part >= 20) {
        result += tens[Math.floor(part / 10)];
        part %= 10;
        if (part > 0) result += ' ';
    }

    if (part > 0) {
        result += units[part];
    }

    return result.trim();
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateULIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100; // Convert to decimal
    const investmentDuration = parseInt(document.getElementById('investment-duration').value);
    
    const insuranceCoverageInput = document.getElementById('insurance-coverage').value.replace(/,/g, '');
    const insuranceCoverage = insuranceCoverageInput ? parseFloat(insuranceCoverageInput) : 0; // Default to 0 if empty

    // Basic validation
    if (isNaN(monthlyInvestment) || monthlyInvestment <= 0 || 
        isNaN(annualReturn) || annualReturn < 0 || 
        isNaN(investmentDuration) || investmentDuration <= 0 || 
        (insuranceCoverage < 0)) {
        alert("Please enter valid values!");
        return;
    }

    const totalMonths = investmentDuration * 12; // Total number of months for the investment
    const monthlyRate = annualReturn / 12; // Convert annual return to monthly return

    // Future Value of Investment Calculation using Future Value of a Series formula
    let futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    // Total amount invested
    const totalInvested = monthlyInvestment * totalMonths;

    // Total gains
    const totalGains = futureValue - totalInvested;

    // Total payout
    const totalPayout = futureValue + insuranceCoverage;

    // Format numbers with commas
    document.getElementById('total-invested-output').textContent = `₹${formatWithCommas(totalInvested.toFixed(2))}`;
    document.getElementById('future-value-output').textContent = `₹${formatWithCommas(futureValue.toFixed(2))}`;
    document.getElementById('insurance-coverage-output').textContent = `₹${formatWithCommas(insuranceCoverage.toFixed(2))}`;
    document.getElementById('total-gains-output').textContent = `₹${formatWithCommas(totalGains.toFixed(2))}`;
    document.getElementById('total-payout-output').textContent = `₹${formatWithCommas(totalPayout.toFixed(2))}`;
    
    // Get the total payout in words
    document.getElementById('total-payout-words').textContent = numberToWords(Math.round(totalPayout));

    // Show result container
    document.getElementById('result-container').style.display = 'block';
}

// Add event listener to button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-button').addEventListener('click', calculateULIP);
});
