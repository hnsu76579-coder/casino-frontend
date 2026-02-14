import { io } from "socket.io-client";

let socket = null;
let slotListeners = [];
let resetListeners = [];

export const connectSocket = () => {
  if (socket) return;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  // Slot update event
  socket.on("slot-update", (data) => {
    slotListeners.forEach((cb) => cb(data));
  });

  // Reset event
  socket.on("reset-all", () => {
    resetListeners.forEach((cb) => cb());
  });
};

export const addSlotListener = (cb) => {
  slotListeners.push(cb);
  connectSocket(); // 🔥 ensure socket connected
};

export const addResetListener = (cb) => {
  resetListeners.push(cb);
  connectSocket(); // 🔥 ensure socket connected
};
