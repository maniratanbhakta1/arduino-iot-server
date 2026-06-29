/*
  Arduino IoT Temperature Monitor
  Board: Arduino UNO Q

  Features:
  - Reads DHT11/DHT22 temperature and humidity
  - Shows values on UNO Q LED Matrix
  - Creates JSON data
  - Prints JSON through Serial
  - sender.py can read/send this data to Render server
*/

#include <Arduino_LED_Matrix.h>
#include <ArduinoGraphics.h>
#include "DHT.h"

#define DHT_PIN 2
#define DHT_TYPE DHT22

#define DEVICE_NAME "UNO_Q"
#define SEND_INTERVAL 5000
#define SCREEN_INTERVAL 1500

ArduinoLEDMatrix matrix;
DHT dht(DHT_PIN, DHT_TYPE);

float temperature = 0;
float humidity = 0;

unsigned long lastSendTime = 0;
unsigned long lastScreenTime = 0;

int screenMode = 0;

void setup() {
  Serial.begin(9600);
  delay(1000);

  matrix.begin();
  dht.begin();

  showText("BOOT");
  delay(1000);

  Serial.println("UNO Q IoT Temperature Monitor Started");
  Serial.println("DHT Sensor Initialized");
}

void loop() {
  unsigned long currentTime = millis();

  if (currentTime - lastSendTime >= SEND_INTERVAL) {
    lastSendTime = currentTime;

    if (readSensor()) {
      String jsonData = createJSON(temperature, humidity);

      Serial.println(jsonData);
    }
  }

  if (currentTime - lastScreenTime >= SCREEN_INTERVAL) {
    lastScreenTime = currentTime;

    updateMatrixScreen();
  }
}

bool readSensor() {
  float tempValue = dht.readTemperature();
  float humValue = dht.readHumidity();

  if (isnan(tempValue) || isnan(humValue)) {
    Serial.println("ERROR: Failed to read from DHT sensor");
    showText("ERR");
    return false;
  }

  temperature = tempValue;
  humidity = humValue;
  return true;
}

String createJSON(float temp, float hum) {
  String json = "{";
  json += "\"temperature\":";
  json += String(temp, 2);
  json += ",";
  json += "\"humidity\":";
  json += String(hum, 2);
  json += ",";
  json += "\"device\":\"";
  json += DEVICE_NAME;
  json += "\"";
  json += "}";

  return json;
}

void updateMatrixScreen() {
  if (screenMode == 0) {
    showTemperature();
  } 
  else if (screenMode == 1) {
    showHumidity();
  } 
  else if (screenMode == 2) {
    showText("IOT");
  } 
  else if (screenMode == 3) {
    showText("OK");
  }

  screenMode++;

  if (screenMode > 3) {
    screenMode = 0;
  }
}

void showTemperature() {
  matrix.beginDraw();
  matrix.clear();
  matrix.stroke(0xFFFFFFFF);
  matrix.textFont(Font_5x7);

  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.print((int)temperature);
  matrix.print("C");
  matrix.endText();

  matrix.endDraw();
}

void showHumidity() {
  matrix.beginDraw();
  matrix.clear();
  matrix.stroke(0xFFFFFFFF);
  matrix.textFont(Font_5x7);

  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.print((int)humidity);
  matrix.print("%");
  matrix.endText();

  matrix.endDraw();
}

void showText(String text) {
  matrix.beginDraw();
  matrix.clear();
  matrix.stroke(0xFFFFFFFF);
  matrix.textFont(Font_5x7);

  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.print(text);
  matrix.endText();

  matrix.endDraw();
}
