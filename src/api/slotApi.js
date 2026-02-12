import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/slots`;

export const getAllSlots = () => axios.get(API);

export const getSlotById = (id) => axios.get(`${API}/${id}`);

export const getSlotHistory = (slotId, page = 0) => {
  return axios.get(
    `${API}/${slotId}/history?page=${page}`
  );
};
