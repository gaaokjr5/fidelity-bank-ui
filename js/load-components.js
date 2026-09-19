document.addEventListener('DOMContentLoaded', async() => {
    const components = [
        { selector: '#header-placeholder', file: 'components/header.html' },
        { selector: '#footer-placeholder', file: 'components/footer.html' }
    ];

    for (const { selector, file }
        of components) {
        const placeholder = document.querySelector(selector);
        if (!placeholder) continue;

        try {
            const res = await fetch(file);
            if (res.ok) {
                placeholder.innerHTML = await res.text();
                // Initialize dropdowns AFTER header loads
                if (selector === '#header-placeholder') initDropdowns();
            }
        } catch (err) {
            console.warn('Failed to load:', file);
        }
    }
});

// ==========================================
// DROPDOWN & MOBILE MENU LOGIC
// ==========================================
function initDropdowns() {
    // 1. Desktop Dropdown Click Support
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.preventDefault();
            const parent = trigger.closest('.nav-dropdown');
            parent.classList.toggle('open');
        });
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.getElementById('mobileMenu');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            menuOverlay.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            menuOverlay.classList.remove('open');
            menuOverlay.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }

        menuOverlay.addEventListener('click', e => {
            if (e.target === menuOverlay) closeMenu(); // Click outside to close
        });

        // Close menu when a link inside it is chosen
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 3. Mobile Dropdown Submenus
    document.querySelectorAll('.mobile-dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.closest('.mobile-dropdown');
            parent.classList.toggle('open');
        });
    });
    // Tell sidebar script when header is ready
    document.dispatchEvent(new CustomEvent('header-loaded'));
}