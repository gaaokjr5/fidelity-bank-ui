/* ==========================================
   DASHBOARD — Page Scripts
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

// ✅ Optional: Greet user by time of day
window.addEventListener('load', () => {
    const hour = new Date().getHours();
    const nameEl = document.getElementById('userName');
    if (hour < 12) nameEl.textContent = 'Good Morning';
    else if (hour < 17) nameEl.textContent = 'Good Afternoon';
    else nameEl.textContent = 'Good Evening';
});