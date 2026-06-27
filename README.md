# Arduino IoT Temperature Monitoring System

A cloud-based Internet of Things (IoT) project that monitors temperature and humidity using an Arduino UNO Q and displays the latest readings on a live web dashboard. The sensor data is transmitted to a cloud server hosted on Render through HTTP requests, allowing the dashboard to be accessed from anywhere with an internet connection.

---

# System Architecture

```text
                 DHT11 / DHT22
                       │
                       ▼
               Arduino UNO Q
              (.ino Firmware)
                       │
                       ▼
          sender.py (Arduino App Lab)
                       │
               HTTP POST (JSON)
                       │
                       ▼
          Express.js Server (Render)
                       │
                       ▼
          Live Dashboard (Browser)
```

---

# Four-Layer Architecture

```
┌─────────────────────────────────────────────┐
│              Device Layer                   │
├─────────────────────────────────────────────┤
│ • Arduino UNO Q                            │
│ • DHT11 / DHT22 Sensor                     │
│ • Arduino Firmware (.ino)                  │
│ • Built-in LED Matrix                      │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│           Communication Layer              │
├─────────────────────────────────────────────┤
│ • Arduino App Lab                          │
│ • sender.py (Python)                       │
│ • HTTP Protocol                            │
│ • REST API                                 │
│ • JSON Data Format                         │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│               Cloud Layer                  │
├─────────────────────────────────────────────┤
│ • Node.js                                  │
│ • Express.js                               │
│ • Render Cloud                             │
│ • REST API Endpoints                       │
│ • Latest Data Storage                      │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│            Presentation Layer              │
├─────────────────────────────────────────────┤
│ • HTML                                     │
│ • CSS                                      │
│ • JavaScript                               │
│ • Live Dashboard                           │
│ • Auto Refresh                             │
└─────────────────────────────────────────────┘
```

**Device Layer**

This layer consists of the Arduino UNO Q, DHT11/DHT22 sensor, LED matrix, and the Arduino firmware. It is responsible for collecting environmental data, processing it, displaying information on the LED matrix, and preparing the data for transmission.

**Communication Layer**

The communication layer transfers sensor data from the Arduino to the cloud. It uses Arduino App Lab, Python (`sender.py`), HTTP, REST APIs, and JSON to package and transmit sensor readings securely.

**Cloud Layer**

The cloud layer is built using Node.js and Express.js and is deployed on Render. It receives incoming sensor data, processes HTTP requests, stores the latest readings, and serves data to connected clients.

**Presentation Layer**

The presentation layer provides a browser-based dashboard developed using HTML, CSS, and JavaScript. It periodically requests the latest sensor values from the cloud server and displays them in a clean, responsive interface.

---

# Technologies Used

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| Arduino UNO Q   | Main microcontroller             |
| DHT11 / DHT22   | Temperature & Humidity Sensor    |
| Arduino IDE     | Firmware development             |
| Arduino App Lab | Python execution & communication |
| Python          | Sends sensor data to the cloud   |
| Node.js         | Backend runtime                  |
| Express.js      | REST API server                  |
| Render          | Cloud hosting platform           |
| HTML            | Dashboard structure              |
| CSS             | Dashboard styling                |
| JavaScript      | Dynamic data updates             |
| Git             | Version control                  |
| GitHub          | Source code hosting              |

---

# Working Principle

1. The DHT sensor measures temperature and humidity.
2. The Arduino UNO Q reads the sensor values.
3. The firmware creates a JSON object containing the latest readings.
4. The Python sender script transmits the JSON data to the Render server using an HTTP POST request.
5. The Express server receives and stores the latest reading.
6. The dashboard requests the latest data using an HTTP GET request.
7. The dashboard updates automatically, allowing users to monitor the environment in real time from anywhere.

---

# Backend Overview

### Node.js

Node.js is a JavaScript runtime that executes the backend server outside the browser.

### Express.js

Express.js is a lightweight web framework built on Node.js that simplifies the development of web servers and REST APIs.

### API

An API (Application Programming Interface) defines how different software components communicate. In this project, it enables communication between the Arduino, the cloud server, and the dashboard.

### REST API

REST (Representational State Transfer) is a web architecture that uses standard HTTP methods to exchange data between clients and servers.

### HTTP Methods

**GET**

Retrieves data from the server. The dashboard uses this method to request the latest sensor readings.

**POST**

Sends data to the server. The Arduino uses this method to upload temperature and humidity values.

### JSON

JSON (JavaScript Object Notation) is a lightweight data format used to exchange information between the Arduino and the server.

Example:

```json
{
  "temperature": 28.5,
  "humidity": 65,
  "device": "UNO_Q"
}
```

### Middleware

Middleware consists of functions that process requests before they reach the API endpoints. In this project, middleware is used for JSON parsing and CORS handling.

### CORS

Cross-Origin Resource Sharing (CORS) allows the dashboard and backend server to communicate securely even when they are hosted on different origins.

### Render

Render is a cloud hosting platform that deploys the Express.js server and makes the REST API publicly accessible over the internet.
