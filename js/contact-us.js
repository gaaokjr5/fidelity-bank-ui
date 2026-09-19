/* ==========================================
   CONTACT US — Form Handler
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission
            form.style.display = 'none';
            successMsg.style.display = 'block';

            // Log to console (in production, send to server)
            const formData = {
                name: document.getElementById('fullName').value,
                phone: document.getElementById('phoneNumber').value,
                email: document.getElementById('emailAddress').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            console.log('✅ Contact Form Submitted:', formData);
        });
    }
});

/* ==========================================
   PAGE LOAD ANIMATION — Triggers Smooth Reveal
   Works on EVERY page automatically
========================================== */

function revealPage() {
    document.documentElement.classList.add('page-loaded');
    console.log('✅ Page loaded & animated');
}

// Trigger when fully ready
if (document.readyState === 'complete') {
    revealPage();
} else {
    window.addEventListener('load', revealPage);
}

// Also trigger immediately if header/footer loaded early
document.addEventListener('DOMContentLoaded', revealPage);