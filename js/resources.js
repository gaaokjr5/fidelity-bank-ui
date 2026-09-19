// ==========================================
// FIDELITY BANK — Resource Center Manager
// Handles search, tag filtering, rendering, empty states, and skeleton loaders
// ==========================================

export class ResourceCenter {
    constructor(options = {}) {
        this.container = document.getElementById(options.gridId || 'resourceGrid');
        this.searchInput = document.getElementById(options.searchId || 'resourceSearch');
        this.tagsContainer = document.querySelector(options.tagsSelector || '.tags');
        this.emptyState = document.getElementById(options.emptyId || 'emptyState');
        this.activeTag = 'all';
        this.searchQuery = '';
        this.resources = options.resources || [];

        this.init();
    }

    init() {
        this.attachEvents();
        this.render();
    }

    // Render resource cards
    render(list = this.resources) {
        let filtered = this.applyFilters(list);

        if (filtered.length === 0) {
            this.container.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';
        this.container.innerHTML = filtered.map(item => this.cardTemplate(item)).join('');
    }

    cardTemplate(item) {
            return `
      <div class="resource-card" data-tag="${item.tag}">
        <div class="resource-card-img">${item.icon || '📄'}</div>
        <div class="resource-card-body">
          <h4>${this.escapeHtml(item.title)}</h4>
          <p>${this.escapeHtml(item.desc || '')}</p>
          ${item.fileSize ? `<p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">${item.fileSize}</p>` : ''}
          <a href="${item.link || '#'}" 
             class="download-btn" 
             role="button"
             aria-label="Download ${this.escapeHtml(item.title)}">
            ⬇ Download
          </a>
        </div>
      </div>
    `;
  }

  applyFilters(list) {
    return list.filter(item => {
      const matchesTag = this.activeTag === 'all' || item.tag === this.activeTag;
      const matchesSearch = this.searchQuery === '' ||
        item.title.toLowerCase().includes(this.searchQuery) ||
        (item.desc || '').toLowerCase().includes(this.searchQuery);
      return matchesTag && matchesSearch;
    });
  }

  attachEvents() {
    // Search input
    this.searchInput.addEventListener('input', e => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.render();
    });

    // Tag clicks (event delegation)
    this.tagsContainer.addEventListener('click', e => {
      if (!e.target.classList.contains('tag')) return;
      // Update active tag styling
      this.tagsContainer.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      this.activeTag = e.target.dataset.tag || 'all';
      this.render();
    });
  }

  // Utility: Escape HTML for security
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Call this from outside to update data dynamically
  setResources(newList) {
    this.resources = newList;
    this.render();
  }

  // Skeleton loader placeholder
  showSkeletons(count = 6) {
    this.emptyState.style.display = 'none';
    this.container.innerHTML = Array.from({ length: count }, () => `
      <div class="resource-card" aria-hidden="true">
        <div class="resource-card-img skeleton"></div>
        <div class="resource-card-body">
          <div class="skeleton" style="height:18px; width:70%; margin-bottom:8px;"></div>
          <div class="skeleton" style="height:14px; width:90%; margin-bottom:12px;"></div>
          <div class="skeleton" style="height:14px; width:40%;"></div>
        </div>
      </div>
    `).join('');
  }
}

// ------------------------------
// SAMPLE DATA — Replace with your actual list
// ------------------------------
const SAMPLE_RESOURCES = [
  { title: 'Account Opening Form', desc: 'PDF · 245KB', tag: 'forms', icon: '📄', link: '#' },
  { title: 'Mobile Banking Guide', desc: 'PDF · 1.2MB', tag: 'guides', icon: '📖', link: '#' },
  { title: 'Privacy Policy', desc: 'PDF · 310KB', tag: 'policies', icon: 'ℹ️', link: '#' },
  { title: 'Loan Application Form', desc: 'PDF · 198KB', tag: 'forms', icon: '📄', link: '#' },
  { title: 'Internet Banking Setup', desc: 'PDF · 890KB', tag: 'guides', icon: '🔐', link: '#' },
  { title: 'Terms of Service', desc: 'PDF · 405KB', tag: 'policies', icon: '📋', link: '#' }
];

// Initialize automatically when included in page
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.resourceCenter = new ResourceCenter({
      resources: SAMPLE_RESOURCES
    });
  });
}

// Wrap your entire ResourceCenter code inside this:
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit more for components to load
  setTimeout(function() {
    if (document.querySelector('.resource-center')) {
      // ... your existing resources.js code stays here ...
    }
  }, 200);
});