import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplet, Sun } from "lucide-react";

// components
import Header from "../components/common/Header";
import Card from "../components/common/Card";

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
  const light = "ON";

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
          <Card
            name="Temperature (outside)"
            gif={temp_outside >= 30 ? temphigh : templow}
            // icon={Thermometer}
            value={temp_outside}
            color={temp_outside >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          <Card
            name="Temperature (inside)"
            gif={temp_inside >= 30 ? temphigh : templow}
            icon={Thermometer}
            value={temp_inside}
            color={temp_inside >= 30 ? "text-orange-600" : "text-gray-100"}
          />
          <Card
            name="Humidity"
            gif={humidity < 70 ? humidlow : humidhigh}
            icon={Droplet}
            value={humidity}
            color={humidity < 70 ? "text-orange-600" : "text-gray-100"}
          />
          <Card
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
