import React from "react";
import { motion } from "framer-motion";

export const CardParameter = ({ name, icon: Icon, value, color, gif }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <img src={gif} alt="icon" className="w-6 h-6 mr-2" />
          {name}
        </span>
        <p className={`mt-1 text-3xl font-semibold text-gray-100 ${color}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export const CardProfile = ({ name, icon: Icon, value, color, gif }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6 space-y-2">
        {/* First name */}
        <div className="flex flex-wrap items-center text-sm font-medium">
          <div className="text-white min-w-[100px]">First name:</div>
          <div className="flex-1 text-gray-400 ml-2 bg-black rounded-md ">
            <div className="p-1 ml-2">{name}</div>
          </div>
        </div>
        {/* Last name */}
        <div className="flex flex-wrap items-center text-sm font-medium">
          <div className="text-white min-w-[100px]">First name:</div>
          <div className="flex-1 text-gray-400 ml-2 bg-black rounded-md">
            <div className="p-1 ml-2">{name}</div>
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-wrap items-center text-sm font-medium">
          <div className="text-white min-w-[100px]">First name:</div>
          <div className="flex-1 text-gray-400 ml-2 bg-black rounded-md">
            <div className="p-1 ml-2">{name}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CardPhoto = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 ${className}`}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <img
        src="src/assets/icons/profile.png"
        alt="profile"
        className="w-full h-auto object-cover"
      />
    </motion.div>
  );
};
