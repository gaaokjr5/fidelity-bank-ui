/* ==========================================
   FORGOT PASSWORD — Page Scripts
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

// ✅ Form Submit Handler
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('auth-form')) {
        e.preventDefault();
        alert('If this email exists in our system, a password reset link has been sent! ✅');
    }
});