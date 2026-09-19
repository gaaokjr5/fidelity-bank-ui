/* ==========================================
   FAQ — Accordion & Category Filter Logic
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('open');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });

            // Toggle current
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });

    // Category Filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // Filter items
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('open'); // Close if filtered out
                }
            });
        });
    });
});

// Load Shared Footer
fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-footer').innerHTML = html;
    })
    .catch(err => console.log('Footer load error:', err));

// Load Shared Header
fetch('components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('shared-header').innerHTML = html;
        // Optional: trigger event for other scripts
        window.dispatchEvent(new Event('header-loaded'));
    })
    .catch(err => console.log('Header load error:', err));