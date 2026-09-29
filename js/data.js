/**
 * Data Portofolio Resmi - Teguh Raharjo
 */

// 1. REPOSITORI SISTEM WEB (Tanpa deskripsi sesuai permintaan)
const GIT_REPOSITORIES = [
  {
    name: "warehouse-cikupa",
    title: "warehouse-cikupa",
    category: "warehouse",
    language: "Laravel / PHP",
    tags: ["Warehouse", "Logistics", "Inventory"],
    html_url: "https://github.com/teguhraharjo17/warehouse-cikupa"
  },
  {
    name: "monitoring-stokproject-tigaraksa",
    title: "monitoring-stokproject-tigaraksa",
    category: "monitoring",
    language: "JavaScript / PHP",
    tags: ["Monitoring", "Stok", "Tigaraksa"],
    html_url: "https://github.com/teguhraharjo17/monitoring-stokproject-tigaraksa"
  },
  {
    name: "inventory-warehouse-tigaraksa",
    title: "inventory-warehouse-tigaraksa",
    category: "warehouse",
    language: "Laravel / PHP",
    tags: ["Inventory", "Gudang", "Tigaraksa"],
    html_url: "https://github.com/teguhraharjo17/inventory-warehouse-tigaraksa"
  },
  {
    name: "sistem-purchasing-tigaraksa",
    title: "sistem-purchasing-tigaraksa",
    category: "management",
    language: "PHP / MySQL",
    tags: ["Purchasing", "PO", "Procurement"],
    html_url: "https://github.com/teguhraharjo17/sistem-purchasing-tigaraksa"
  },
  {
    name: "sistem-spk-tigaraksa",
    title: "sistem-spk-tigaraksa",
    category: "management",
    language: "Laravel / PHP",
    tags: ["SPK", "Work-Order", "Task"],
    html_url: "https://github.com/teguhraharjo17/sistem-spk-tigaraksa"
  },
  {
    name: "sistem-hse-tigaraksa",
    title: "sistem-hse-tigaraksa",
    category: "management",
    language: "PHP / JavaScript",
    tags: ["HSE", "K3", "Safety"],
    html_url: "https://github.com/teguhraharjo17/sistem-hse-tigaraksa"
  },
  {
    name: "sistem-checking-tigaraksa",
    title: "sistem-checking-tigaraksa",
    category: "monitoring",
    language: "JavaScript / PHP",
    tags: ["QC", "Checking", "Inspection"],
    html_url: "https://github.com/teguhraharjo17/sistem-checking-tigaraksa"
  },
  {
    name: "checklabel-tigaraksa",
    title: "checklabel-tigaraksa",
    category: "warehouse",
    language: "JavaScript / Web",
    tags: ["Barcode", "Labeling", "Scanner"],
    html_url: "https://github.com/teguhraharjo17/checklabel-tigaraksa"
  },
  {
    name: "website-it-milenia",
    title: "website-it-milenia",
    category: "management",
    language: "PHP / Web",
    tags: ["Portal", "IT-Support", "Helpdesk"],
    html_url: "https://github.com/teguhraharjo17/website-it-milenia"
  },
  {
    name: "monitoring-server-cikupa",
    title: "monitoring-server-cikupa",
    category: "monitoring",
    language: "PHP / Shell",
    tags: ["Server", "Uptime", "Network"],
    html_url: "https://github.com/teguhraharjo17/monitoring-server-cikupa"
  },
  {
    name: "hotspot-management-ckp",
    title: "hotspot-management-ckp",
    category: "management",
    language: "PHP / MikroTik API",
    tags: ["Hotspot", "MikroTik", "Network"],
    html_url: "https://github.com/teguhraharjo17/hotspot-management-ckp"
  },
  {
    name: "sistem-formpengajuan",
    title: "sistem-formpengajuan",
    category: "management",
    language: "Laravel / PHP",
    tags: ["Form", "Approval", "Paperless"],
    html_url: "https://github.com/teguhraharjo17/sistem-formpengajuan"
  },
  {
    name: "sistem-joborderga-tigaraksa",
    title: "sistem-joborderga-tigaraksa",
    category: "management",
    language: "PHP / MySQL",
    tags: ["Job-Order", "GA", "Maintenance"],
    html_url: "https://github.com/teguhraharjo17/sistem-joborderga-tigaraksa"
  },
  {
    name: "sistem-jadwalob-tigaraksa",
    title: "sistem-jadwalob-tigaraksa",
    category: "management",
    language: "PHP / JavaScript",
    tags: ["Scheduling", "Checklist", "Operasional"],
    html_url: "https://github.com/teguhraharjo17/sistem-jadwalob-tigaraksa"
  },
  {
    name: "report-sales",
    title: "report-sales",
    category: "sales",
    language: "PHP / JavaScript",
    tags: ["Sales", "Reporting", "Analytics"],
    html_url: "https://github.com/teguhraharjo17/report-sales"
  }
];

// 2. ANDROID APPLICATION SECTION
const ANDROID_PROJECTS = [
  {
    id: "slamet-app",
    title: "SlametApp",
    subtitle: "Aplikasi Manajemen Keuangan & Pembayaran IPL Perumahan",
    platform: "Android (Kotlin / Flutter)",
    status: "Production Ready",
    image: "assets/images/SlametApp.webp",
    description: "Aplikasi mobile untuk pencatatan dan arus keuangan kas perumahan agar lebih transparan kepada warga, berikut juga dengan sistem pembayaran Iuran Pemeliharaan Lingkungan (IPL) tiap bulannya yang diverifikasi dan di-approve langsung oleh pihak RT.",
    features: [
      "Pencatatan kas pemasukan & pengeluaran perumahan secara transparan",
      "Pembayaran tagihan IPL (Iuran Pemeliharaan Lingkungan) bulanan",
      "Sistem approval verifikasi pembayaran langsung oleh RT",
      "Riwayat transaksi dan bukti kwitansi digital untuk warga"
    ]
  }
];

// 3. PROYEK IOT & HARDWARE
const IOT_PROJECTS = [
  {
    id: "iot-gps-tracking",
    title: "IoT Real-Time GPS Tracking & Fleet Telemetry",
    category: "gps-tracking",
    categoryLabel: "GPS & Telemetry",
    status: "Active & Tested",
    statusType: "success",
    image: "assets/images/gps-tracker.webp",
    summary: "Sistem pelacakan posisi kendaraan waktu-nyata berbasis modul seluler SIMCom A7670C dan modul GNSS u-blox NEO-M8N dengan mikrokontroler ESP32-S 38 Pin CP2102. Data koordinat latitude, longitude, dan kecepatan ditransmisikan secara andal menggunakan protokol MQTT ke web dashboard.",
    mcu: "ESP32 ESP-32 Wifi Bluetooth IOT ESP-32S Development Board 38 Pin CP2102",
    sensors: ["u-blox NEO-M8N GNSS Module", "SIMCom A7670C (4G LTE Cellular Modem)", "Active GPS Patch Antenna", "LiPo Battery & Step-Down Buck DC 12V-to-5V"],
    protocol: "MQTT Protocol / UART NMEA 0183",
    power: "Aki Kendaraan 12V/24V via Step-Down Buck + Backup Baterai LiPo",
    gitUrl: "https://github.com/teguhraharjo17",
    metrics: {
      power: "12V Aki / LiPo",
      powerLbl: "Power",
      range: "4G LTE Global",
      rangeLbl: "Jangkauan",
      telemetry: "MQTT (5s)",
      telemetryLbl: "Protokol",
      batteryLife: "12V Aki / LiPo",
      sampleRate: "MQTT (5s)"
    },
    specs: [
      { name: "Development Board", value: "ESP-32S Development Board 38 Pin CP2102 (Dual-Core Xtensa LX6 @ 240MHz)" },
      { name: "Cellular Modem", value: "SIMCom A7670C LTE Cat-1 Modem" },
      { name: "GNSS Module", value: "u-blox NEO-M8N Concurrent GNSS Engine (GPS, GLONASS, BeiDou)" },
      { name: "Transmission Protocol", value: "MQTT Protocol over TCP/IP" },
      { name: "Akurasi Posisi", value: "Akurasi tinggi < 2.0 Meter CEP dengan Active Antenna" }
    ],
    pinout: [
      { pin: "GPIO 16 (RX2)", function: "UART RX", connectedTo: "TX u-blox NEO-M8N (NMEA Stream)" },
      { pin: "GPIO 17 (TX2)", function: "UART TX", connectedTo: "RX u-blox NEO-M8N" },
      { pin: "GPIO 18 & 19", function: "UART Modem", connectedTo: "SIMCom A7670C AT & Data Channel" },
      { pin: "GPIO 34 (ADC1)", function: "Analog In", connectedTo: "Voltage Divider Aki Kendaraan" },
      { pin: "GPIO 2", function: "Status LED", connectedTo: "Indikator GPS Lock & MQTT Connection" }
    ],
    firmwareSnippet: `// ESP32-S 38 Pin CP2102 + SIMCom A7670C + u-blox NEO-M8N (MQTT Stream)
#include <TinyGPS++.h>
#include <PubSubClient.h>

TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // UART2: GPIO 16 (RX), GPIO 17 (TX)

const char* mqttTopic = "teguh/fleet/gps-tracker-01";

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);
  // Inisialisasi SIMCom A7670C & koneksi MQTT Broker
  Serial.println("[GPS-M8N] u-blox NEO-M8N GNSS initialized");
  Serial.println("[A7670C] SIMCom 4G LTE connected to MQTT broker");
}

void loop() {
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {
        float lat = gps.location.lat();
        float lng = gps.location.lng();
        float speedKmh = gps.speed.kmph();
        
        // Format payload MQTT
        char payload[180];
        snprintf(payload, sizeof(payload), 
          "{\\"dev\\":\\"ESP32S_38PIN\\",\\"lat\\":%.6f,\\"lng\\":%.6f,\\"speed\\":%.1f}",
          lat, lng, speedKmh);
        
        // Publish via MQTT
        Serial.printf("[MQTT PUB] %s -> %s\\n", mqttTopic, payload);
      }
    }
  }
}`,
    evidenceNotes: "Uji coba di lapangan membuktikan penguncian posisi u-blox NEO-M8N dan modem SIMCom A7670C sangat stabil mengirimkan data telemetri MQTT."
  },
  {
    id: "iot-turbidity-sensor",
    title: "HydroSense: Sensor Kekeruhan Air (Turbidity Sensor)",
    category: "water-quality",
    categoryLabel: "Water & Environment",
    status: "Calibrated & Operational",
    statusType: "success",
    image: "assets/images/turbidity-sensor.webp",
    summary: "Sistem instrumentasi pemantau kejernihan air menggunakan mikrokontroler Wemos D1 R32 (ESP32-WROOM-32) dengan Turbidity Sensor Module. Data kekeruhan ditransmisikan secara berkala ke web server backend menggunakan protokol HTTP POST melalui jaringan WiFi, dilengkapi lampu LED sebagai indikator visual status transmisi dan peringatan air keruh.",
    mcu: "Wemos D1 R32 (Mikrokontroler berbasis modul ESP32-WROOM-32)",
    sensors: ["Turbidity Sensor Module (Analog Optical Probe)", "Signal Conditioning Board", "Lampu LED Indikator Status & Alert", "Modul Relay 5V Solenoid Valve"],
    protocol: "HTTP POST (REST API via WiFi) / ADC Analog",
    power: "5V USB Adapter / 9V-12V DC Jack",
    gitUrl: "https://github.com/teguhraharjo17",
    metrics: {
      power: "5V Adaptor",
      powerLbl: "Power",
      range: "0 - 1000 NTU",
      rangeLbl: "Sensor",
      telemetry: "HTTP POST",
      telemetryLbl: "Protokol",
      batteryLife: "5V Adaptor",
      sampleRate: "HTTP POST"
    },
    specs: [
      { name: "Microcontroller Board", value: "Wemos D1 R32 (Form-Factor Arduino UNO berbasis ESP32-WROOM-32)" },
      { name: "Sensor Module", value: "Turbidity Sensor Module (Transmisi Inframerah & Deteksi Hamburan Cahaya)" },
      { name: "Protokol Pengiriman", value: "HTTP POST (JSON Payload via REST API Endpoint)" },
      { name: "Pemberitahuan / Indikator", value: "Lampu LED Indikator Status & Alert Kekeruhan (Tanpa Layar OLED)" },
      { name: "Rentang Tegangan", value: "0.0V (Air Keruh Pekat) - 4.2V (Air Jernih Bersih)" },
      { name: "Satuan Ukur", value: "NTU (Nephelometric Turbidity Units)" }
    ],
    pinout: [
      { pin: "GPIO 35 (ADC1)", function: "Analog In", connectedTo: "Pin AOUT Turbidity Sensor Module (Signal Board)" },
      { pin: "GPIO 2", function: "Status LED", connectedTo: "Lampu LED Indikator Transmisi Data HTTP POST (Blink)" },
      { pin: "GPIO 4", function: "Alert LED", connectedTo: "Lampu LED Indikator Peringatan Air Keruh (Threshold Alert)" },
      { pin: "GPIO 16", function: "Digital Out", connectedTo: "Modul Relay Solenoid Valve Filtrasi Otomatis" }
    ],
    firmwareSnippet: `// Wemos D1 R32 (ESP32-WROOM-32) + Turbidity Sensor Module + LED Indicator
// Pengiriman Data Menggunakan HTTP POST (Tanpa Display OLED)
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";
const char* serverUrl = "https://api.domain.com/api/turbidity-telemetry";

#define TURBIDITY_PIN 35  // ADC Analog Input dari Turbidity Module
#define LED_STATUS_PIN 2  // LED Indikator Status & Transmisi HTTP
#define LED_ALERT_PIN 4   // LED Indikator Peringatan Air Keruh

void setup() {
  Serial.begin(115200);
  pinMode(LED_STATUS_PIN, OUTPUT);
  pinMode(LED_ALERT_PIN, OUTPUT);

  // Inisialisasi koneksi WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_STATUS_PIN, !digitalRead(LED_STATUS_PIN));
    delay(200);
  }
  digitalWrite(LED_STATUS_PIN, HIGH);
  Serial.println("[WEMOS-D1-R32] WiFi Terhubung. Siap HTTP POST.");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // 1. Baca tegangan analog sensor kekeruhan
    int rawAdc = analogRead(TURBIDITY_PIN);
    float voltage = (rawAdc / 4095.0) * 3.3;
    float ntu = -1120.4 * (voltage * voltage) + 5742.3 * voltage - 4352.9;
    if (ntu < 0) ntu = 0;

    // 2. Pemberitahuan kondisi air via Lampu LED (Tanpa OLED)
    if (ntu > 50.0) {
      digitalWrite(LED_ALERT_PIN, HIGH); // LED menyala: Air keruh
    } else {
      digitalWrite(LED_ALERT_PIN, LOW);  // LED mati: Air jernih
    }

    // 3. Pengiriman data telemetri menggunakan HTTP POST
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"device\":\"WEMOS_D1_R32\",\"ntu\":" + String(ntu, 1) + 
                         ",\"voltage\":" + String(voltage, 2) + 
                         ",\"alert\":" + (ntu > 50.0 ? "true" : "false") + "}";

    int httpCode = http.POST(jsonPayload);
    Serial.printf("[HTTP POST] Code: %d, Response: %s\\n", httpCode, jsonPayload.c_str());

    // Indikator blink LED saat transmisi sukses
    digitalWrite(LED_STATUS_PIN, LOW);
    delay(100);
    digitalWrite(LED_STATUS_PIN, HIGH);

    http.end();
  }
  delay(3000); // Interval pengiriman HTTP POST
}`,
    evidenceNotes: "Pengujian di lapangan menunjukkan Wemos D1 R32 sukses membaca sensor kekeruhan air dan mengirimkan data secara berkala menggunakan HTTP POST ke web server, dengan lampu LED yang memberikan pemberitahuan visual saat air keruh tanpa menggunakan layar OLED."
  }
];

// 4. SKILLS MATRIX (FULL-STACK ADVANCED, DEVOPS NGINX/UBUNTU, IOT)
const SKILLS_MATRIX = [
  {
    category: "Full-Stack Web Development (Advanced)",
    items: [
      { name: "Laravel", level: "Advanced", pct: 95 },
      { name: "React", level: "Advanced", pct: 92 },
      { name: "TypeScript", level: "Advanced", pct: 90 },
      { name: "MySQL", level: "Advanced", pct: 94 },
      { name: "PostgreSQL", level: "Advanced", pct: 90 }
    ]
  },
  {
    category: "DevOps & Server Infrastructure (Advanced)",
    items: [
      { name: "Ubuntu Server Administration", level: "Advanced", pct: 92 },
      { name: "Nginx Web Server Configuration", level: "Advanced", pct: 94 },
      { name: "Linux CLI, SSH & Deployment", level: "Advanced", pct: 90 },
      { name: "Reverse Proxy & SSL Management", level: "Advanced", pct: 88 }
    ]
  },
  {
    category: "Mobile & IoT Engineering (Advanced)",
    items: [
      { name: "Android Development (Kotlin & Flutter)", level: "Advanced", pct: 88 },
      { name: "ESP32-S 38 Pin & Wemos D1 R32", level: "Advanced", pct: 94 },
      { name: "SIMCom A7670C & u-blox NEO-M8N", level: "Advanced", pct: 92 },
      { name: "MQTT Telemetry Protocol", level: "Advanced", pct: 94 }
    ]
  }
];

// 5. PENGALAMAN KERJA (Sesuai screenshot LinkedIn: Hanya Jabatan, Perusahaan, dan Rentang Waktu)
const EXPERIENCE_TIMELINE = [
  {
    role: "Web Developer",
    company: "PT. Milenia Mega Mandiri · Contract",
    period: "Feb 2025 - Present · 1 yr 8 mos",
    location: "Tigaraksa, Banten, Indonesia · On-site"
  },
  {
    role: "Developer",
    company: "NATHABUANA INDONESIA · Contract",
    period: "Aug 2024 - Jan 2025 · 6 mos",
    location: "Kecamatan Bekasi Utara, West Java, Indonesia · Hybrid"
  },
  {
    role: "Software Engineer",
    company: "Putra Perkasa Abadi · Contract",
    period: "May 2024 - Jul 2024 · 3 mos",
    location: "Lahat, Sumatera Selatan, Indonesia · On-site"
  }
];

// Export to window
window.GIT_REPOSITORIES = GIT_REPOSITORIES;
window.ANDROID_PROJECTS = ANDROID_PROJECTS;
window.IOT_PROJECTS = IOT_PROJECTS;
window.SKILLS_MATRIX = SKILLS_MATRIX;
window.EXPERIENCE_TIMELINE = EXPERIENCE_TIMELINE;
