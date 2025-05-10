import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";
import {
  LayoutDashboard,
  Box,
  Wrench,
  LogOut,
  Menu,
  CircleUserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#6EE7B7",
    href: "/dashboard",
  },
  {
    name: "Inventory",
    icon: Box,
    color: "#6EE7B7",
    href: "/inventory",
  },
  {
    name: "Hardware",
    icon: Wrench,
    color: "#6EE7B7",
    href: "/hardware",
  },
  {
    name: "Logout",
    icon: LogOut,
    color: "#6EE7B7",
  },
];

const Sidebar = () => {
  const [isSidbarOpen, setIsSidbarOpen] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user: ", user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("Doc snap data: ", docSnap.data());
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!!");
      toast.success("User Logged out Successfully!!", {
        position: "top-center",
      });
      await delay();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidbarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidbarOpen ? 256 : 80 }}
      >
        <div className="h-full bg-green-300/40 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
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
            {SIDEBAR_ITEMS.map((item) =>
              item.name === "Logout" ? (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="w-full text-left"
                >
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
                </button>
              ) : (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 gap-5
                    ${location.pathname === item.href ? "bg-gray-700" : ""}
                    `}
                  >
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
              )
            )}
          </nav>

          {/* Profile*/}
          <Link to="/profile">
            <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors mb-2 gap-5">
              <CircleUserRound
                src="src/assets/icons/profile.png"
                alt="profile"
                size={20}
                style={{ minWidth: "20px" }}
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
                    <div>
                      {userDetails !== null ? userDetails.firstname : "profile"}
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
