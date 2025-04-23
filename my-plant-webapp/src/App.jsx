import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements, // Corrected the typo here
  RouterProvider,
} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" index element={<RegisterPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/dashboard" index element={<DashboardPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
