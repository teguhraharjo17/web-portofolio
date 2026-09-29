/**
 * GITHUB REPOSITORIES LOADER & SEARCH FILTER - TEGUH RAHARJO
 * Menampilkan 15 sistem web enterprise tanpa deskripsi (clean minimal)
 */

(function () {
  let allRepos = [];
  let currentFilter = "all";
  let searchQuery = "";

  const gitGridEl = document.getElementById("git-repos-grid");
  const searchInput = document.getElementById("git-search-input");
  const filterBtns = document.querySelectorAll(".git-filter-btn");

  const LANGUAGE_COLORS = {
    "Laravel / PHP": "#f43f5e",
    "PHP / MySQL": "#4f5d95",
    "PHP / JavaScript": "#4f5d95",
    "PHP / MikroTik API": "#0284c7",
    "PHP / Shell": "#64748b",
    "JavaScript / PHP": "#f59e0b",
    "JavaScript / Web": "#f59e0b",
    "PHP / Web": "#4f5d95"
  };

  async function fetchGitHubRepos() {
    const curatedRepos = window.GIT_REPOSITORIES || [];
    allRepos = [...curatedRepos];

    // Jika dibuka langsung via file:// protocol, hindari network fetch agar tidak memicu CORS/origin warning
    if (window.location.protocol === "file:") {
      renderRepos();
      return;
    }

    try {
      const username = window.PORTFOLIO_CONFIG?.githubUsername || "teguhraharjo17";
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`);
      if (response.ok) {
        const publicRepos = await response.json();
        if (Array.isArray(publicRepos)) {
          publicRepos.forEach((pubRepo) => {
            const existing = allRepos.find((r) => r.name.toLowerCase() === pubRepo.name.toLowerCase());
            if (existing) {
              existing.html_url = pubRepo.html_url;
            } else {
              allRepos.push({
                name: pubRepo.name,
                title: pubRepo.name,
                category: "other",
                language: pubRepo.language || "Code",
                tags: [pubRepo.language || "Web", ...(pubRepo.topics || [])],
                html_url: pubRepo.html_url
              });
            }
          });
        }
      }
    } catch (err) {
      console.warn("Menggunakan data lokal:", err.message);
    }

    renderRepos();
  }

  function renderRepos() {
    if (!gitGridEl) return;

    let filtered = allRepos.filter((repo) => {
      const matchesCategory =
        currentFilter === "all" ||
        repo.category === currentFilter ||
        repo.language?.toLowerCase().includes(currentFilter.toLowerCase()) ||
        repo.tags?.some((t) => t.toLowerCase().includes(currentFilter.toLowerCase()));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        repo.name.toLowerCase().includes(query) ||
        (repo.title && repo.title.toLowerCase().includes(query)) ||
        repo.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      gitGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
          <p style="font-size: 0.95rem;">Tidak ada sistem yang cocok dengan pencarian.</p>
        </div>
      `;
      return;
    }

    // Tampilkan tanpa deskripsi sesuai permintaan user
    gitGridEl.innerHTML = filtered
      .map(
        (repo) => `
      <div class="git-card">
        <div class="git-card-header">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="git-repo-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            ${repo.name}
          </a>
        </div>
        <div class="git-tags-row">
          ${(repo.tags || [])
            .slice(0, 3)
            .map((t) => `<span class="git-tag">${t}</span>`)
            .join("")}
        </div>
        <div class="git-card-footer">
          <div class="git-lang">
            <span class="lang-dot" style="background-color: ${LANGUAGE_COLORS[repo.language] || '#3b82f6'}"></span>
            <span>${repo.language}</span>
          </div>
          <div class="git-stats">
            <a href="${repo.html_url}" target="_blank" rel="noopener" style="color:var(--text-muted); text-decoration:none; font-size:0.75rem; display:flex; align-items:center; gap:4px;">
              <span>Lihat Repo</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  function setupEvents() {
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderRepos();
      });
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter || "all";
        renderRepos();
      });
    });
  }

  function init() {
    setupEvents();
    fetchGitHubRepos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
