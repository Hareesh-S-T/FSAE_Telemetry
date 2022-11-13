#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);
  while (!Serial) continue;
  Serial1.begin(9600);
}

void loop() {
  if (Serial1.available()) {
    StaticJsonDocument<300> doc;
    DeserializationError err = deserializeJson(doc, Serial1);
    if (err == DeserializationError::Ok) {
      Serial.print("coolantTemp = ");
      Serial.println(doc["coolantTemp"].as<int>());
      Serial.print("fuelLevel = ");
      Serial.println(doc["fuelLevel"].as<int>());
    } else {
      Serial.print("deserializeJson() returned ");
      Serial.println(err.c_str());
      while (Serial1.available() > 0)
        Serial1.read();
    }
  }
}