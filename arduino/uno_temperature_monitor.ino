/*
  Arduino IoT Temperature Monitor
  Board: Arduino UNO Q
  Purpose: Send temperature data to cloud server
*/

const SERVER_URL = "https://arduino-iot-server.onrender.com/data";

void setup() {
  Serial.begin(9600);
  delay(1000);

  Serial.println("UNO Q IoT Monitor Starting...");
}

void loop() {
  float temperature = 28.5;
  float humidity = 65.0;

  String jsonData = createJSON(temperature, humidity);

  Serial.println("JSON Data:");
  Serial.println(jsonData);

  // Later: sendToCloud(jsonData);

  delay(5000);
}

String createJSON(float temperature, float humidity) {
  String json = "{";
  json += "\"temperature\":";
  json += temperature;
  json += ",";
  json += "\"humidity\":";
  json += humidity;
  json += ",";
  json += "\"device\":\"UNO_Q\"";
  json += "}";

  return json;
}