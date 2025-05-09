#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>
#include "DHT.h"

#include "dht22.h"
#include "DS18B20out.h"
#include "DS18B20in.h"

// Wi-Fi and Firebase credentials
#define WIFI_SSID "Laptop"
#define WIFI_PASSWORD "12345678"
#define Web_API_KEY "AIzaSyCkIxhR6DGcRtrvAyGj6oK9F-rnaEKaU9Y"
#define DATABASE_URL "https://my-plant-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define USER_EMAIL "tammasorn.game@gmail.com"
#define USER_PASS "123456"

// Firebase
UserAuth user_auth(Web_API_KEY, USER_EMAIL, USER_PASS);
FirebaseApp app;
WiFiClientSecure ssl_client;
using AsyncClient = AsyncClientClass;
AsyncClient aClient(ssl_client);
RealtimeDatabase Database;

// Non-blocking timers
unsigned long lastSensorRead = 0;
unsigned long lastFirebaseSend = 0;
const unsigned long sensorReadInterval = 2000;  // Read sensor every 2s
const unsigned long firebaseSendInterval = 3000; // Send to Firebase every 3s

// Firebase callback
void processData(AsyncResult &aResult) {
  if (!aResult.isResult()) return;

  if (aResult.isEvent())
    Firebase.printf("Event: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.eventLog().message().c_str(), aResult.eventLog().code());
  if (aResult.isDebug())
    Firebase.printf("Debug: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
  if (aResult.isError())
    Firebase.printf("Error: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
  if (aResult.available())
    Firebase.printf("Task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());
}

void setup() {
  Serial.begin(115200);

  // Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();

  // Firebase
  ssl_client.setInsecure(); // skip cert validation
  ssl_client.setHandshakeTimeout(5);
  initializeApp(aClient, app, getAuth(user_auth), processData, "🔐 authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);

  // DHT sensor
  dht.begin();

  // DS18B20 sensors
  DS1.begin();
  DS2.begin();
}

void loop() {
  app.loop(); // always run this!

  unsigned long now = millis();

  // Read sensor every 2 seconds (non-blocking)
  if (now - lastSensorRead >= sensorReadInterval) {
    lastSensorRead = now;

    // DHT22
    dht22Humid = dht.readHumidity();
    dht22Temp = dht.readTemperature();

    if (!isnan(dht22Humid) && !isnan(dht22Temp)) {
      Serial.printf("[DHT22] 🌡️ Temperature: %.2f °C\t💧 Humidity: %.2f %%\n", dht22Temp, dht22Humid);
    } else {
      Serial.println("❌ Failed to read from DHT sensor!");
    }

    // DS18B20 - out
    DS1.requestTemperatures();
    DS1Temp = DS1.getTempCByIndex(0);
    if (!isnan(DS1Temp)) {
      Serial.printf("🌡️ [DS1] Temperature: %.2f °C\t💧\n", DS1Temp);
    } else {
      Serial.println("❌ Failed to read from DS sensor!");
    }

    // DS18B20 - in
    DS2.requestTemperatures();
    DS2Temp = DS2.getTempCByIndex(0);
    if (!isnan(DS2Temp)) {
      Serial.printf("🌡️ [DS2] Temperature: %.2f °C\t💧\n", DS2Temp);
    } else {
      Serial.println("❌ Failed to read from DS sensor!");
    }
  }

  // Send to Firebase every 3 seconds (non-blocking)
  if (app.ready() && now - lastFirebaseSend >= firebaseSendInterval) {
    lastFirebaseSend = now;
    
    // DS18B20 - out
    Database.set<float>(aClient, "/sensors/ds18b20-out/temperature", DS1Temp, processData, "RTDB_Send_DS1_Temperature");
    
    // DS18B20 - in
    Database.set<float>(aClient, "/sensors/ds18b20-in/temperature", DS2Temp, processData, "RTDB_Send_DS2_Temperature");

    // DHT22
    Database.set<float>(aClient, "/sensors/dht22/humidity", dht22Humid, processData, "RTDB_Send_Humidity");
    Database.set<float>(aClient, "/sensors/dht22/temperature", dht22Temp, processData, "RTDB_Send_Temperature");
  }
}
