import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SlotDetails from "./pages/SlotDetails";
import ChangePassword from "./pages/ChangePassword";
import ChangeUsername from "./pages/ChangeUsername";
import SlotHistory from "./pages/SlotHistory";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";
import  MaintenancePage from "./components/MaintenancePage";

import { connectSocket } from "./websocket/socket";
import "./styles/casino.css";

// 🔥 HARD CODE HERE
// const MAINTENANCE_MODE = false;

// function App() {
//   useEffect(() => {
//     if (!MAINTENANCE_MODE) {
//       connectSocket(); // connect only when live
//     }
//   }, []);

//   // 🚨 SHOW MAINTENANCE PAGE FIRST
//   if (MAINTENANCE_MODE) {
//     return <MaintenancePage />;
//   }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slot/:id" element={<SlotDetails />} />
        <Route path="/slot/:id/history" element={<SlotHistory />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/change-password"
          element={
            <AdminRoute>
              <ChangePassword />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/change-username"
          element={
            <AdminRoute>
              <ChangeUsername />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
