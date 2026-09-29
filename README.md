# ⚡ Portofolio IoT & Git Engineering

Website portofolio modern berkinerja tinggi yang dirancang khusus untuk memamerkan seluruh proyek repositori **Git (Software & Firmware)** serta **Bukti Fisik Implementasi IoT (Hardware, Sensor, Pinout Wiring, dan Telemetri Real-Time)**.

---

## 🚀 Fitur Unggulan

1. **Live IoT Telemetry & MQTT Simulator**:
   - Visualisasi kurva sensor suhu dan kelembaban interaktif menggunakan HTML5 Canvas.
   - Kontrol langsung saklar aktuator relai GPIO (Water Solenoid Pump, Exhaust Fan) dengan feedback visual.
   - Terminal log pesan MQTT (`devices/esp32_gateway/telemetry`) streaming secara langsung.
2. **IoT Project Showcase & Detail Modal**:
   - Galeri foto prototipe & deployment lapangan beresolusi tinggi.
   - Tabel pinout (wiring connection) lengkap untuk setiap GPIO mikrokontroler.
   - Arsitektur spesifikasi hardware (ESP32, STM32, LoRaWAN, RS485 Modbus).
   - Snippet kode firmware embedded C++ / FreeRTOS dengan tombol salin cepat.
3. **Integrasi GitHub REST API**:
   - Otomatis menarik repositori publik langsung dari akun GitHub Anda.
   - Dilengkapi filter bahasa dan pencarian instan (*real-time search*).
4. **Desain Modern & Responsif**:
   - Dark tech cyberpunk aesthetics dengan aksen glow neon cyan & emerald LED.
   - Glassmorphism, micro-animations, dan tata letak yang ramah mobile.

---

## 🛠️ Panduan Kustomisasi Cepat

### 1. Mengganti Akun GitHub & Profil
Buka file `js/config.js` dan sesuaikan nilainya:
```javascript
const CONFIG = {
  name: "Nama Anda",
  title: "IoT Systems Architect | Embedded Firmware Developer",
  githubUsername: "username-github-anda", // Repositori publik akan otomatis ditarik!
  contacts: {
    email: "emailanda@domain.com",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    whatsapp: "+6281234567890"
  }
};
```

### 2. Menambahkan / Mengedit Proyek IoT
Buka file `js/data.js` pada bagian array `IOT_PROJECTS`:
- Anda bisa menambahkan spesifikasi pinout GPIO, sensor, foto di `assets/images/`, serta cuplikan kode firmware C++ Anda.

### 3. Mengganti Foto Proyek
Letakkan foto prototipe atau pengujian alat Anda di folder `assets/images/`, lalu arahkan path gambar di `js/data.js`.

---

## 🌐 Cara Menjalankan Website

### Opsi A: Langsung Buka di Browser
Cukup klik dua kali (double click) file `index.html` pada File Explorer untuk langsung melihat website berjalan.

### Opsi B: Menggunakan Local Server (Live Server / Python / Node)
Jika Anda memiliki VS Code / Live Server:
- Klik kanan `index.html` lalu pilih **Open with Live Server**.

Atau melalui terminal (PowerShell):
```bash
# Menggunakan Python
python -m http.server 8080

# Menggunakan npx serve
npx serve .
```

---

## 🚢 Panduan Deploy Gratis ke GitHub Pages

1. Buat repositori baru di GitHub bernama `portofolio-iot` (atau `username.github.io`).
2. Jalankan perintah git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: IoT & Git Engineering Portfolio"
   git branch -M main
   git remote add origin https://github.com/username-anda/portofolio-iot.git
   git push -u origin main
   ```
3. Di GitHub: Masuk ke **Settings** > **Pages** > pilih branch `main` lalu simpan. Website Anda akan aktif online dalam 1 menit!
