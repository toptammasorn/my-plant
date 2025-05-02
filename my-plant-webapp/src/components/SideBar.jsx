import React from "react";
import { BarChart2, ShoppingBag } from "lucide-react";

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
  return (
    <div>
      <h1>Sidebarl</h1>
      <Outlet />
    </div>
  );
};

export default Sidebar;
