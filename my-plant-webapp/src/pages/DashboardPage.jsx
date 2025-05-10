import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplet, Sun } from "lucide-react";

// firebase
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config";

// components
import Header from "../components/common/Header";
import { CardParameter } from "../components/common/Card";

// icons
import templow from "../assets/icons/plant-factors/temp-low.gif";
import temphigh from "../assets/icons/plant-factors/temp-high.gif";
import humidlow from "../assets/icons/plant-factors/humid-low.gif";
import humidhigh from "../assets/icons/plant-factors/humid-high.gif";
import lighton from "../assets/icons/plant-factors/light-on.gif";
import lightoff from "../assets/icons/plant-factors/light-off.gif";

const Dashboard = () => {
  const light = "OFF";

  // DHT22
  const [dht22Temp, setDht22Temp] = useState(0);
  const [dht22Humid, setDht22Humid] = useState(0);
  // DS18B20
  const [ds1Temp, setDs1Temp] = useState(0);
  const [ds2Temp, setDs2Temp] = useState(0);
  // LUX sensor
  const [lux, setLux] = useState(0);
  // Water level sensor
  const [waterLevel, setWaterLevel] = useState(0);

  const stringRef = ref(database, "test/string");

  // DHT22
  const dht22TempRef = ref(database, "sensors/dht22/temperature");
  const dht22HumidRef = ref(database, "sensors/dht22/humidity");
  // DS18B20-out
  const dsTemp1Ref = ref(database, "sensors/ds18b20-out/temperature");
  // DS18B20-in
  const dsTemp2Ref = ref(database, "sensors/ds18b20-in/temperature");
  // BH1750
  const luxRef = ref(database, "sensors/bh1750/lux");
  // XKC-Y25-V
  const waterLevelRef = ref(database, "sensors/waterLevel");

  useEffect(() => {
    onValue(dsTemp1Ref, (snapshot) => {
      console.log("ds1Temp:", snapshot.val());
      setDs1Temp(snapshot.val());
    });

    onValue(dsTemp2Ref, (snapshot) => {
      console.log("ds2Temp:", snapshot.val());
      setDs2Temp(snapshot.val());
    });

    // DHT22
    onValue(dht22TempRef, (snapshot) => {
      console.log("dht22Temp:", snapshot.val());
      setDht22Temp(snapshot.val());
    });

    onValue(dht22HumidRef, (snapshot) => {
      console.log("dht22Humid:", snapshot.val());
      setDht22Humid(snapshot.val());
    });

    // BH1750
    onValue(luxRef, (snapshot) => {
      console.log("lux:", snapshot.val());
      setLux(snapshot.val());
    });

    // XKC-Y25-V
    onValue(stringRef, (snapshot) => {
      console.log("string:", snapshot.val());
      setStringValue(snapshot.val());
    });
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Values */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CardParameter
            name="Temperature (outside)"
            gif={ds1Temp >= 30 ? temphigh : templow}
            device="DS18B20"
            icon={Thermometer}
            value={ds1Temp}
            color={ds1Temp >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Temperature (inside)"
            device="DS18B20"
            gif={ds2Temp >= 30 ? temphigh : templow}
            icon={Thermometer}
            value={ds2Temp}
            color={ds2Temp >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          {/* DHT22 */}
          <CardParameter
            name="Temperature (inside)"
            device="DHT22"
            gif={dht22Temp >= 30 ? temphigh : templow}
            icon={Droplet}
            value={dht22Temp}
            color={dht22Temp >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Humidity"
            device="DHT22"
            gif={dht22Humid < 70 ? humidlow : humidhigh}
            icon={Droplet}
            value={dht22Humid}
            color={dht22Humid < 70 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Lux"
            device="BH1750"
            gif={lux <= 20 ? lighton : lightoff}
            icon={Sun}
            value={lux}
            color={lux <= 20 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Water level"
            device="XKCY25V"
            gif={light == "OFF" ? lightoff : lighton}
            icon={Sun}
            value={light}
            color="text-gray-100"
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
