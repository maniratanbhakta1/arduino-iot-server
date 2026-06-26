async function getLatestData() {
  try {
    const response = await fetch("/latest");
    const result = await response.json();

    if (result.status === "waiting") {
      document.getElementById("status").innerText = "Waiting...";
      return;
    }

    const data = result.data;

    document.getElementById("temperature").innerText = data.temperature + " °C";
    document.getElementById("humidity").innerText = data.humidity + " %";
    document.getElementById("device").innerText = data.device;
    document.getElementById("status").innerText = "🟢 Online";
    document.getElementById("time").innerText = "Last Updated: " + data.time;

  } catch (error) {
    document.getElementById("status").innerText = "🔴 Offline";
  }
}

getLatestData();
setInterval(getLatestData, 5000);