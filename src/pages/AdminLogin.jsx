import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { adminLogin } from "../api/adminApi";
import { isAdminLoggedIn } from "../utils/auth";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAdminLoggedIn()) {
      window.location.href = "/admin";
    }
  }, []);

  const submit = async () => {
    const res = await adminLogin(form);
    localStorage.setItem("token", res.data.data.token);
    window.location.href = "/admin";
  };

  return (
    <motion.div
      className="casino-form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="casino-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", damping: 24 }}
      >
        <h2>Admin Login</h2>
      

        <input
          type="text"                 // 🔥 IMPORTANT
          className="casino-input"    // 🔥 IMPORTANT
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          className="casino-input"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit}>Login</button>

      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
