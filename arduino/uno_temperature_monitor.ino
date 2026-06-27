/*
  Arduino IoT Temperature Monitor
  Board: Arduino UNO Q
  Purpose: Read DHT sensor values and print JSON for App Lab sender.py
*/

#define DHT_PIN 2
#define DEVICE_NAME "UNO_Q"
#define SEND_INTERVAL 5000

// Use this later after installing DHT library
#include "DHT.h"

#define DHT_TYPE DHT11
// If using DHT22, change above line to:
// #define DHT_TYPE DHT22

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  delay(1000);

  dht.begin();

  Serial.println("UNO Q IoT Monitor Starting...");
  Serial.println("DHT Sensor Initialized");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor");
    delay(SEND_INTERVAL);
    return;
  }

  String jsonData = createJSON(temperature, humidity);

  Serial.println(jsonData);

  delay(SEND_INTERVAL);
}

String createJSON(float temperature, float humidity) {
  String json = "{";
  json += "\"temperature\":";
  json += String(temperature, 2);
  json += ",";
  json += "\"humidity\":";
  json += String(humidity, 2);
  json += ",";
  json += "\"device\":\"";
  json += DEVICE_NAME;
  json += "\"";
  json += "}";

  return json;
}