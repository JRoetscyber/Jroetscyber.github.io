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
        const title = form.title.value.trim();
        const message = form.message.value.trim();

        // Add time variable in ISO format (or customize as needed)
        const now = new Date();
        const time = now.toLocaleString();
        const year = now.getFullYear();

        const universalName = name;

        if (!name || !email || !title || !message) {
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

        // Send both emails simultaneously using Promise.all
        Promise.all([
            // Main notification email (to you)
            emailjs.send(serviceID, templateID, {
                from_name: universalName,
                from_email: email,
                title: title,
                message: message,
                time: time,
                year: year
            }),
            // Auto-reply email to user (send to the sender's email)
            // IMPORTANT: In your EmailJS dashboard, for your auto-reply template (template_vc2ninu),
            // set the "To" field to {{email}} so the reply goes to the user's email address.
            emailjs.send('service_56xmdu2', 'template_vc2ninu', {
                from_name: universalName,
                title: title,
                from_email: email,
                year: year,
                email: email // This must match the "To" field variable ({{email}} or {{to_email}}) in your EmailJS template settings
            })
        ])
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