/* ==========================================
   COMPLAINT & FEEDBACK — Page Scripts
========================================== */

// ✅ Load Shared Header
fetch('components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-header').innerHTML = html;
    })
    .catch(err => console.log('Header error:', err));

// ✅ Load Shared Footer
fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-footer').innerHTML = html;
    })
    .catch(err => console.log('Footer error:', err));

// ✅ Form Submission Handler
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('feedback-form')) {
        e.preventDefault();
        alert('✅ Thank you! Your feedback has been submitted successfully.\n\nWe will acknowledge receipt within 24 hours and respond as soon as possible.');
        e.target.reset();
    }
});