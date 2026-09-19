/* ==========================================
   FOOTER — JavaScript (Fixed Year Loader)
========================================== */

// ✅ Set copyright year — runs immediately
function setCopyrightYear() {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log('✅ Year set:', yearSpan.textContent);
    } else {
        console.log('⏳ Waiting for footer to load...');
        // Try again in case footer loads after this script
        setTimeout(setCopyrightYear, 150);
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', setCopyrightYear);

// Also run immediately (for pages with dynamic footer loading)
setCopyrightYear();