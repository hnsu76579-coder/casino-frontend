import { useState } from "react";
import { motion } from "framer-motion";
import { changeUsername } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";
import { logout } from "../utils/auth";

const ChangeUsername = () => {
  const [form, setForm] = useState({
    password: "",
    newUsername: "",
  });

  const submit = async () => {
    await changeUsername(form);

    alert("Username changed. Please login again.");
    logout(); // 🔥 JWT becomes invalid
  };

  return (
    <>
      <AdminHeader />
      <motion.div
        className="admin-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ maxWidth: 420, margin: "auto" }}
      >
        <div className="casino-form-card">
          <h2>Change Username</h2>

          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <input
  type="text"   // 🔥 ADD THIS
  placeholder="New Username"
  onChange={(e) =>
    setForm({ ...form, newUsername: e.target.value })
  }
/>

          <button onClick={submit}>Change Username</button>
        </div>
      </motion.div>
    </>
  );
};

export default ChangeUsername;
