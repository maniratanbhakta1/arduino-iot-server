const axios = require("axios");

//const SERVER_URL = "https://arduino-iot-server.onrender.com/data";
const SERVER_URL = "http://localhost:3000/data";


setInterval(async () => {
  const data = {
    temperature: Math.floor(Math.random() * 10) + 25,
    humidity: Math.floor(Math.random() * 20) + 50,
    device: "Fake_UNO_Q"
  };

  try {
    const res = await axios.post(SERVER_URL, data);
    console.log("Sent:", data);
    console.log("Server:", res.data.message);
  } catch (err) {
    console.log("Error:", err.message);
  }
}, 5000);