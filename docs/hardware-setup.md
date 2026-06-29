# Hardware Setup

## Components Needed

- Arduino UNO Q
- DHT11 or DHT22 temperature sensor module
- Jumper wires
- USB cable
- USB power adapter or power bank
- Wi-Fi connection

## DHT Sensor Wiring

| Sensor Pin | Arduino UNO Q |
|-----------|----------------|
| VCC | 3.3V or 5V |
| GND | GND |
| DATA | D2 |

The firmware is currently configured for a DHT22 sensor:

```cpp
#define DHT_TYPE DHT22
```

If you are using a DHT11, change that line in `arduino/uno_temperature_monitor.ino` to:

```cpp
#define DHT_TYPE DHT11
```

## Sending Real Sensor Readings

The Python sender reads JSON lines from the Arduino serial port and forwards them
to the server. Install the Python dependencies first:

```bash
pip install -r arduino/requirements.txt
```

Then run it with your Arduino port:

```bash
python arduino/uno_q_sender.py --port COM8
```

On Linux, the port may look like `/dev/ttyACM0` or `/dev/ttyUSB0`.

You do not need Arduino App Lab for this version of the project. You can use:

- Arduino IDE to upload `arduino/uno_temperature_monitor.ino` to the board.
- A normal terminal on your computer to run `arduino/uno_q_sender.py`.
- COM8 as the serial port while your UNO Q is connected to this computer.

## Final Device Flow

1. Power ON UNO Q
2. Connect to Wi-Fi
3. Read temperature and humidity
4. Create JSON data
5. Send data to Render server
6. Dashboard displays latest value
