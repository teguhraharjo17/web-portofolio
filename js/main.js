/**
 * MAIN INTERACTIVITY & PORTFOLIO LOGIC - TEGUH RAHARJO
 */

(function () {
  // Toast Notification System
  const toastContainer = document.getElementById("toast-container");

  function showToast(message, duration = 3000) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(20px)";
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
  window.showToast = showToast;

  // 1. Render Hero Profile & Metrics
  function renderHeroData() {
    const metricsContainer = document.getElementById("hero-metrics-container");
    if (metricsContainer && window.PORTFOLIO_CONFIG?.metrics) {
      metricsContainer.innerHTML = window.PORTFOLIO_CONFIG.metrics
        .map(
          (m) => `
        <div class="metric-item">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `
        )
        .join("");
    }
  }

  // 2. Render Android Projects (Slideshow)
  let androidCurrentSlide = 0;
  let androidAutoPlayTimer = null;

  function renderAndroidProjects() {
    const track = document.getElementById("android-slideshow-track");
    const dotsContainer = document.getElementById("android-dots");
    if (!track || !dotsContainer || !window.ANDROID_PROJECTS) return;

    const projects = window.ANDROID_PROJECTS;

    // Render slides
    track.innerHTML = projects
      .map(
        (app, index) => `
      <div class="android-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
        <div class="android-card">
          <div class="android-media" onclick="window.openImageZoom('${app.image}', '${app.title} - ${app.subtitle}')" title="Klik untuk memperbesar gambar">
            <img src="${app.image}" alt="${app.title}" class="android-img" />
            <span class="android-badge-status">
              <span class="status-dot"></span>
              ${app.status}
            </span>
          </div>
          <div class="android-body">
            <div class="android-pill-row">
              <span class="hw-pill">${app.platform}</span>
            </div>
            <h3 class="android-title">${app.title}</h3>
            <div class="android-sub">${app.subtitle}</div>
            <p class="android-desc">${app.description}</p>
            <div class="android-features">
              <div style="font-size:0.8rem; font-weight:600; color:var(--text-main); margin-bottom:8px;">Fitur Utama:</div>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:6px;">
                ${app.features.map(f => `
                  <li style="font-size:0.82rem; color:var(--text-muted); display:flex; align-items:baseline; gap:8px;">
                    <span style="color:var(--text-dim); font-size:0.75rem;">&bull;</span> ${f}
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Render dots
    dotsContainer.innerHTML = projects
      .map(
        (app, index) => `
        <button class="slideshow-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="${app.title}">
          <span class="slideshow-dot-label">${app.title}</span>
        </button>
      `
      )
      .join("");

    // Setup navigation
    setupAndroidSlideshow(projects.length);
  }

  function goToAndroidSlide(index) {
    const slides = document.querySelectorAll(".android-slide");
    const dots = document.querySelectorAll(".slideshow-dot");
    if (!slides.length) return;

    const total = slides.length;
    androidCurrentSlide = ((index % total) + total) % total;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === androidCurrentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === androidCurrentSlide);
    });
  }

  function setupAndroidSlideshow(totalSlides) {
    const prevBtn = document.getElementById("android-prev");
    const nextBtn = document.getElementById("android-next");
    const dotsContainer = document.getElementById("android-dots");
    const slideshowEl = document.getElementById("android-slideshow");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToAndroidSlide(androidCurrentSlide - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToAndroidSlide(androidCurrentSlide + 1);
        resetAutoPlay();
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest(".slideshow-dot");
        if (dot) {
          goToAndroidSlide(parseInt(dot.dataset.slide, 10));
          resetAutoPlay();
        }
      });
    }

    // Auto-play every 6 seconds
    startAutoPlay();

    // Pause on hover
    if (slideshowEl) {
      slideshowEl.addEventListener("mouseenter", () => clearInterval(androidAutoPlayTimer));
      slideshowEl.addEventListener("mouseleave", () => startAutoPlay());
    }

    // Touch swipe support for mobile
    if (slideshowEl) {
      let touchStartX = 0;
      let touchEndX = 0;

      slideshowEl.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slideshowEl.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            goToAndroidSlide(androidCurrentSlide + 1);
          } else {
            goToAndroidSlide(androidCurrentSlide - 1);
          }
          resetAutoPlay();
        }
      }, { passive: true });
    }

    // Keyboard arrow support when slideshow is in viewport
    document.addEventListener("keydown", (e) => {
      if (!slideshowEl) return;
      const rect = slideshowEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        goToAndroidSlide(androidCurrentSlide - 1);
        resetAutoPlay();
      } else if (e.key === "ArrowRight") {
        goToAndroidSlide(androidCurrentSlide + 1);
        resetAutoPlay();
      }
    });
  }

  function startAutoPlay() {
    clearInterval(androidAutoPlayTimer);
    androidAutoPlayTimer = setInterval(() => {
      goToAndroidSlide(androidCurrentSlide + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(androidAutoPlayTimer);
    startAutoPlay();
  }

  // 3. Render IoT Project Cards
  let activeIotFilter = "all";
  function renderIotProjects() {
    const grid = document.getElementById("iot-projects-grid");
    if (!grid || !window.IOT_PROJECTS) return;

    const filtered = window.IOT_PROJECTS.filter(
      (p) => activeIotFilter === "all" || p.category === activeIotFilter
    );

    grid.innerHTML = filtered
      .map(
        (p) => `
      <div class="iot-card" data-category="${p.category}">
        <div class="iot-card-media" onclick="window.openImageZoom('${p.image}', '${p.title}')" style="cursor: zoom-in;" title="Klik untuk memperbesar gambar">
          <img src="${p.image}" alt="${p.title}" class="iot-card-img" loading="lazy" />
          <span class="iot-badge-status">
            <span class="status-dot"></span>
            ${p.status}
          </span>
          <span class="iot-card-category">${p.categoryLabel}</span>
        </div>
        <div class="iot-card-body">
          <h3 class="iot-card-title">${p.title}</h3>
          <p class="iot-card-desc">${p.summary}</p>
          
          <div class="iot-hardware-specs">
            <span class="hw-pill">${p.mcu}</span>
            <span class="hw-pill">${p.protocol}</span>
          </div>

          <div class="card-metrics-grid">
            <div class="c-metric">
              <div class="c-metric-val">${p.metrics.power || p.metrics.batteryLife}</div>
              <div class="c-metric-lbl">${p.metrics.powerLbl || 'Power'}</div>
            </div>
            <div class="c-metric">
              <div class="c-metric-val">${p.metrics.range}</div>
              <div class="c-metric-lbl">${p.metrics.rangeLbl || 'Jangkauan'}</div>
            </div>
            <div class="c-metric">
              <div class="c-metric-val">${p.metrics.telemetry || p.metrics.sampleRate}</div>
              <div class="c-metric-lbl">${p.metrics.telemetryLbl || 'Protokol'}</div>
            </div>
          </div>

          <div class="iot-card-footer">
            <button class="btn btn-primary btn-sm btn-detail" style="width: 100%;" onclick="window.openProjectModal('${p.id}')">
              Lihat Spesifikasi &amp; Pinout
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 4. Filter Buttons IoT
  function setupIotFilters() {
    const filterBtns = document.querySelectorAll(".iot-filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeIotFilter = btn.dataset.filter || "all";
        renderIotProjects();
      });
    });
  }

  // 5. Render Skills Matrix
  function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container || !window.SKILLS_MATRIX) return;

    container.innerHTML = window.SKILLS_MATRIX
      .map(
        (cat) => `
      <div class="skill-category-card">
        <h4 class="skill-cat-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          ${cat.category}
        </h4>
        <div class="skill-items-list">
          ${cat.items
            .map(
              (item) => `
            <div class="skill-row">
              <div class="skill-info">
                <span>${item.name}</span>
                <span class="skill-level-badge">${item.level}</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width: ${item.pct}%"></div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("");
  }

  // 6. Render Timeline (Hanya Jabatan, Perusahaan, dan Rentang Waktu)
  function renderTimeline() {
    const container = document.getElementById("timeline-container");
    if (!container || !window.EXPERIENCE_TIMELINE) return;

    container.innerHTML = window.EXPERIENCE_TIMELINE
      .map(
        (exp) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-period">${exp.period}</div>
          <h4 class="timeline-role">${exp.role}</h4>
          <div class="timeline-inst">${exp.company}</div>
          <div style="font-size:0.78rem; color:var(--text-dim);">${exp.location}</div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 7. Navigation & Mobile Menu + Smooth Scroll Interceptor (Fixes Chromium file:/// security warning)
  function setupNavigation() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    }

    // Intercept all internal anchor clicks to eliminate Chromium file:/// frame navigation security warnings
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
        }

        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const targetId = href.substring(1);
        if (targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 72;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navHeight);
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });

    // Scrollspy with passive listener
    window.addEventListener(
      "scroll",
      () => {
        const sections = document.querySelectorAll("section[id]");
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 120;
          const sectionId = current.getAttribute("id");
          const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
            link?.classList.add("active");
          }
        });
      },
      { passive: true }
    );
  }

  // 8. Contact Actions
  function setupContact() {
    const copyEmailBtn = document.getElementById("btn-copy-email");
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = window.PORTFOLIO_CONFIG?.contacts?.email || "teguhraharjorubiyo27@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
          showToast("Email berhasil disalin ke clipboard!");
        });
      });
    }

    const contactForm = document.getElementById("inquiry-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Terima kasih! Pesan Anda telah terkirim.");
        contactForm.reset();
      });
    }
  }

  // 9. Fullscreen Image Lightbox / Zoom
  function openImageZoom(src, title) {
    const modal = document.getElementById("image-zoom-modal");
    const img = document.getElementById("zoom-modal-img");
    const caption = document.getElementById("zoom-modal-caption");
    if (!modal || !img) return;

    img.src = src;
    img.alt = title || "Zoomed Preview";
    if (caption) caption.textContent = title || "Pratinjau Gambar";

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  window.openImageZoom = openImageZoom;

  function closeImageZoom() {
    const modal = document.getElementById("image-zoom-modal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  window.closeImageZoom = closeImageZoom;

  function setupZoomModal() {
    const modal = document.getElementById("image-zoom-modal");
    const closeBtn = document.getElementById("zoom-close-btn");

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeImageZoom();
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        // If clicking on backdrop or anywhere except inside the image
        if (e.target === modal || !e.target.closest("#zoom-modal-img")) {
          closeImageZoom();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("active")) {
        closeImageZoom();
      }
    });
  }

  function init() {
    renderHeroData();
    renderAndroidProjects();
    renderIotProjects();
    setupIotFilters();
    renderSkills();
    renderTimeline();
    setupNavigation();
    setupContact();
    setupZoomModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
