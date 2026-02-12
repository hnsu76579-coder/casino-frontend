import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

const AdminRoute = ({ children }) => {
  return isAdminLoggedIn() ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
