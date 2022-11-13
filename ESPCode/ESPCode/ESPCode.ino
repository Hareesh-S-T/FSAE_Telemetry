#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define tempPin A0

const char* ssid = "NETGEAR33";
const char* pw = "sillyoctopus391";


// const char* ssid = "OP7TPro";
// const char* pw = "0987654321";


const char* mqtt_server = "192.168.1.201";
const int mqtt_port = 1883;
const char* mqtt_user = "user";
const char* mqtt_pw = "admin";

int coolantTemp;


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
      client.publish("outTopic", "hello world");
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("Retrying");
      // Wait 0.5s before retrying
      delay(100);
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

  Serial.print("Coolant Temperature: ");
  Serial.println(coolantTemp);

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
  }


  // Serial.print("Publish message: ");
  // Serial.println(msg);

  // client.publish("dht", cstr);
  // client.publish("bmp", cshr);
}