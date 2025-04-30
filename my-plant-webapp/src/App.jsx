import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements, // Corrected the typo here
  RouterProvider,
} from "react-router-dom";

import { auth } from "./firebase/config.js";

// pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// components
import SideBar from "./components/SideBar";

// layouts
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      {/* Authentication */}
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* Main pages */}
      <div>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
