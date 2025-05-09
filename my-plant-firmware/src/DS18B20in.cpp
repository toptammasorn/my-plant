#include "DS18B20in.h"

// Temp sensors
OneWire oneWire_2(ONE_WIRE_BUS_2);
DallasTemperature DS2(&oneWire_2);

float DS2Temp = 0.0;