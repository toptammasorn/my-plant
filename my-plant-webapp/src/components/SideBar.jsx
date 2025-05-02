import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Wrench, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#6366f1",
    href: "/dashboard",
  },
  {
    name: "Inventory",
    icon: Wrench,
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
        {/* Sidebar toggle button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidbarOpen(!isSidbarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        {/* Sidebar items */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 gap-5">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />

                <AnimatePresence>
                  {isSidbarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Profile*/}
        <Link>
          <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors mb-2 gap-5">
            <img
              src="src/assets/icons/profile.png"
              alt="profile"
              className="w-5 h-5"
            />

            <AnimatePresence>
              {isSidbarOpen && (
                <motion.span
                  className="ml-4 whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  Profile
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;
