import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplet, Sun } from "lucide-react";

// components
import Header from "../components/common/Header";
import Card from "../components/common/Card";

// icons
import tempcold from "../assets/icons/plant-factors/temp-cold.gif";

const Dashboard = () => {
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
            // icon={Thermometer}
            value="31 °C"
            color="#6366F1"
            gif={tempcold}
          />
          <Card
            name="Temperature (inside)"
            icon={Thermometer}
            value="25 °C"
            color="#6366F1"
          />
          <Card name="Humidity" icon={Droplet} value="70 %" color="#6366F1" />
          <Card name="Light" icon={Sun} value="ON" color="#6366F1" />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
