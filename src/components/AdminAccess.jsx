import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminAccess = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      className="admin-access-btn"
      onClick={() => navigate("/admin/login")}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 24 }}
    >
      Admin
    </motion.button>
  );
};

export default AdminAccess;
