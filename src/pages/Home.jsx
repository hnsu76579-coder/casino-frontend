import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSlots } from "../api/slotApi";
import { addSlotListener } from "../websocket/socket";
import SlotGrid from "../components/SlotGrid";
import AdminAccess from "../components/AdminAccess";
import LiveDateTime from "../components/LiveDateTime";

const Home = () => {
  const queryClient = useQueryClient();

  // 🔥 Frontend cached slots
  const { data: slots = [] } = useQuery({
    queryKey: ["slots"],
    queryFn: () => getAllSlots().then(res => res.data.data),
    staleTime: 5000,
  });

  // 🔥 WebSocket updates cache WITHOUT changing order
  useEffect(() => {
    addSlotListener((updatedSlot) => {
      queryClient.setQueryData(["slots"], (prev = []) => {
        const index = prev.findIndex(
          (s) => Number(s.id) === Number(updatedSlot.id)
        );

        if (index === -1) return prev;

        const newSlots = [...prev];
        newSlots[index] = {
          ...prev[index],      // keep original structure
          ...updatedSlot,      // update only changed values
        };

        return newSlots; // order preserved
      });
    });
  }, [queryClient]);

  return (
    <>
      <AdminAccess />
      <LiveDateTime />

      <motion.h1
        className="home-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🎰 CASINO SLOT BOARD 🎰
      </motion.h1>

      <SlotGrid slots={slots} />
    </>
  );
};

export default Home;
