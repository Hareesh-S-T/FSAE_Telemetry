#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define tempPin A0
// #define tempPin A1

// const char* ssid = "NETGEAR33";
// const char* pw = "sillyoctopus391";

const char* ssid = "OP7TPro";
const char* pw = "0987654321";


const char* mqtt_server = "192.168.123.159";
const int mqtt_port = 1883;
const char* mqtt_user = "user";
const char* mqtt_pw = "admin";

int coolantTemp;
int fuelLevel;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(100);
  Serial.print("Attempting Connection");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pw);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("\nConnection Established");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT Connection");
    String clientId = "ESP8266Client";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pw)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("Retrying");
      delay(500);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  reconnect();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  int reading = analogRead(tempPin);
  coolantTemp = 24.94 + 0.01287 * reading + 0.0001056 * reading * reading;

  // reading = analogRead(fuel);
  // fuelLevel = 1.96 * reading - 13.72;

  Serial.print("Coolant Temperature: ");
  Serial.println(coolantTemp);

  StaticJsonDocument<256> body;
  body["coolantTemp"] = coolantTemp;
  body["fuelLevel"] = fuelLevel;

  char msg[256];
  serializeJson(body, msg);
  client.publish("Telemetry", msg);

  delay(500);
}