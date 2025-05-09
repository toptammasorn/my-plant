#ifndef DS18B20OUT_h
#define DS18B20OUT_h

#include <OneWire.h>
#include <DallasTemperature.h>

// Temp sensors
#define ONE_WIRE_BUS_1 6

// Temp sensors
extern OneWire oneWire_1;
extern DallasTemperature DS1;

extern float DS1Temp;

#endif