#include "dht22.h"

// DHT sensor
DHT dht(DHTPIN, DHTTYPE);

float dht22Humid = 0;
float dht22Temp = 0;