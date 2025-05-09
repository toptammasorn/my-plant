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
  const temp_outside = 32;
  const temp_inside = 29;
  const humidity = 70;
  const light = "OFF";

  // RTDB
  const [intValue, setIntValue] = useState(null);
  const [floatValue, setFloatValue] = useState(null);
  const [stringValue, setStringValue] = useState("");

  // DHT22
  const [dht22Temp, setDht22Temp] = useState(0);
  const [dht22Humid, setDht22Humid] = useState(0);
  // DS18B20
  const [dsTemp1, setDsTemp1] = useState(0);
  const [dsTemp2, setDsTemp2] = useState(0);
  // LUX sensor
  const [lux, setLux] = useState(0);
  // Water level sensor
  const [waterLevel, setWaterLevel] = useState(0);

  const intRef = ref(database, "test/int");
  const floatRef = ref(database, "test/float");
  const stringRef = ref(database, "test/string");

  // DHT22
  const dht22TempRef = ref(database, "sensors/dht22/temperature");
  const dht22HumidRef = ref(database, "sensors/dht22/humidity");
  // DS18B20
  const dsTemp1Ref = ref(database, "sensors/dsTemp1");
  const dsTemp2Ref = ref(database, "sensors/dsTemp2");
  // LUX sensor
  const luxRef = ref(database, "sensors/lux");
  // Water level sensor
  const waterLevelRef = ref(database, "sensors/waterLevel");

  useEffect(() => {
    onValue(intRef, (snapshot) => {
      console.log("int:", snapshot.val());
      setIntValue(snapshot.val());
    });

    onValue(floatRef, (snapshot) => {
      console.log("float:", snapshot.val());
      setFloatValue(snapshot.val());
    });

    onValue(stringRef, (snapshot) => {
      console.log("string:", snapshot.val());
      setStringValue(snapshot.val());
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
            gif={dht22Temp >= 20 ? temphigh : templow}
            // icon={Thermometer}
            value={dht22Temp}
            color={dht22Temp >= 20 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Temperature (inside)"
            gif={temp_inside >= 30 ? temphigh : templow}
            icon={Thermometer}
            value={temp_inside}
            color={temp_inside >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          {/* DHT22 */}
          <CardParameter
            name="Temperature (inside) - DHT22"
            gif={dht22Temp >= 30 ? temphigh : templow}
            icon={Droplet}
            value={dht22Temp}
            color={dht22Temp >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Humidity - DHT22"
            gif={dht22Humid < 70 ? humidlow : humidhigh}
            icon={Droplet}
            value={dht22Humid}
            color={dht22Humid < 70 ? "text-orange-600" : "text-gray-100"}
          />
          <CardParameter
            name="Light"
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
