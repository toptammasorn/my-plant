#include "DS18B20out.h"

// Temp sensors
OneWire oneWire_1(ONE_WIRE_BUS_1);
DallasTemperature DS1(&oneWire_1);

float DS1Temp = 0.0;