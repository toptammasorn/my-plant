#ifndef DHT22_h
#define DHT22_h

#include <DHT.h>

// DHT sensor
#define DHTPIN 5
#define DHTTYPE DHT22

// DHT sensor
extern DHT dht;

extern float dht22Humid;
extern float dht22Temp;

#endif