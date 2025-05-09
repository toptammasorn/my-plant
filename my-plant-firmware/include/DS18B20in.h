#ifndef DS18B20IN_h
#define DS18B20IN_h

#include <OneWire.h>
#include <DallasTemperature.h>

// Temp sensors
#define ONE_WIRE_BUS_2 7

// Temp sensors
extern OneWire oneWire_2;
extern DallasTemperature DS2;

extern float DS2Temp;

#endif