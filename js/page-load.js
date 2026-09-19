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