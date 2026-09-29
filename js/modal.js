/**
 * MODAL HANDLER - IOT HARDWARE SPECS, WIRING, CODE & EVIDENCE
 */

(function () {
  const modalOverlay = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-project-title");
  const modalCloseBtn = document.getElementById("modal-close");
  const tabBtns = document.querySelectorAll(".modal-tab-btn");
  const tabPanes = document.querySelectorAll(".modal-tab-pane");

  function openProjectModal(projectId) {
    const project = window.IOT_PROJECTS.find((p) => p.id === projectId);
    if (!project || !modalOverlay) return;

    // Set judul
    if (modalTitle) {
      modalTitle.innerHTML = `
        <span>${project.title}</span>
        <span class="status-indicator" style="font-size:0.75rem;">${project.status}</span>
      `;
    }

    // Tab 1: Ringkasan & Solusi
    const overviewPane = document.getElementById("tab-overview");
    if (overviewPane) {
      overviewPane.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h4 style="margin-bottom: 8px; color: var(--accent-cyan);">Latar Belakang & Deskripsi Masalah</h4>
          <p style="color: var(--text-muted); line-height: 1.7;">${project.summary}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="background: rgba(14,20,34,0.7); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Mikrokontroler Utama</div>
            <div style="font-weight: 600; color: #fff; margin-top: 4px;">${project.mcu}</div>
          </div>
          <div style="background: rgba(14,20,34,0.7); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Protokol Transmisi</div>
            <div style="font-weight: 600; color: #fff; margin-top: 4px;">${project.protocol}</div>
          </div>
          <div style="background: rgba(14,20,34,0.7); padding: 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Sumber Daya (Power)</div>
            <div style="font-weight: 600; color: #fff; margin-top: 4px;">${project.power}</div>
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <h4 style="margin-bottom: 12px; color: var(--accent-emerald);">Sensor & Komponen yang Dipakai</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.sensors.map((s) => `<span class="hw-pill">${s}</span>`).join("")}
          </div>
        </div>
      `;
    }

    // Tab 2: Spesifikasi & Pinout Wiring
    const specsPane = document.getElementById("tab-specs");
    if (specsPane) {
      let pinRows = "";
      if (project.pinout && project.pinout.length > 0) {
        pinRows = project.pinout
          .map(
            (p) => `
          <tr>
            <td><span class="pin-chip">${p.pin}</span></td>
            <td><strong style="color:var(--text-main);">${p.function}</strong></td>
            <td style="color:var(--text-muted);">${p.connectedTo}</td>
          </tr>
        `
          )
          .join("");
      }

      let specRows = "";
      if (project.specs && project.specs.length > 0) {
        specRows = project.specs
          .map(
            (s) => `
          <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--border-subtle); font-size:0.88rem;">
            <span style="color:var(--text-muted); font-weight:500;">${s.name}</span>
            <span style="color:var(--text-main); font-weight:600; text-align:right;">${s.value}</span>
          </div>
        `
          )
          .join("");
      }

      specsPane.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h4 style="margin-bottom: 12px; color: var(--accent-cyan);">Spesifikasi Arsitektur Sistem</h4>
          <div style="background: rgba(10,14,23,0.6); padding: 12px 20px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            ${specRows}
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; color: var(--accent-cyan);">Tabel Koneksi Pinout (Wiring Assignment)</h4>
          <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <table class="pinout-table" style="margin-top:0;">
              <thead>
                <tr>
                  <th>Pin / GPIO</th>
                  <th>Mode / Interface</th>
                  <th>Terkoneksi ke Komponen</th>
                </tr>
              </thead>
              <tbody>
                ${pinRows}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Tab 3: Kode C++ Firmware
    const codePane = document.getElementById("tab-code");
    if (codePane) {
      codePane.innerHTML = `
        <div class="code-container">
          <div class="code-header">
            <span>firmware_main.cpp (C++ / FreeRTOS)</span>
            <button class="btn btn-outline btn-sm" id="btn-copy-firmware" style="padding: 4px 10px; font-size: 0.75rem;">
              Salin Kode
            </button>
          </div>
          <pre class="code-block"><code>${escapeHtml(project.firmwareSnippet || "// Kode sedang diperbarui")}</code></pre>
        </div>
      `;

      const copyBtn = document.getElementById("btn-copy-firmware");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(project.firmwareSnippet || "").then(() => {
            window.showToast?.("Kode firmware berhasil disalin!");
            copyBtn.textContent = "Tersalin!";
            setTimeout(() => (copyBtn.textContent = "Salin Kode"), 2000);
          });
        });
      }
    }

    // Tab 4: Bukti Pengujian Lapangan & Uptime
    const evidencePane = document.getElementById("tab-evidence");
    if (evidencePane) {
      evidencePane.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h4 style="margin-bottom: 8px; color: var(--accent-emerald);">Hasil Validasi & Pengujian Lapangan</h4>
          <p style="color: var(--text-muted); line-height: 1.7;">${project.evidenceNotes || "Pengujian aktif di lapangan."}</p>
        </div>
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle); margin-bottom: 16px;">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: auto; display: block;" />
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(14,20,34,0.7); padding: 14px 20px; border-radius: 8px; border: 1px solid var(--border-subtle);">
          <span style="font-size:0.88rem; color:var(--text-muted);">Repositori Git / Dokumentasi Skematik:</span>
          <a href="${project.gitUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
            Buka di GitHub
          </a>
        </div>
      `;
    }

    // Reset ke tab pertama
    switchTab("overview");

    // Tampilkan modal
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function switchTab(tabId) {
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    tabPanes.forEach((pane) => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Event Listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay?.classList.contains("active")) {
      closeModal();
    }
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Ekspor fungsi ke global
  window.openProjectModal = openProjectModal;
})();
