import React, { useState } from "react";
import { BarChart2, ShoppingBag, Menu } from "lucide-react";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2,
    color: "#6366f1",
    path: "/",
  },
  {
    name: "Inventory",
    icon: ShoppingBag,
    color: "#6EE7B7",
    href: "/inventory",
  },
];

const Sidebar = () => {
  const [isSidbarOpen, setIsSidbarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidbarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidbarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidbarOpen(!isSidbarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
