/* ==========================================
   ANNOUNCEMENTS — Filter Logic
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const announcementCards = document.querySelectorAll('.announcement-card');
    const noResultsMsg = document.getElementById('noAnnouncements');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const selectedFilter = this.getAttribute('data-filter');
            let visibleCount = 0;

            // Filter cards
            announcementCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show/hide no results message
            if (visibleCount === 0 && noResultsMsg) {
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    });
});

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