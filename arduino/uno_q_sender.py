import argparse
import json
import time

import requests
import serial


DEFAULT_SERVER_URL = "https://arduino-iot-server.onrender.com/data"
DEFAULT_BAUD_RATE = 9600


def parse_args():
    parser = argparse.ArgumentParser(
        description="Read UNO Q sensor JSON from serial and send it to the IoT server."
    )
    parser.add_argument(
        "--port",
        required=True,
        help="Arduino serial port, for example COM3 on Windows or /dev/ttyACM0 on Linux.",
    )
    parser.add_argument(
        "--server-url",
        default=DEFAULT_SERVER_URL,
        help=f"Server /data endpoint. Default: {DEFAULT_SERVER_URL}",
    )
    parser.add_argument(
        "--baud-rate",
        type=int,
        default=DEFAULT_BAUD_RATE,
        help=f"Serial baud rate. Default: {DEFAULT_BAUD_RATE}",
    )
    return parser.parse_args()


def is_sensor_reading(data):
    return (
        isinstance(data.get("temperature"), (int, float))
        and isinstance(data.get("humidity"), (int, float))
        and isinstance(data.get("device"), str)
        and data["device"].strip()
    )


def read_json_line(serial_connection):
    line = serial_connection.readline().decode("utf-8", errors="replace").strip()
    if not line:
        return None

    if not line.startswith("{"):
        print("Arduino:", line)
        return None

    try:
        data = json.loads(line)
    except json.JSONDecodeError:
        print("Skipping invalid JSON from Arduino:", line)
        return None

    if not is_sensor_reading(data):
        print("Skipping non-sensor JSON from Arduino:", data)
        return None

    return data


def send_reading(server_url, data):
    response = requests.post(server_url, json=data, timeout=10)
    response.raise_for_status()
    print("Sent:", data)
    print("Server:", response.text)


def main():
    args = parse_args()

    print(f"Opening Arduino serial port {args.port} at {args.baud_rate} baud...")
    with serial.Serial(args.port, args.baud_rate, timeout=2) as serial_connection:
        time.sleep(2)
        print(f"Forwarding real sensor readings to {args.server_url}")

        while True:
            data = read_json_line(serial_connection)
            if data is None:
                continue

            try:
                send_reading(args.server_url, data)
            except requests.RequestException as error:
                print("Error sending data:", error)
                time.sleep(2)


if __name__ == "__main__":
    main()
