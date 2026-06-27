import requests
import time
import random

SERVER_URL = "https://arduino-iot-server.onrender.com/data"
while True:
    temperature = round(random.uniform(25, 35), 2)
    humidity = round(random.uniform(50, 75), 2)

    data = {
        "temperature": temperature,
        "humidity": humidity,
        "device": "UNO_Q"
    }

    try:
        response = requests.post(SERVER_URL, json=data)

        print("Data sent:")
        print(data)
        print("Status code:", response.status_code)
        print("Server reply:", response.text)

    except Exception as e:
        print("Error sending data:", e)

    time.sleep(5)