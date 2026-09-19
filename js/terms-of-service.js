/* ==========================================
   TERMS OF SERVICE — Page Scripts
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