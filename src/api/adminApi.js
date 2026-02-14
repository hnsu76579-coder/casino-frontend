import api from "./axios";

// 🔐 Login
export const adminLogin = (data) =>
  api.post("/api/admin/login", data);

// 🔢 Update slot number
export const updateNumber = (id, number) =>
  api.put(`/api/admin/slots/${id}/number`, { number });

// ✏️ Edit slot
export const updateSlot = (id, data) =>
  api.put(`/api/admin/slots/${id}`, data);

// 🔐 Change password
export const changePassword = (data) =>
  api.put("/api/admin/account/change-password", data);

// 👤 Change username
export const changeUsername = (data) =>
  api.put("/api/admin/account/change-username", data);

//reset request
export const resetAllSlots = () => {
  return axios.post("/api/admin/slots/reset-all");
};
