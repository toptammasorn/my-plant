import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <SideBar />
      <main></main>
      <Footer />
    </>
  );
};

export default MainLayout;
