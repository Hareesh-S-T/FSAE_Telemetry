#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// const char* ssid = "OP7TPro";
// const char* pw = "0987654321";

const char* ssid = "NETGEAR33";
const char* pw = "sillyoctopus391";

const char* mqtt_server = "192.168.1.201";
const int mqtt_port = 1883;
const char* mqtt_user = "user";
const char* mqtt_pw = "admin";


WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pw);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");

  client.setServer(mqtt_server, mqtt_port);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("ESP32Client", mqtt_user, mqtt_pw)) {

      Serial.println("connected");

    } else {

      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(200);
    }
  }
}

void loop() {
  int reading = analogRead(36);
  int coolantTemp = 24.94 + 0.01287 * reading + 0.0001056 * reading * reading;
  Serial.println(coolantTemp);

  StaticJsonDocument<256> body;
  body["coolantTemp"] = coolantTemp;

  char msg[256];
  serializeJson(body, msg);
  client.publish("Telemetry", msg);
}