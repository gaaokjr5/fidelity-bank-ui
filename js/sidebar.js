// ==========================================
// SIDEBAR — Fidelity Style Slide-in Menu
// Fixed: Works with dynamically loaded header
// ==========================================

function initSidebar() {
    const hamburger = document.getElementById('hamburgerToggle');
    const sidebar = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('sidebarClose');
    const dropdownTriggers = document.querySelectorAll('.sidebar-dropdown-trigger');

    // Exit if elements not found yet
    if (!hamburger || !sidebar || !closeBtn) {
        return false;
    }

    // Open Sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        document.body.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    }

    // Close Sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }

    // Toggle Submenu
    dropdownTriggers.forEach(trigger => {
        trigger.removeEventListener('click', toggleSubmenu);
        trigger.addEventListener('click', toggleSubmenu);
    });

    function toggleSubmenu(e) {
        const parent = e.target.closest('.sidebar-dropdown');
        if (parent) parent.classList.toggle('open');
    }

    // Remove old listeners to prevent duplicates
    hamburger.removeEventListener('click', openSidebar);
    closeBtn.removeEventListener('click', closeSidebar);

    // Click Handlers
    hamburger.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);

    // Close when clicking links
    sidebar.querySelectorAll('a').forEach(link => {
        link.removeEventListener('click', closeSidebar);
        link.addEventListener('click', closeSidebar);
    });

    // Close on Escape key
    document.removeEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleEscape);

    function handleEscape(e) {
        if (e.key === 'Escape') closeSidebar();
    }

    return true; // Success
}

// Try immediately + retry until header loads
if (!initSidebar()) {
    const retryInterval = setInterval(() => {
        if (initSidebar()) {
            clearInterval(retryInterval);
        }
    }, 100);

    // Give up after 5 seconds
    setTimeout(() => clearInterval(retryInterval), 5000);
}

// Also re-run when header finishes loading
document.addEventListener('header-loaded', initSidebar);