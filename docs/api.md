# API Documentation

## Base URL

Local:

http://localhost:3000

Cloud:

"https://arduino-iot-server.onrender.com/data"

---

## POST /data

Receives sensor data from Arduino UNO Q.

### Request

```json
{
    "temperature": 28.5,
    "humidity": 65,
    "device": "UNO_Q"
}
```

### Response

```json
{
    "message": "Data received successfully"
}
```

---

## GET /latest

Returns the latest sensor reading.

### Response

```json
{
    "status": "success",
    "data": {
        "temperature": 28.5,
        "humidity": 65,
        "device": "UNO_Q",
        "time": "27 Jun 2026 11:45 PM"
    }
}
``