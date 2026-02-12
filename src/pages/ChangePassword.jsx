import { useState } from "react";
import { motion } from "framer-motion";
import { changePassword } from "../api/adminApi";
import AdminHeader from "../components/AdminHeader";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    await changePassword(form);
    alert("Password changed successfully");
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
          <h2>Change Password</h2>

          <input
            type="password"
            placeholder="Old Password"
            onChange={(e) =>
              setForm({ ...form, oldPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button onClick={submit}>Change Password</button>
        </div>
      </motion.div>
    </>
  );
};

export default ChangePassword;
