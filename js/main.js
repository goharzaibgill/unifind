'use strict';

'use strict';

function throttle(fn, limit) { var inThrottle; return function() { var args = arguments; var ctx = this; if (!inThrottle) { fn.apply(ctx, args); inThrottle = true; setTimeout(function() { inThrottle = false; }, limit); } }; }

function escapeHtml(str) { var div = document.createElement('div'); div.textContent = str; return div.innerHTML; }

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function formatNumber(num) { return num.toLocaleString('en-PK'); }

function formatDate(date) { return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }

function debounce(fn, delay) { let timer; return function() { var args = arguments; var ctx = this; clearTimeout(timer); timer = setTimeout(function() { fn.apply(ctx, args); }, delay); }; }

// ==================== THEME TOGGLE ====================
function toggleTheme() {
  try {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.innerHTML = isDark ? '&#9789;' : '&#9788;';
  } catch(e) { console.error('Theme toggle failed:', e); }
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.theme-toggle');
  if (btn && document.documentElement.classList.contains('dark')) {
    btn.innerHTML = '&#9788;';
  }
});

// ==================== GLOBAL ====================
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initHamburger();
  initScrollAnimations();
  initParticles();
  setActiveNavLink();
  updateCompareBar();
});

function initLoadingScreen() {
  const loader = document.querySelector('.loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
    container.appendChild(particle);
  }
}

function initScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') { console.warn('IntersectionObserver not supported'); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function formatFee(fee) {
  return 'Rs. ' + fee.toLocaleString();
}

function getStarHTML(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += '<span class="star">&#9733;</span>';
    } else if (i - rating < 1 && i - rating > 0) {
      html += '<span class="star">&#9733;</span>';
    } else {
      html += '<span class="star" style="opacity:0.3">&#9733;</span>';
    }
  }
  return html;
}

// ==================== COMPARE ====================
let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');

function toggleCompare(id) {
  const idx = compareList.indexOf(id);
  if (idx > -1) {
    compareList.splice(idx, 1);
    showNotification('Removed from Compare', 'removed');
  } else {
    if (compareList.length >= 4) {
      showNotification('Maximum 4 universities can be compared', 'error');
      return;
    }
    compareList.push(id);
    showNotification('Added to Compare ✓', 'success');
  }
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBar();
  updateCompareButtons();
}

function removeFromCompare(id) {
  compareList = compareList.filter(i => i !== id);
  localStorage.setItem('compareList', JSON.stringify(compareList));
  showNotification('Removed from Compare', 'removed');
  updateCompareBar();
  updateCompareButtons();
  if (window.location.pathname.includes('compare.html')) {
    renderCompareTable();
  }
}

function updateCompareBar() {
  const bar = document.querySelector('.compare-bar');
  if (!bar) return;
  if (compareList.length >= 2) {
    bar.classList.add('visible');
    const items = bar.querySelector('.compare-items');
    if (items) {
      items.innerHTML = compareList.map(id => {
        const uni = universities.find(u => u.id === id);
        return `<div class="compare-chip">
          <span>${uni.abbreviation}</span>
          <button onclick="removeFromCompare(${id})">&times;</button>
        </div>`;
      }).join('');
    }
  } else {
    bar.classList.remove('visible');
  }
}

function updateCompareButtons() {
  document.querySelectorAll('.compare-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (compareList.includes(id)) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-accent');
      btn.textContent = 'Remove';
    } else {
      btn.classList.remove('btn-accent');
      btn.classList.add('btn-secondary');
      btn.textContent = 'Compare';
    }
  });
}

// ==================== UNIVERSITY CARD ====================
function createUniversityCard(uni) {
  return `
    <div class="university-card animate-on-scroll">
      <div class="card-header">
        <div class="card-rank-badge" style="background:${uni.color}">#${uni.hec_ranking}</div>
        <div class="card-abbr" style="color:${uni.color}">${uni.abbreviation}</div>
        <div class="card-name">${uni.name}</div>
        <div class="card-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${uni.city}
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            ${uni.sector}
          </div>
        </div>
        <div class="card-rating">
          <div class="rating-stars">${getStarHTML(uni.rating)}</div>
          <span class="rating-value">${uni.rating}</span>
          <span class="rating-count">(${uni.reviews_count})</span>
        </div>
      </div>
      <div class="card-programs">
        ${uni.programs.slice(0, 4).map(p => `<span class="program-tag">${p}</span>`).join('')}
        ${uni.programs.length > 4 ? `<span class="program-tag">+${uni.programs.length - 4}</span>` : ''}
      </div>
      <div class="card-footer">
        <div class="card-fee">${formatFee(uni.fee_per_semester)}<small>/sem</small></div>
        <div class="card-actions">
          <button class="btn btn-secondary btn-sm compare-btn" data-id="${uni.id}" onclick="toggleCompare(${uni.id})">Compare</button>
          <a href="detail.html?id=${uni.id}" class="btn btn-primary btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `;
}

// ==================== HOMEPAGE ====================
function renderTopUniversities() {
  const grid = document.getElementById('top-universities');
  if (!grid) return;
  const top = universities.slice(0, 6);
  grid.innerHTML = top.map(uni => createUniversityCard(uni)).join('');
  setTimeout(() => initScrollAnimations(), 100);
  updateCompareButtons();
}

function initHeroSearch() {
  const input = document.getElementById('hero-search');
  if (!input) return;
  const wrapper = input.closest('.search-box') || input.parentElement;
  initSearchSuggestions(input, wrapper);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      window.location.href = `universities.html?search=${encodeURIComponent(input.value)}`;
    }
  });
  const btn = document.getElementById('hero-search-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = `universities.html?search=${encodeURIComponent(input.value)}`;
    });
  }
}

// ==================== UNIVERSITIES PAGE ====================
function initUniversitiesPage() {
  const searchInput = document.getElementById('search-input');
  const cityFilter = document.getElementById('city-filter');
  const sectorFilter = document.getElementById('sector-filter');
  const programFilter = document.getElementById('program-filter');
  const feeFilter = document.getElementById('fee-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (searchInput) {
    const wrapper = searchInput.closest('.filter-group') || searchInput.parentElement;
    wrapper.style.position = 'relative';
    initSearchSuggestions(searchInput, wrapper);
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (searchInput && urlParams.get('search')) {
    searchInput.value = urlParams.get('search');
  }

  function filterAndRender() {
    let filtered = [...universities];
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const city = cityFilter ? cityFilter.value : '';
    const sector = sectorFilter ? sectorFilter.value : '';
    const program = programFilter ? programFilter.value : '';
    const fee = feeFilter ? feeFilter.value : '';
    const sort = sortFilter ? sortFilter.value : '';

    if (search) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.abbreviation.toLowerCase().includes(search) ||
        u.city.toLowerCase().includes(search) ||
        u.programs.some(p => p.toLowerCase().includes(search))
      );
    }
    if (city) filtered = filtered.filter(u => u.city === city);
    if (sector) filtered = filtered.filter(u => u.sector === sector);
    if (program) filtered = filtered.filter(u => u.programs.includes(program));
    if (fee) {
      const range = feeRanges.find(r => r.label === fee);
      if (range) {
        filtered = filtered.filter(u => u.fee_per_semester >= range.min && u.fee_per_semester < range.max);
      }
    }
    if (sort === 'ranking') filtered.sort((a, b) => a.hec_ranking - b.hec_ranking);
    if (sort === 'fee-low') filtered.sort((a, b) => a.fee_per_semester - b.fee_per_semester);
    if (sort === 'fee-high') filtered.sort((a, b) => b.fee_per_semester - a.fee_per_semester);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    const grid = document.getElementById('universities-grid');
    const count = document.getElementById('results-count');
    if (count) count.innerHTML = `Showing <strong>${filtered.length}</strong> universities`;
    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state">
          <div class="empty-state-icon">&#128269;</div>
          <h3>No universities found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>`;
      } else {
        grid.innerHTML = filtered.map(uni => createUniversityCard(uni)).join('');
        updateCompareButtons();
      }
    }
    initScrollAnimations();
  }

  [searchInput, cityFilter, sectorFilter, programFilter, feeFilter, sortFilter].forEach(el => {
    if (el) el.addEventListener('input', filterAndRender);
    if (el) el.addEventListener('change', filterAndRender);
  });

  filterAndRender();
}

// ==================== DETAIL PAGE ====================
function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  if (!id) return;
  const uni = universities.find(u => u.id === id);
  if (!uni) return;

  addToRecentlyViewed(id);
  injectDetailPageSEO(uni);

  const hero = document.querySelector('.detail-hero');
  if (hero) {
    hero.style.background = `linear-gradient(135deg, ${uni.color}15, ${uni.color}08)`;
  }

  const info = document.getElementById('detail-info');
  if (info) {
    info.innerHTML = `
      <div class="detail-abbr">${uni.abbreviation}</div>
      <div class="detail-name">${uni.name}</div>
      <div class="detail-meta">
        <div class="detail-meta-item">&#128205; ${uni.location || uni.city}</div>
        <div class="detail-meta-item">&#127979; ${uni.sector} University</div>
        <div class="detail-meta-item">&#128197; Est. ${uni.established}</div>
        <div class="detail-meta-item">&#127963; ${uni.campus_area}</div>
      </div>
      <div class="detail-rating">
        ${getStarHTML(uni.rating)} ${uni.rating} (${uni.reviews_count} reviews)
      </div>
      <div class="detail-actions">
        <a href="${uni.website}" target="_blank" class="btn btn-success">Visit Website</a>
        <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.5);color:white" onclick="toggleCompare(${uni.id})">Compare</button>
        <a href="${getWhatsAppShareURL(uni)}" target="_blank" class="btn btn-whatsapp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Share
        </a>
      </div>
    `;
  }

  renderBreadcrumbs(uni);

  const overview = document.getElementById('tab-overview');
  if (overview) {
    overview.innerHTML = `
      <p style="font-size:1rem;color:var(--ink-muted);line-height:1.8;margin-bottom:32px">${uni.description}</p>
      <div class="overview-grid">
        <div class="overview-card">
          <div class="icon" style="background:rgba(39,174,96,0.1);color:var(--primary)">&#127979;</div>
          <h4>HEC Ranking</h4>
          <p>#${uni.hec_ranking} in Pakistan</p>
        </div>
        <div class="overview-card">
          <div class="icon" style="background:rgba(39,174,96,0.1);color:var(--secondary)">&#128176;</div>
          <h4>Fee Per Semester</h4>
          <p>${formatFee(uni.fee_per_semester)}</p>
        </div>
        <div class="overview-card">
          <div class="icon" style="background:rgba(243,156,18,0.1);color:var(--accent)">&#128200;</div>
          <h4>Acceptance Rate</h4>
          <p>${uni.acceptance_rate}%</p>
        </div>
        <div class="overview-card">
          <div class="icon" style="background:rgba(155,89,182,0.1);color:#9b59b6">&#128101;</div>
          <h4>Students</h4>
          <p>${uni.students.toLocaleString()}</p>
        </div>
        <div class="overview-card">
          <div class="icon" style="background:rgba(231,76,60,0.1);color:#e74c3c">&#128104;&#8205;&#127891;</div>
          <h4>Faculty</h4>
          <p>${uni.faculty.toLocaleString()}</p>
        </div>
        <div class="overview-card">
          <div class="icon" style="background:rgba(52,152,219,0.1);color:#3498db">&#128205;</div>
          <h4>Location</h4>
          <p>${uni.location || uni.city}</p>
        </div>
      </div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:16px">Facilities</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px">
        ${Object.entries(uni.facilities).map(([key, val]) => `
          <div style="display:flex;align-items:center;gap:8px;padding:12px;border-radius:8px;background:${val ? 'rgba(39,174,96,0.06)' : 'var(--cream-100)'}">
            <span style="color:${val ? '#27ae60' : '#ccc'}; font-size:1.2rem">${val ? '&#10003;' : '&#10007;'}</span>
            <span style="font-size:0.85rem;color:${val ? 'var(--ink)' : 'var(--ink-muted)'};text-transform:capitalize">${key}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  const programsTab = document.getElementById('tab-programs');
  if (programsTab) {
    programsTab.innerHTML = `
      <div class="programs-list">
        ${uni.programs.map(p => `
          <div class="program-item">
            <div class="program-icon">&#127891;</div>
            <div>
              <strong style="font-size:0.95rem">${p}</strong>
              <p style="font-size:0.8rem;color:var(--ink-muted)">Bachelor's & Master's</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const admissionTab = document.getElementById('tab-admission');
  if (admissionTab) {
    const now = new Date();
    const admissionDeadlines = [
      { name: 'Fall Semester Applications', date: '2026-08-15', type: 'regular' },
      { name: 'Spring Semester Applications', date: '2027-01-15', type: 'regular' },
      { name: 'Late Admission Window', date: '2026-09-01', type: 'late' },
      { name: 'Scholarship Applications', date: '2026-07-30', type: 'early' }
    ];
    admissionTab.innerHTML = `
      <div class="admission-list">
        ${admissionDeadlines.map(d => {
          const deadline = new Date(d.date);
          const days = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
          return `
            <div class="admission-item">
              <div class="admission-type type-${d.type}"></div>
              <div class="admission-info">
                <h4>${d.name}</h4>
                <p>${uni.abbreviation} - ${uni.name}</p>
              </div>
              <div class="admission-date">
                <span class="date">${new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span class="days ${days < 0 ? 'days-past' : days < 14 ? 'days-urgent' : days < 30 ? 'days-soon' : 'days-normal'}">
                  ${days < 0 ? 'Closed' : days + ' days'}
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const reviewsTab = document.getElementById('tab-reviews');
  if (reviewsTab) {
    const sampleReviews = [
      { name: 'Ahmed K.', rating: 5, text: 'Excellent university with world-class facilities. The faculty is highly supportive and the campus environment is amazing.', date: '2 weeks ago' },
      { name: 'Fatima S.', rating: 4, text: 'Great academic experience. Could improve on some administrative processes, but overall a wonderful place to study.', date: '1 month ago' },
      { name: 'Ali R.', rating: 5, text: 'Best decision of my life to join here. Industry connections and placement opportunities are outstanding.', date: '3 months ago' }
    ];
    reviewsTab.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:20px">
        ${sampleReviews.map(r => `
          <div style="padding:24px;background:var(--cream-100);border-radius:12px;border:1px solid var(--border-subtle)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:40px;height:40px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem">${r.name.charAt(0)}</div>
                <div>
                  <strong style="font-size:0.95rem">${r.name}</strong>
                  <div style="font-size:0.8rem;color:var(--ink-muted)">${r.date}</div>
                </div>
              </div>
              <div class="rating-stars">${getStarHTML(r.rating)}</div>
            </div>
            <p style="font-size:0.9rem;color:var(--ink-muted);line-height:1.6">${r.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  initDetailTabs();
}

function initDetailTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ==================== COMPARE PAGE ====================
function initComparePage() {
  const dlBtn = document.getElementById('download-compare-btn');
  if (dlBtn) dlBtn.style.display = compareList.length >= 2 ? '' : 'none';
  renderCompareTable();
}

function renderCompareTable() {
  const wrapper = document.getElementById('compare-content');
  if (!wrapper) return;
  if (compareList.length < 2) {
    wrapper.innerHTML = `
      <div class="compare-empty">
        <div class="compare-empty-icon">&#128203;</div>
        <h3>No Universities Selected</h3>
        <p>Add at least 2 universities from the listing page to compare them side by side.</p>
        <a href="universities.html" class="btn btn-primary btn-lg">Browse Universities</a>
      </div>
    `;
    return;
  }

  const unis = compareList.map(id => universities.find(u => u.id === id)).filter(Boolean);
  const features = [
    { key: 'city', label: 'City' },
    { key: 'sector', label: 'Sector' },
    { key: 'hec_ranking', label: 'HEC Ranking' },
    { key: 'fee_per_semester', label: 'Fee/Semester', format: formatFee },
    { key: 'rating', label: 'Rating' },
    { key: 'reviews_count', label: 'Reviews' },
    { key: 'students', label: 'Students', format: v => v.toLocaleString() },
    { key: 'faculty', label: 'Faculty', format: v => v.toLocaleString() },
    { key: 'acceptance_rate', label: 'Acceptance Rate', format: v => v + '%' },
    { key: 'established', label: 'Established' },
    { key: 'campus_area', label: 'Campus Area' }
  ];

  const bestValues = {};
  features.forEach(f => {
    if (f.key === 'hec_ranking' || f.key === 'fee_per_semester' || f.key === 'acceptance_rate') {
      const vals = unis.map(u => u[f.key]);
      bestValues[f.key] = Math.min(...vals);
    } else if (f.key === 'rating' || f.key === 'reviews_count' || f.key === 'students' || f.key === 'faculty') {
      const vals = unis.map(u => u[f.key]);
      bestValues[f.key] = Math.max(...vals);
    }
  });

  wrapper.innerHTML = `
    <div class="compare-table-wrapper">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${unis.map(u => `
              <th style="background:${u.color}">
                <div class="compare-university-header">
                  <span class="uni-name">${u.abbreviation}</span>
                  <span class="uni-city">${u.city}</span>
                  <button class="compare-remove-btn" onclick="removeFromCompare(${u.id})">Remove</button>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${features.map(f => `
            <tr>
              <td>${f.label}</td>
              ${unis.map(u => {
                const val = f.format ? f.format(u[f.key]) : u[f.key];
                const isBest = bestValues[f.key] === u[f.key] && (f.key === 'hec_ranking' || f.key === 'fee_per_semester' || f.key === 'rating' || f.key === 'students');
                return `<td class="${isBest ? 'best-value' : ''}">${val}${isBest ? ' &#9733;' : ''}</td>`;
              }).join('')}
            </tr>
          `).join('')}
          <tr>
            <td>Programs</td>
            ${unis.map(u => `<td>${u.programs.join(', ')}</td>`).join('')}
          </tr>
          <tr>
            <td>Hostel</td>
            ${unis.map(u => `<td style="color:${u.facilities.hostel ? '#27ae60' : '#e74c3c'};font-weight:600">${u.facilities.hostel ? '&#10003; Available' : '&#10007; Not Available'}</td>`).join('')}
          </tr>
          <tr>
            <td>Actions</td>
            ${unis.map(u => `<td><a href="detail.html?id=${u.id}" class="btn btn-primary btn-sm">View Details</a></td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ==================== MERIT CALCULATOR ====================
function initMeritCalculator() {
  const matricInput = document.getElementById('matric-marks');
  const fscInput = document.getElementById('fsc-marks');
  const entryInput = document.getElementById('entry-test');
  if (!matricInput || !fscInput || !entryInput) { console.warn('Merit calculator: inputs not found'); return; }

  const calcBtn = document.getElementById('calc-merit-btn');

  function calculateMerit() {
    const matric = Math.min(parseFloat(matricInput.value) || 0, 1200);
    const fsc = Math.min(parseFloat(fscInput.value) || 0, 1200);
    const entry = Math.min(parseFloat(entryInput.value) || 0, 100);

    const matricPct = (matric / 1200) * 100;
    const fscPct = (fsc / 1200) * 100;

    const aggregate = (matricPct * 0.10) + (fscPct * 0.40) + (entry * 0.50);

    const resultEl = document.getElementById('merit-result');
    const pctEl = document.getElementById('merit-percentage');
    const labelEl = document.getElementById('merit-label');
    if (pctEl) pctEl.textContent = aggregate.toFixed(1) + '%';
    if (labelEl) labelEl.textContent = `Matric: ${matricPct.toFixed(1)}% × 10% + FSc: ${fscPct.toFixed(1)}% × 40% + Entry: ${entry}% × 50%`;

    const eligibleGrid = document.getElementById('eligible-universities');
    if (!eligibleGrid) return;

    let html = '';
    universities.forEach(uni => {
      const threshold = uni.acceptance_rate;
      const required = 100 - threshold * 2;
      let status, statusClass, statusText;

      if (aggregate >= required) {
        status = 'likely';
        statusClass = 'status-green';
        statusText = 'Likely Eligible';
      } else if (aggregate >= required - 5) {
        status = 'possible';
        statusClass = 'status-yellow';
        statusText = 'Possible';
      } else {
        status = 'unlikely';
        statusClass = 'status-red';
        statusText = 'Below Threshold';
      }

      html += `
        <div class="eligible-card">
          <div class="eligible-status ${statusClass}"></div>
          <div class="eligible-info">
            <h4>${uni.abbreviation} - ${uni.name}</h4>
            <p>Acceptance Rate: ${uni.acceptance_rate}%</p>
            <p class="merit-req" style="color:${status === 'likely' ? '#27ae60' : status === 'possible' ? '#f39c12' : '#e74c3c'}">${statusText}</p>
          </div>
        </div>
      `;
    });
    eligibleGrid.innerHTML = html;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      calculateMerit();
      showNotification('Merit calculated successfully ✓', 'success');
    });
  }

  [matricInput, fscInput, entryInput].forEach(el => el.addEventListener('input', calculateMerit));
  calculateMerit();
}

// ==================== SCHOLARSHIPS PAGE ====================
function initScholarshipsPage() {
  const grid = document.getElementById('scholarships-grid');
  if (!grid) return;

  const searchInput = document.getElementById('scholarship-search');
  const filterSelect = document.getElementById('scholarship-filter');

  function render() {
    let filtered = [...scholarships];
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const type = filterSelect ? filterSelect.value : '';

    if (search) {
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(search) ||
        s.provider.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.eligibility.toLowerCase().includes(search)
      );
    }
    if (type) filtered = filtered.filter(s => s.type === type);

    grid.innerHTML = filtered.map(s => {
      const deadline = new Date(s.deadline);
      const now = new Date();
      const days = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      const badgeClass = s.type === 'Need-Based' ? 'badge-need' : s.type === 'Merit-Based' ? 'badge-merit' : s.type === 'Government' ? 'badge-gov' : s.type === 'International' ? 'badge-merit' : s.type === 'Corporate' ? 'badge-gov' : 'badge-special';
      const statusClass = days < 0 ? 'deadline-closed' : days < 14 ? 'deadline-closing' : 'deadline-open';
      return `
        <div class="scholarship-card" data-type="${s.type}">
          <span class="scholarship-badge ${badgeClass}">${s.type}</span>
          <h3>${s.title}</h3>
          <div class="scholarship-provider">${s.provider}</div>
          <div class="scholarship-amount">${s.amount}</div>
          <div class="scholarship-details">
            <p>${s.description}</p>
            <p style="margin-top:8px;font-size:0.82rem;color:var(--ink-muted)"><strong>Eligibility:</strong> ${s.eligibility}</p>
            ${s.contact ? `<p style="margin-top:4px;font-size:0.82rem;color:var(--ink-muted)"><strong>Contact:</strong> ${s.contact}</p>` : ''}
          </div>
          ${s.docs && s.docs.length > 0 ? `
          <div style="margin-bottom:16px">
            <p style="font-size:0.78rem;font-weight:600;color:var(--ink-muted);margin-bottom:6px">Required Documents:</p>
            <div style="display:flex;flex-wrap:wrap;gap:4px">
              ${s.docs.map(d => `<span style="padding:3px 8px;background:var(--cream-100);border-radius:4px;font-size:0.7rem;color:var(--ink-muted)">${d}</span>`).join('')}
            </div>
          </div>` : ''}
          <div class="scholarship-footer">
            <div>
              <div class="deadline ${statusClass}">
                &#128197; ${deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <span class="countdown" style="font-size:0.78rem">${days < 0 ? 'Closed' : days + ' days left'}</span>
            </div>
            ${s.link ? `<a href="${s.link}" target="_blank" class="btn btn-primary btn-sm">Apply Now</a>` : ''}
          </div>
        </div>
      `;
    }).join('');

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">&#127891;</div>
        <h3>No scholarships found</h3>
        <p>Try adjusting your search or filter</p>
      </div>`;
    }
  }

  if (searchInput) searchInput.addEventListener('input', render);
  if (filterSelect) filterSelect.addEventListener('change', render);
  render();
}

// ==================== ADMISSIONS PAGE ====================
function initAdmissionsPage() {
  const timeline = document.getElementById('admissions-timeline');
  const monthNav = document.getElementById('adm-month-nav');
  if (!timeline) return;

  const searchInput = document.getElementById('adm-search');
  const monthFilter = document.getElementById('adm-month');
  const typeFilter = document.getElementById('adm-type');
  const sectorFilter = document.getElementById('adm-sector');
  const sortFilter = document.getElementById('adm-sort');

  const deadlines = [];
  universities.forEach(uni => {
    deadlines.push(
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'Fall Semester Applications', date: '2026-08-15', type: 'regular', level: 'ug', website: uni.website },
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'Spring Semester Applications', date: '2027-01-15', type: 'regular', level: 'ug', website: uni.website },
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'Late Admission Window', date: '2026-09-01', type: 'late', level: 'ug', website: uni.website },
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'Scholarship Deadline', date: '2026-07-30', type: 'early', level: 'ug', website: uni.website },
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'MS/MPhil Applications', date: '2026-10-15', type: 'regular', level: 'pg', website: uni.website },
      { uni: uni.abbreviation, fullName: uni.name, city: uni.city, sector: uni.sector, program: 'PhD Applications', date: '2026-11-30', type: 'regular', level: 'phd', website: uni.website }
    );
  });

  const now = new Date();
  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthColors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60', '#1abc9c', '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#e74c3c', '#c0392b'];

  function getFiltered() {
    let filtered = [...deadlines];
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const month = monthFilter ? monthFilter.value : '';
    const type = typeFilter ? typeFilter.value : '';
    const sector = sectorFilter ? sectorFilter.value : '';
    const sort = sortFilter ? sortFilter.value : '';

    if (search) {
      filtered = filtered.filter(d =>
        d.uni.toLowerCase().includes(search) ||
        d.fullName.toLowerCase().includes(search) ||
        d.program.toLowerCase().includes(search) ||
        d.city.toLowerCase().includes(search)
      );
    }
    if (month) filtered = filtered.filter(d => new Date(d.date).getMonth() + 1 === parseInt(month));
    if (type) filtered = filtered.filter(d => d.type === type);
    if (sector) filtered = filtered.filter(d => d.sector === sector);

    if (sort === 'date') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === 'name') filtered.sort((a, b) => a.uni.localeCompare(b.uni));

    return filtered;
  }

  function updateStats(filtered) {
    const urgent = filtered.filter(d => { const days = Math.ceil((new Date(d.date) - now) / 86400000); return days >= 0 && days <= 7; }).length;
    const thisMonth = filtered.filter(d => { const dd = new Date(d.date); return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear(); }).length;
    const upcoming = filtered.filter(d => new Date(d.date) > now).length;
    document.getElementById('stat-urgent').textContent = urgent;
    document.getElementById('stat-month').textContent = thisMonth;
    document.getElementById('stat-upcoming').textContent = upcoming;
    document.getElementById('stat-total').textContent = filtered.length;
  }

  function renderMonthNav(filtered) {
    const months = {};
    filtered.forEach(d => {
      const dd = new Date(d.date);
      const key = dd.getFullYear() + '-' + (dd.getMonth() + 1);
      if (!months[key]) months[key] = { name: monthNames[dd.getMonth() + 1] + ' ' + dd.getFullYear(), count: 0, month: dd.getMonth() + 1 };
      months[key].count++;
    });
    const currentMonth = monthFilter ? parseInt(monthFilter.value) : '';
    monthNav.innerHTML = `<button class="month-tab ${!currentMonth ? 'active' : ''}" onclick="document.getElementById('adm-month').value='';document.getElementById('adm-month').dispatchEvent(new Event('change'))">All <span class="count">${filtered.length}</span></button>` +
      Object.entries(months).map(([k, v]) =>
        `<button class="month-tab ${currentMonth == v.month ? 'active' : ''}" onclick="document.getElementById('adm-month').value='${v.month}';document.getElementById('adm-month').dispatchEvent(new Event('change'))">${v.name} <span class="count">${v.count}</span></button>`
      ).join('');
  }

  function render() {
    const filtered = getFiltered();
    updateStats(filtered);
    renderMonthNav(filtered);

    if (filtered.length === 0) {
      timeline.innerHTML = `<div class="admission-empty">
        <div class="admission-empty-icon">&#128197;</div>
        <h3>No admission deadlines found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>`;
      return;
    }

    const grouped = {};
    filtered.forEach(d => {
      const dd = new Date(d.date);
      const key = dd.getFullYear() + '-' + String(dd.getMonth() + 1).padStart(2, '0');
      if (!grouped[key]) grouped[key] = { name: monthNames[dd.getMonth() + 1] + ' ' + dd.getFullYear(), month: dd.getMonth(), items: [] };
      grouped[key].items.push(d);
    });

    const sortedKeys = Object.keys(grouped).sort();

    timeline.innerHTML = sortedKeys.map(key => {
      const g = grouped[key];
      const color = monthColors[g.month] || '#3498db';
      return `
        <div class="admission-month-group">
          <div class="admission-month-header">
            <div class="admission-month-icon" style="background:${color}">${g.name.split(' ')[0].substring(0, 3).toUpperCase()}</div>
            <div class="admission-month-title">${g.name}</div>
            <div class="admission-month-count">${g.items.length} deadlines</div>
          </div>
          ${g.items.map(d => {
            const deadline = new Date(d.date);
            const days = Math.ceil((deadline - now) / 86400000);
            const daysClass = days < 0 ? 'days-past' : days < 7 ? 'days-urgent' : days < 21 ? 'days-soon' : 'days-normal';
            const levelBadge = d.level === 'ug' ? 'badge-ug' : d.level === 'pg' ? 'badge-pg' : 'badge-phd';
            const levelText = d.level === 'ug' ? 'Undergraduate' : d.level === 'pg' ? 'MS/MPhil' : 'PhD';
            const dayName = deadline.toLocaleDateString('en-US', { weekday: 'long' });
            const dateStr = deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return `
              <div class="admission-card">
                <div class="admission-card-type type-${d.type}"></div>
                <div class="admission-card-info">
                  <h4>${d.program}</h4>
                  <p>${d.fullName} &mdash; ${d.city}</p>
                  <span class="admission-card-badge ${levelBadge}">${levelText}</span>
                </div>
                <div class="admission-card-date">
                  <span class="day-name">${dayName}</span>
                  <span class="date">${dateStr}</span>
                  <span class="days-badge ${daysClass}">${days < 0 ? 'Closed' : days === 0 ? 'Today!' : days + ' days left'}</span>
                </div>
                <div class="admission-card-link">
                  <a href="${d.website}" target="_blank">Apply &#8594;</a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('');
  }

  [searchInput, monthFilter, typeFilter, sectorFilter, sortFilter].forEach(el => {
    if (el) el.addEventListener('input', render);
    if (el) el.addEventListener('change', render);
  });

  render();
}

// ==================== NOTIFICATION ====================
function showNotification(msg, type = 'success') {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.className = 'notification';
  if (type === 'error') notif.classList.add('error');
  else if (type === 'removed') notif.classList.add('removed');
  else notif.classList.add('show-success');
  notif.classList.add('show');
  clearTimeout(notif._timeout);
  notif._timeout = setTimeout(() => notif.classList.remove('show'), 3000);
}

// ==================== RECENTLY VIEWED ====================
function addToRecentlyViewed(id) {
  let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  recent = recent.filter(i => i !== id);
  recent.unshift(id);
  if (recent.length > 5) recent = recent.slice(0, 5);
  localStorage.setItem('recentlyViewed', JSON.stringify(recent));
}

function renderRecentlyViewed() {
  var section = document.getElementById('recently-viewed-section'); if (!section) return;
  const section = document.getElementById('recently-viewed-section');
  const container = document.getElementById('recently-viewed');
  if (!section || !container) return;
  const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  if (recent.length === 0) { section.style.display = 'none'; return; }
  section.style.display = '';
  const unis = recent.map(id => universities.find(u => u.id === id)).filter(Boolean);
  container.innerHTML = unis.map(uni => createUniversityCard(uni)).join('');
  setTimeout(() => initScrollAnimations(), 100);
  updateCompareButtons();
}

// ==================== SEARCH SUGGESTIONS ====================
function initSearchSuggestions(input, wrapper) {
  if (!input || !wrapper) return;
  let dropdown = wrapper.querySelector('.search-suggestions');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'search-suggestions';
    wrapper.appendChild(dropdown);
  }
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (q.length < 2) { dropdown.innerHTML = ''; dropdown.style.display = 'none'; return; }
    const matches = universities.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.abbreviation.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.programs.some(p => p.toLowerCase().includes(q))
    ).slice(0, 6);
    if (matches.length === 0) { dropdown.innerHTML = ''; dropdown.style.display = 'none'; return; }
    dropdown.innerHTML = matches.map(u => `
      <div class="suggestion-item" onclick="window.location.href='detail.html?id=${u.id}'">
        <strong>${u.abbreviation}</strong> &mdash; ${u.name}
        <span class="suggestion-city">${u.city}</span>
      </div>
    `).join('');
    dropdown.style.display = 'block';
  });
  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.suggestion-item');
    const active = dropdown.querySelector('.suggestion-item.active');
    let idx = Array.from(items).indexOf(active);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (active) active.classList.remove('active');
      idx = (idx + 1) % items.length;
      items[idx].classList.add('active');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (active) active.classList.remove('active');
      idx = (idx - 1 + items.length) % items.length;
      items[idx].classList.add('active');
    } else if (e.key === 'Enter' && active) {
      e.preventDefault();
      active.click();
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) dropdown.style.display = 'none';
  });
}

// ==================== BREADCRUMBS ====================
function renderBreadcrumbs(uni) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  bc.innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-sep">&#8250;</span>
    <a href="universities.html">Universities</a>
    <span class="breadcrumb-sep">&#8250;</span>
    <span class="breadcrumb-current">${uni.name}</span>
  `;
}

// ==================== WHATSAPP SHARE ====================
function getWhatsAppShareURL(uni) {
  const msg = `Check out ${uni.name} on UniFind Pakistan: ${window.location.href}`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

// ==================== DYNAMIC SEO (DETAIL PAGE) ====================
function injectDetailPageSEO(uni) {
  document.title = `${uni.abbreviation} - UniFind Pakistan | Free University Finder`;
  const setMeta = (id, content) => { const el = document.getElementById(id); if (el) el.setAttribute('content', content); };
  const desc = `Learn about ${uni.name} - HEC Ranking #${uni.hec_ranking}, fee per semester ${formatFee(uni.fee_per_semester)}, ${uni.programs.length}+ programs, ${uni.students.toLocaleString()} students. Located in ${uni.city}.`;
  const keywords = `${uni.abbreviation}, ${uni.name}, ${uni.city} university, ${uni.sector} university Pakistan, HEC ranking, programs`;
  setMeta('meta-description', desc);
  setMeta('meta-keywords', keywords);
  setMeta('og-title', `${uni.abbreviation} - UniFind Pakistan`);
  setMeta('og-description', desc);
  setMeta('tw-title', `${uni.abbreviation} - UniFind Pakistan`);
  setMeta('tw-description', desc);
  const canonical = document.getElementById('meta-canonical');
  if (canonical) canonical.setAttribute('href', `https://unifind.pk/detail.html?id=${uni.id}`);
  const ogUrl = document.getElementById('og-url');
  if (ogUrl) ogUrl.setAttribute('content', `https://unifind.pk/detail.html?id=${uni.id}`);
  const h1 = document.getElementById('detail-h1');
  if (h1) h1.textContent = uni.abbreviation;
  const jsonLd = document.getElementById('json-ld');
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": uni.name,
      "alternateName": uni.abbreviation,
      "url": uni.website,
      "address": { "@type": "PostalAddress", "addressLocality": uni.city, "addressCountry": "PK" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": uni.rating, "reviewCount": uni.reviews_count }
    });
  }
}

// ==================== PDF EXPORT ====================
function downloadComparePDF() {
  if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
    showNotification('PDF library loading, please try again', 'error');
    return;
  }
  const { jsPDF: JsPDF } = (typeof jspdf !== 'undefined') ? jspdf : { jsPDF: window.jsPDF };
  const doc = new JsPDF('landscape');
  const unis = compareList.map(id => universities.find(u => u.id === id)).filter(Boolean);
  if (unis.length === 0) return;
  doc.setFontSize(18);
  doc.text('UniFind Pakistan - University Comparison', 14, 20);
  doc.setFontSize(10);
  doc.text('Generated on ' + new Date().toLocaleDateString(), 14, 28);
  const rows = [
    ['City', ...unis.map(u => u.city)],
    ['Sector', ...unis.map(u => u.sector)],
    ['HEC Ranking', ...unis.map(u => '#' + u.hec_ranking)],
    ['Fee/Semester', ...unis.map(u => formatFee(u.fee_per_semester))],
    ['Rating', ...unis.map(u => String(u.rating))],
    ['Reviews', ...unis.map(u => String(u.reviews_count))],
    ['Students', ...unis.map(u => u.students.toLocaleString())],
    ['Faculty', ...unis.map(u => u.faculty.toLocaleString())],
    ['Acceptance Rate', ...unis.map(u => u.acceptance_rate + '%')],
    ['Established', ...unis.map(u => String(u.established))],
    ['Campus Area', ...unis.map(u => u.campus_area)],
    ['Programs', ...unis.map(u => u.programs.join(', '))],
    ['Hostel', ...unis.map(u => u.facilities.hostel ? 'Yes' : 'No')]
  ];
  doc.autoTable({
    startY: 34,
    head: [['Feature', ...unis.map(u => u.abbreviation)]],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [31, 77, 63] },
    styles: { fontSize: 8, cellPadding: 3 }
  });
  doc.save('UniFind-Comparison.pdf');
  showNotification('PDF downloaded successfully!', 'success');
}

function downloadMeritPDF() {
  if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
    showNotification('PDF library loading, please try again', 'error');
    return;
  }
  const { jsPDF: JsPDF } = (typeof jspdf !== 'undefined') ? jspdf : { jsPDF: window.jsPDF };
  const doc = new JsPDF();
  const matric = parseFloat(document.getElementById('matric-marks')?.value) || 0;
  const fsc = parseFloat(document.getElementById('fsc-marks')?.value) || 0;
  const entry = Math.min(parseFloat(document.getElementById('entry-test')?.value) || 0, 100);
  const aggregate = ((matric/1200)*100*0.10) + ((fsc/1200)*100*0.40) + (entry*0.50);
  const nameInput = document.getElementById('student-name');
  const studentName = (nameInput ? nameInput.value.trim() : '') || 'Student';
  doc.setFontSize(18);
  doc.text('UniFind Pakistan - Merit Result', 14, 20);
  doc.setFontSize(10);
  doc.text('Student Name: ' + studentName, 14, 28);
  doc.text('Generated on ' + new Date().toLocaleDateString(), 14, 36);
  doc.setFontSize(12);
  doc.text(`Matric Marks: ${matric}/1200`, 14, 48);
  doc.text(`FSc Marks: ${fsc}/1200`, 14, 56);
  doc.text(`Entry Test: ${entry}/100`, 14, 64);
  doc.setFontSize(16);
  doc.text(`Aggregate: ${aggregate.toFixed(1)}%`, 14, 78);
  const eligible = universities.filter(u => {
    const required = 100 - u.acceptance_rate * 2;
    return aggregate >= required - 5;
  });
  const rows = eligible.map(u => {
    const required = 100 - u.acceptance_rate * 2;
    const status = aggregate >= required ? 'Likely Eligible' : 'Possible';
    return [u.abbreviation, u.name, u.city, u.acceptance_rate + '%', status];
  });
  if (rows.length > 0) {
    doc.autoTable({
      startY: 90,
      head: [['Abbr', 'University', 'City', 'Acceptance Rate', 'Status']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [31, 77, 63] },
      styles: { fontSize: 8, cellPadding: 3 }
    });
  }
  doc.save('UniFind-Merit-Result.pdf');
  showNotification('Merit result PDF downloaded!', 'success');
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
