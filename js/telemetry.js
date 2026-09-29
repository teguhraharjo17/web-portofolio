/**
 * LIVE IOT TELEMETRY & MQTT SIMULATOR - TEGUH RAHARJO
 * Simulasi Real-Time untuk Sensor Kekeruhan Air (Turbidity) & Modul GPS Tracking
 */

(function () {
  let isRunning = true;
  let intervalMs = 2000;
  let timerId = null;

  // State Sensor Turbidity & GPS
  let currentNtu = 14.8;
  let currentAdcVolt = 3.92;
  let currentSpeed = 42.5;
  let currentSats = 9;
  let packetCounter = 1840;

  // Koordinat simulasi GPS (rute bergerak di Jakarta/Tangerang)
  let currentLat = -6.2915;
  let currentLng = 106.7212;

  const relays = {
    relay1: { name: "Solenoid Valve Filtrasi Air", pin: "GPIO 4", state: false },
    relay2: { name: "Sistem Buzzer Alarm Indikator", pin: "GPIO 15", state: false }
  };

  // Buffer data untuk sparkline kurva
  const ntuHistory = [12.0, 13.5, 14.0, 13.8, 15.2, 14.5, 14.8, 14.8];
  const speedHistory = [40.0, 41.2, 42.0, 43.5, 42.8, 42.1, 42.5, 42.5];
  const maxHistoryPoints = 20;

  // DOM Elements
  const ntuValEl = document.getElementById("telemetry-temp-val"); // Reused as NTU
  const gpsSpeedEl = document.getElementById("telemetry-hum-val"); // Reused as Speed / GPS
  const voltEl = document.getElementById("telemetry-volt-val");
  const packetCountEl = document.getElementById("telemetry-packets");
  const mqttStreamEl = document.getElementById("mqtt-terminal-stream");
  const ntuCanvas = document.getElementById("temp-chart-canvas");
  const speedCanvas = document.getElementById("hum-chart-canvas");

  function drawSparkline(canvas, dataPoints, colorPrimary, colorFill) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, width, height);
    if (dataPoints.length < 2) return;

    const min = Math.min(...dataPoints) - 1;
    const max = Math.max(...dataPoints) + 1;
    const stepX = width / (dataPoints.length - 1);

    ctx.beginPath();
    dataPoints.forEach((val, i) => {
      const x = i * stepX;
      const normalized = (val - min) / (max - min || 1);
      const y = height - (normalized * (height - 20) + 10);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = (i - 1) * stepX;
        const prevNorm = (dataPoints[i - 1] - min) / (max - min || 1);
        const prevY = height - (prevNorm * (height - 20) + 10);
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    ctx.strokeStyle = colorPrimary;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = colorFill;
    ctx.fill();

    // Titik terkini
    const lastX = width;
    const lastNorm = (dataPoints[dataPoints.length - 1] - min) / (max - min || 1);
    const lastY = height - (lastNorm * (height - 20) + 10);

    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = colorPrimary;
    ctx.fill();
    ctx.strokeStyle = "#0e1628";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function addMqttLog(topic, payload) {
    if (!mqttStreamEl) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");

    const line = document.createElement("div");
    line.className = "mqtt-line";

    let formattedPayload = payload;
    if (typeof payload === "object") {
      formattedPayload = JSON.stringify(payload)
        .replace(/"(\w+)":/g, '<span class="val-str">"$1"</span>:')
        .replace(/:(-?\d+\.?\d*)/g, ':<span class="val-num">$1</span>')
        .replace(/:true/g, ':<span class="val-str">true</span>')
        .replace(/:false/g, ':<span class="val-str">false</span>');
    }

    line.innerHTML = `
      <span class="mqtt-time">[${timeStr}]</span>
      <span class="mqtt-topic">&lt;PUB&gt; ${topic}:</span>
      <span class="mqtt-payload">${formattedPayload}</span>
    `;

    mqttStreamEl.appendChild(line);
    mqttStreamEl.scrollTop = mqttStreamEl.scrollHeight;

    while (mqttStreamEl.children.length > 25) {
      mqttStreamEl.removeChild(mqttStreamEl.firstChild);
    }
  }

  function updateTelemetryData() {
    if (!isRunning) return;

    // Fluktuasi Turbidity NTU
    const ntuDelta = (Math.random() - 0.48) * 0.8;
    currentNtu = parseFloat(Math.max(2.0, Math.min(85.0, currentNtu + ntuDelta)).toFixed(1));

    // Korelasi tegangan sensor (makin jernih, voltase mendekati 4.1V)
    currentAdcVolt = parseFloat((4.2 - (currentNtu / 100) * 1.5).toFixed(2));

    // Pergerakan GPS
    const speedDelta = (Math.random() - 0.5) * 3;
    currentSpeed = parseFloat(Math.max(0, Math.min(85, currentSpeed + speedDelta)).toFixed(1));
    currentLat += (Math.random() - 0.45) * 0.0001;
    currentLng += (Math.random() - 0.45) * 0.0001;

    packetCounter++;

    // Update Text Elements
    if (ntuValEl) ntuValEl.textContent = currentNtu.toFixed(1);
    if (gpsSpeedEl) gpsSpeedEl.textContent = currentSpeed.toFixed(1);
    if (voltEl) voltEl.textContent = currentAdcVolt.toFixed(2);
    if (packetCountEl) packetCountEl.textContent = packetCounter.toLocaleString();

    // History buffer
    ntuHistory.push(currentNtu);
    if (ntuHistory.length > maxHistoryPoints) ntuHistory.shift();

    speedHistory.push(currentSpeed);
    if (speedHistory.length > maxHistoryPoints) speedHistory.shift();

    // Redraw charts
    drawSparkline(ntuCanvas, ntuHistory, "#00f2fe", "rgba(0, 242, 254, 0.15)");
    drawSparkline(speedCanvas, speedHistory, "#10b981", "rgba(16, 185, 129, 0.15)");

    // Log MQTT
    if (packetCounter % 2 === 0) {
      addMqttLog("teguh/water/turbidity", {
        node: "HYDRO_SENSE_01",
        ntu: currentNtu,
        sensor_volt: currentAdcVolt,
        status: currentNtu > 50 ? "AIR_KERUH" : "AIR_JERNIH"
      });
    } else {
      addMqttLog("teguh/vehicle/gps", {
        device: "GPS_TRACKER_01",
        lat: parseFloat(currentLat.toFixed(5)),
        lng: parseFloat(currentLng.toFixed(5)),
        speed_kmh: currentSpeed,
        satellites: currentSats
      });
    }
  }

  function setupActuators() {
    const relay1Toggle = document.getElementById("relay-toggle-1");
    const relay2Toggle = document.getElementById("relay-toggle-2");

    if (relay1Toggle) {
      relay1Toggle.addEventListener("change", (e) => {
        relays.relay1.state = e.target.checked;
        const stateStr = relays.relay1.state ? "ON (Filtrasi Terbuka)" : "OFF (Normal)";
        addMqttLog("teguh/water/actuator/set", {
          relay: "VALVE_SOLENOID",
          gpio: 4,
          state: relays.relay1.state
        });
        window.showToast?.(`Valve Filtrasi Kekeruhan: ${stateStr}`);
      });
    }

    if (relay2Toggle) {
      relay2Toggle.addEventListener("change", (e) => {
        relays.relay2.state = e.target.checked;
        const stateStr = relays.relay2.state ? "ACTIVE (Buzzer ON)" : "STANDBY";
        addMqttLog("teguh/vehicle/alarm/set", {
          relay: "BUZZER_ALARM",
          gpio: 15,
          state: relays.relay2.state
        });
        window.showToast?.(`Indikator Alarm: ${stateStr}`);
      });
    }

    const rateBtns = document.querySelectorAll(".rate-btn");
    rateBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        rateBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        intervalMs = parseInt(btn.dataset.rate, 10) || 2000;
        clearInterval(timerId);
        timerId = setInterval(updateTelemetryData, intervalMs);
        window.showToast?.(`Frekuensi telemetri: ${intervalMs / 1000}s`);
      });
    });
  }

  function init() {
    setupActuators();
    timerId = setInterval(updateTelemetryData, intervalMs);
    updateTelemetryData();

    window.addEventListener("resize", () => {
      drawSparkline(ntuCanvas, ntuHistory, "#00f2fe", "rgba(0, 242, 254, 0.15)");
      drawSparkline(speedCanvas, speedHistory, "#10b981", "rgba(16, 185, 129, 0.15)");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
