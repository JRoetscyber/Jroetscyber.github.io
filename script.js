// Initialize EmailJS with your public key
(function() {
    emailjs.init('degXCNYEDAW_NZvRs');
})();

document.addEventListener('DOMContentLoaded', function() {
    // Get form and message display elements
    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message');

    // Handle contact form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submit
        formMsg.textContent = '';
        formMsg.className = '';

        // Get and trim input values
        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const message = form.message.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            formMsg.textContent = 'Please fill in all fields.';
            formMsg.className = 'error';
            return;
        }
        // Email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formMsg.textContent = 'Please enter a valid email address.';
            formMsg.className = 'error';
            return;
        }

        // EmailJS service and template IDs
        const serviceID = "service_56xmdu2";
        const templateID = "template_23pzg8u";

        // Send email via EmailJS
        emailjs.send(serviceID, templateID, {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(
            res => {
                // Success feedback
                formMsg.textContent = "Email sent successfully!";
                formMsg.className = 'success';
                form.reset();
            },
            error => {
                // Error feedback and log
                console.error('EmailJS send failed:', error);
                formMsg.textContent = "Failed to send email. Please try again later.";
                formMsg.className = 'error';
            }
        );
    });

    // Fade-in animation for sections on scroll
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
    revealOnScroll(); // Initial check on page load
});