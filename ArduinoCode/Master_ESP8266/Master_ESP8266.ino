#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "OP7TPro";
const char* pw = "0987654321";

const char* mqtt_server = "192.168.1.201";
const int mqtt_port = 1883;
const char* mqtt_user = "user";
const char* mqtt_pw = "admin";

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
  Serial.begin(9600);
  while (!Serial) {
  }
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
  StaticJsonDocument<300> body;
  DeserializationError err = deserializeJson(body, Serial);
  if (err == DeserializationError::Ok) {
    Serial.print("coolantTemp = ");
    Serial.println(body["coolantTemp"].as<int>());
    Serial.print("fuelLevel = ");
    Serial.println(body["fuelLevel"].as<int>());
    char msg[256];
    serializeJson(body, msg);
    client.publish("Telemetry", msg);
    // Serial.println("TESTING");
    delay(100);

  } else {
    Serial.print("deserializeJson() returned ");
    Serial.println(err.c_str());
    while (Serial.available() > 0)
      Serial.read();
  }
}
