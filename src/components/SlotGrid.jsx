import { motion } from "framer-motion";
import SlotCard from "./SlotCard";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const SlotGrid = ({ slots }) => (
  <motion.div
    className="grid"
    variants={container}
    initial="show"   // 🔥 IMPORTANT CHANGE
    animate="show"
  >
    {slots.map((s) => (
      <motion.div key={s.id} variants={item}>
        <SlotCard slot={s} />
      </motion.div>
    ))}
  </motion.div>
);

export default SlotGrid;
