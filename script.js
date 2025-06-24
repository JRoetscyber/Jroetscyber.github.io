// Initialize EmailJS
(function() {
    emailjs.init('degXCNYEDAW_NZvRs');
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMsg.textContent = '';
        formMsg.className = '';

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

        const serviceID = "service_56xmdu2";
        const templateID = "template_23pzg8u";

        emailjs.send(serviceID, templateID, {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(
            res => {
                formMsg.textContent = "Email sent successfully!";
                formMsg.className = 'success';
                form.reset();
            },
            error => {
                console.error('EmailJS send failed:', error);
                formMsg.textContent = "Failed to send email. Please try again later.";
                formMsg.className = 'error';
            }
        );
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