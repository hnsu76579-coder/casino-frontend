import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SlotDetails from "./pages/SlotDetails";
import ChangePassword from "./pages/ChangePassword";
import ChangeUsername from "./pages/ChangeUsername";
import AdminRoute from "./components/AdminRoute";
import "./styles/casino.css";
import { useEffect } from "react";
import { connectSocket } from "./websocket/socket";
import SlotHistory from "./pages/SlotHistory";

function App() {
  useEffect(() => {
    connectSocket(); // 🔥 CONNECT ON APP LOAD
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slot/:id" element={<SlotDetails />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/slot/:id/history" element={<SlotHistory />} />

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
