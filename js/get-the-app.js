/* ==========================================
   GET THE APP — JavaScript
   Page load + Header/Footer load + Hamburger FIXED
========================================== */

// ✅ Page reveal animation
function revealPage() {
    document.documentElement.classList.add('page-loaded');
}
if (document.readyState === 'complete') {
    revealPage();
} else {
    window.addEventListener('load', revealPage);
}

// ✅ Load Shared Header
fetch('components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-header').innerHTML = html;
        // 🔧 RE-ATTACH HAMBURGER EVENTS AFTER HEADER LOADS
        setupHamburger();
    })
    .catch(err => console.log('Header error:', err));

// ✅ Load Shared Footer
fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-footer').innerHTML = html;
    })
    .catch(err => console.log('Footer error:', err));

// ✅ HAMBURGER FIX — Works even after header loads!
function setupHamburger() {
    const hamburger = document.getElementById('hamburgerToggle') || document.querySelector('.hamburger-btn');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('sidebarClose');

    if (hamburger && overlay) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            overlay.classList.toggle('active');
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.remove('active');
        });
    }

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
        if (overlay && overlay.classList.contains('active')) {
            if (!overlay.contains(e.target) && !hamburger.contains(e.target)) {
                overlay.classList.remove('active');
            }
        }
    });
}