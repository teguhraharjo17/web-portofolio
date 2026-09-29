/**
 * Konfigurasi Portofolio Resmi - Teguh Raharjo
 */
const CONFIG = {
  // Informasi Profil
  name: "Ignasius Teguh Raharjo Rubiyo",
  headline: "Web Developer, Android Developer and IoT Engineer",
  bio: "I build custom web apps (Laravel, React TypeScript), mobile apps (Android Kotlin, Flutter), and IoT prototypes (vehicle GPS trackers, soil moisture & custom sensors) connected to live dashboards. Ready to deliver clean, reliable, and functional solutions for your project.",
  profilePhoto: "assets/images/profile-photo.webp",
  
  // Akun GitHub
  githubUsername: "teguhraharjo17",
  
  // Kontak Resmi
  contacts: {
    email: "teguhraharjorubiyo27@gmail.com",
    whatsapp: "082196280302",
    whatsappUrl: "https://wa.me/6282196280302",
    linkedin: "https://www.linkedin.com/in/ignasiusteguhraharjorubiyo/",
    github: "https://github.com/teguhraharjo17",
    location: "Indonesia"
  },

  // Highlight Metrik Utama
  metrics: [
    { label: "Sistem Web & Repositori", value: "15+", subtext: "Enterprise Production" },
    { label: "Mobile Development", value: "Android", subtext: "Kotlin & Flutter" },
    { label: "Full-Stack & DevOps", value: "Advanced", subtext: "Laravel, React, TS, Nginx" },
    { label: "IoT & Hardware", value: "MQTT", subtext: "ESP32, SIMCom, u-blox" }
  ]
};

// Export ke window
window.PORTFOLIO_CONFIG = CONFIG;
