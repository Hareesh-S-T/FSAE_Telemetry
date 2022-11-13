// #include <SoftwareSerial.h>
#include <ArduinoJson.h>

// SoftwareSerial Serial1(2, 3);

int coolantTemp, fuelLevel = 0;
#define tempPin A0
#define fuelPin A1

void setup() {
  // Serial.begin(19200);
  // Serial1.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);

  int reading = analogRead(tempPin);
  coolantTemp = 24.94 + 0.01287 * reading + 0.0001056 * reading * reading;

  // reading = analogRead(fuelPin);
  // fuelLevel = (reading / 256) * 100;

  // Serial.print("Coolant Temperature: ");
  // Serial.println(coolantTemp);


  // Serial.print("Fuel Level: ");
  // Serial.println(fuelLevel);

  StaticJsonDocument<256> doc;
  doc["coolantTemp"] = coolantTemp;
  doc["fuelLevel"] = fuelLevel;

  // serializeJson(doc, Serial1);
  delay(500);
}