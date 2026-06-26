const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;;

app.use(cors());
app.use(express.json());

let readings = [];

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/data", (req, res) => {
  const data = {
    ...req.body,
    time: new Date().toLocaleString()
  };

  readings.push(data);

  console.log("New Data Received:");
  console.log(data);

  res.json({
    message: "Data received successfully",
    receivedData: data
  });
});

app.get("/readings", (req, res) => {
  res.json(readings);
});
// Get only the latest reading
app.get("/latest", (req, res) => {

  if (readings.length === 0) {
    return res.json({
      message: "No data received yet"
    });
  }

  const latest = readings[readings.length - 1];

  res.json(latest);

});

app.get("/dashboard", (req, res) => {
  if (readings.length === 0) {
    return res.send(`
      <html>
      <head>
        <title>IoT Dashboard</title>
        <meta http-equiv="refresh" content="5">
        <style>
          body {
            font-family: Arial;
            background: #f2f2f2;
            text-align: center;
            margin-top: 80px;
          }
          .card {
            width: 450px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 0 15px gray;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>IoT Temperature Dashboard</h1>
          <h2>No sensor data received yet.</h2>
          <p>Waiting for device...</p>
        </div>
      </body>
      </html>
    `);
  }

  const latest = readings[readings.length - 1];

  res.send(`
    <html>
    <head>
      <title>IoT Dashboard</title>
      <meta http-equiv="refresh" content="5">

      <style>
        body {
          font-family: Arial;
          background: #f2f2f2;
          text-align: center;
          margin-top: 60px;
        }

        .card {
          width: 480px;
          margin: auto;
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 0 15px gray;
        }

        h1 {
          color: #0077cc;
        }

        .value {
          font-size: 28px;
          font-weight: bold;
        }

        .footer {
          margin-top: 20px;
          color: gray;
          font-size: 14px;
        }
      </style>
    </head>

    <body>
      <div class="card">
        <h1>🌡 IoT Temperature Dashboard</h1>

        <p>Temperature</p>
        <div class="value">${latest.temperature} °C</div>

        <p>Humidity</p>
        <div class="value">${latest.humidity} %</div>

        <p>Device</p>
        <div class="value">${latest.device}</div>

        <p>Last Updated</p>
        <h3>${latest.time}</h3>

        <div class="footer">
          Page auto-refreshes every 5 seconds
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});