
// Trade-In form handling
document.addEventListener('DOMContentLoaded', () => {
    const tradeInForm = document.getElementById('tradeInForm');
    const estimateResult = document.getElementById('estimateResult');
    const estimatedValue = document.getElementById('estimatedValue');
    const yearSelect = document.getElementById('year');

    // Populate year dropdown
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        let yearOptions = '<option value="">Select Year</option>';
        for (let year = currentYear; year >= currentYear - 20; year--) {
            yearOptions += `<option value="${year}">${year}</option>`;
        }
        yearSelect.innerHTML = yearOptions;
    }

    // Basic estimation logic
    function calculateEstimate(formData) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - formData.year;
        
        // Base value (example values)
        let baseValue = 30000;

        // Adjust for age
        baseValue *= Math.pow(0.9, age);

        // Adjust for mileage
        const mileageDeduction = (formData.mileage / 10000) * 1000;
        baseValue -= mileageDeduction;

        // Adjust for condition
        const conditionMultipliers = {
            excellent: 1.1,
            good: 1.0,
            fair: 0.8,
            poor: 0.6
        };
        baseValue *= conditionMultipliers[formData.condition];

        // Ensure minimum value
        return Math.max(baseValue, 500);
    }

    if (tradeInForm) {
        tradeInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!validateForm(tradeInForm)) {
                return;
            }

            // Get form data
            const formData = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                year: parseInt(document.getElementById('year').value),
                mileage: parseInt(document.getElementById('mileage').value),
                condition: document.getElementById('condition').value
            };

            // Calculate estimate
            const estimate = calculateEstimate(formData);

            // Display result
            estimatedValue.textContent = formatPrice(estimate);
            estimateResult.style.display = 'block';

            // Store in localStorage
            const tradeIns = JSON.parse(localStorage.getItem('tradeIns') || '[]');
            tradeIns.push({
                ...formData,
                estimatedValue: estimate,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('tradeIns', JSON.stringify(tradeIns));

            // Scroll to result
            estimateResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
});