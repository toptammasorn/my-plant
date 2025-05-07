import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements, // Corrected the typo here
  RouterProvider,
} from "react-router-dom";

// pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import ProfilePage from "./pages/ProfilePage";
import HardwarePage from "./pages/HardwarePage";
import FetchDataPage from "./pages/FetchDataPage";

// layouts
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* No layout */}
      <Route path="/" element={<RegisterPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/fetch" element={<FetchDataPage />} />

      {/* With MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hardware" element={<HardwarePage />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
