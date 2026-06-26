# Hardware Setup

## Components Needed

- Arduino UNO Q
- DHT11 or DHT22 temperature sensor module
- Jumper wires
- USB cable
- USB power adapter or power bank
- Wi-Fi connection

## DHT Sensor Wiring

For DHT11/DHT22 module:

| Sensor Pin | Arduino UNO Q |
|----------|----------------|
| VCC | 3.3V or 5V |
| GND | GND |
| DATA | D2 |

## Final Device Flow

1. Power ON UNO Q
2. Connect to Wi-Fi
3. Read temperature and humidity
4. Create JSON data
5. Send data to Render server
6. Dashboard displays latest value