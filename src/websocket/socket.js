import { io } from "socket.io-client";

let socket = null;
let listeners = [];

export const connectSocket = () => {
  if (socket) return;

  socket = io(import.meta.env.VITE_SOCKET_URL);

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("slot-update", (data) => {
    listeners.forEach((cb) => cb(data));
  });
};

export const addSlotListener = (cb) => {
  listeners.push(cb);
};
export const addResetListener = (callback) => {
  socket.on("reset-all", callback);
};


