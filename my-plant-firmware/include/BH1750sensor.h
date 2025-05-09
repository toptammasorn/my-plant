// bh1750_sensor.h
#ifndef BH1750_SENSOR_H
#define BH1750_SENSOR_H

#include <Wire.h>
#include <BH1750.h>
#include <OneWire.h>
#include <DallasTemperature.h>

extern BH1750 lightMeter;

extern OneWire oneWire_3;
extern DallasTemperature BH;

extern float BHLux;

#endif
