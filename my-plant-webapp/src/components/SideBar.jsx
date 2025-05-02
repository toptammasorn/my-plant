import React from "react";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <h1>Sidebarl</h1>
      <Outlet />
    </div>
  );
};

export default Sidebar;
