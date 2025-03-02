// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!validateForm(contactForm)) {
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Store in localStorage (for demo purposes)
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
});