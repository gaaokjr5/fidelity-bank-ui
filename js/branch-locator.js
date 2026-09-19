/* ==========================================
   BRANCH LOCATOR — Page Scripts
   Search & Filter Functionality
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

// ✅ Search & Filter Function
function filterBranches() {
    const searchTerm = document.getElementById('branch-search').value.toLowerCase().trim();
    const regionFilter = document.getElementById('region-filter').value;
    const branches = document.querySelectorAll('.branch-card');
    let visibleCount = 0;

    branches.forEach(branch => {
        const name = branch.dataset.name || '';
        const region = branch.dataset.region || '';

        const matchesSearch = searchTerm === '' ||
            name.includes(searchTerm) ||
            branch.textContent.toLowerCase().includes(searchTerm);
        const matchesRegion = regionFilter === 'all' || region === regionFilter;

        if (matchesSearch && matchesRegion) {
            branch.classList.remove('hidden');
            visibleCount++;
        } else {
            branch.classList.add('hidden');
        }
    });

    // Update results count
    const countText = document.getElementById('results-count');
    if (visibleCount === 0) {
        countText.textContent = 'No branches found — try a different search';
    } else if (visibleCount === 1) {
        countText.textContent = 'Showing 1 branch';
    } else {
        countText.textContent = `Showing ${visibleCount} branches`;
    }
}