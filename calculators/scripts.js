// scripts.js for the homepage of the calculator website

// Function to display a welcome message (optional feature)
function displayWelcomeMessage() {
    const welcomeSection = document.createElement('div');
    welcomeSection.id = 'welcome-message';
    welcomeSection.textContent = "Welcome to the Calculator Website! Use the links below to access the calculators.";
    document.body.insertBefore(welcomeSection, document.body.firstChild);
}

// Function to handle click events for calculator links
function handleCalculatorLinks() {
    const links = document.querySelectorAll('.calculator-link');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const calculatorName = link.getAttribute('data-calculator');
            // Optional: Alert users they are navigating to another page
            if (!confirm(`You are about to navigate to the ${calculatorName} page. Do you want to continue?`)) {
                event.preventDefault(); // Prevent navigation if user cancels
            }
        });
    });
}

// Initialize functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment the next line if you want to show the welcome message
    // displayWelcomeMessage();
    handleCalculatorLinks();
});
