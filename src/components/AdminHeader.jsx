import { motion } from "framer-motion";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LiveDateTime from "./LiveDateTime";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      className="admin-header-bar"
      initial={{ y: -50, opacity: 0.9 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 24, stiffness: 300 }}
    >
      <div className="header-inner">
        <button onClick={() => navigate("/")}>⬅ Home</button>
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <LiveDateTime />
    </motion.header>
  );
};

export default AdminHeader;
