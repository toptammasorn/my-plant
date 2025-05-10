import React from "react";
import { Outlet } from "react-router-dom";

// import components
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div
      className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden"
      style={{
        backgroundImage: "url('../src/assets/backgrounds/Shire.jpg')",
      }}
    >
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-60" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
