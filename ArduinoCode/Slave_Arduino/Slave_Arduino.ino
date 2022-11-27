#include <AltSoftSerial.h>
#include <ArduinoJson.h>

AltSoftSerial Serial1;

int coolantTemp, fuelLevel = 0;
#define tempPin A0
#define fuelPin A1

void setup() {
  Serial.begin(19200);
  Serial1.begin(9600);
}
void loop() {
  int reading = analogRead(tempPin);
  coolantTemp = 24.94 + 0.01287 * reading + 0.0001056 * reading * reading;

  reading = analogRead(fuelPin);
  fuelLevel = 1.96 * reading - 10.72;
// fuelLevel = reading;

  Serial.print("C: ");
  Serial.println(coolantTemp);
  Serial.print("%: ");
  Serial.println(fuelLevel);

  StaticJsonDocument<256> body;
  body["coolantTemp"] = coolantTemp;
  body["fuelLevel"] = fuelLevel;

  serializeJson(body, Serial1);

  delay(100);
}