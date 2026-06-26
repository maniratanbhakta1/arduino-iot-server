/*
  Arduino IoT Temperature Monitor
  Board: Arduino UNO Q
  Purpose: Send temperature data to cloud server
*/

void setup() {
  Serial.begin(9600);
  delay(1000);

  Serial.println("UNO Q IoT Monitor Starting...");
}

void loop() {
  float temperature = 28.5;
  float humidity = 65.0;

  Serial.print("Temperature: ");
  Serial.println(temperature);

  Serial.print("Humidity: ");
  Serial.println(humidity);

  delay(5000);
}