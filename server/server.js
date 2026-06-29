const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dashboard")));

// Stores only latest reading
let latestReading = null;

function isValidReading(reading) {
  return (
    Number.isFinite(reading.temperature) &&
    Number.isFinite(reading.humidity) &&
    typeof reading.device === "string" &&
    reading.device.trim().length > 0
  );
}

// Home route
app.get("/", (req, res) => {
  res.send("IoT Server is running");
});

// Receive data from fake device / UNO Q
app.post("/data", (req, res) => {
  if (!isValidReading(req.body)) {
    return res.status(400).json({
      status: "error",
      message: "temperature and humidity must be numbers, and device is required"
    });
  }

  latestReading = {
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    device: req.body.device.trim(),
    time: new Date().toLocaleString()
  };

  console.log("New Data Received:");
  console.log(latestReading);

  res.json({
    message: "Data received successfully",
    latestReading: latestReading
  });
});

// Send latest data to dashboard
app.get("/latest", (req, res) => {
  if (!latestReading) {
    return res.json({
      status: "waiting",
      message: "No data received yet"
    });
  }

  res.json({
    status: "success",
    data: latestReading
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
