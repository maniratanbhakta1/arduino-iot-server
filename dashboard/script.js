const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const deviceEl = document.getElementById("device");
const statusEl = document.getElementById("status");
const timeEl = document.getElementById("time");

function setStatus(text, className) {
  statusEl.innerText = text;
  statusEl.className = className;
}

async function getLatestData() {
  try {
    const response = await fetch("/latest");
    const result = await response.json();

    if (result.status === "waiting") {
      setStatus("Waiting...", "waiting");
      return;
    }

    const data = result.data;

    temperatureEl.innerText = `${data.temperature} \u00B0C`;
    humidityEl.innerText = `${data.humidity} %`;
    deviceEl.innerText = data.device;
    setStatus("Online", "online");
    timeEl.innerText = `Last Updated: ${data.time}`;
  } catch (error) {
    setStatus("Offline", "offline");
  }
}

getLatestData();
setInterval(getLatestData, 5000);
