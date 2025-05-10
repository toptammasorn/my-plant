import React from "react";
import { motion } from "framer-motion";

export const CardParameter = ({
  name,
  device,
  icon: Icon,
  value,
  color,
  gif,
}) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center justify-center text-sm font-medium text-gray-400">
          <img src={gif} alt="icon" className="w-20 h-20 m-2 mb-5" />
        </span>
        <span>{name}</span>
        <span className="flex items-center text-sm font-medium text-gray-400">
          <div className="w-6 h-6 mr-2 mt-1">{device}</div>
        </span>
        <p className={`mt-1 text-3xl font-semibold text-gray-100 ${color}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export const CardProfile = ({ cardName, information }) => {
  return (
    <div className="flex flex-wrap items-center text-sm font-medium">
      {/* Profile topic */}
      <div className="text-white min-w-[100px]">{`${cardName} :`}</div>
      {/* Profile information */}
      <div className="flex-1 text-gray-400 ml-2 bg-black rounded-md ">
        <div className="p-1 ml-2">{`${information}`}</div>
      </div>
    </div>
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
