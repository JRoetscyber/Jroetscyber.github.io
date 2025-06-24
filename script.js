// Initialize EmailJS (replace with your own user ID)
(function() {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // <-- Replace with your EmailJS user ID
})();

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMsg.textContent = '';
        formMsg.className = '';

        // Simple validation
        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const message = form.message.value.trim();
        if (!name || !email || !message) {
            formMsg.textContent = 'Please fill in all fields.';
            formMsg.className = 'error';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formMsg.textContent = 'Please enter a valid email address.';
            formMsg.className = 'error';
            return;
        }

        // Send email via EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(function() {
            formMsg.textContent = 'Message sent! Thank you.';
            formMsg.className = 'success';
            form.reset();
        }, function(error) {
            formMsg.textContent = 'Failed to send. Please try again later.';
            formMsg.className = 'error';
        });
    });

    // Fade-in animation for sections
    const fadeSections = document.querySelectorAll('.fade-section');
    const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.85;
        fadeSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
