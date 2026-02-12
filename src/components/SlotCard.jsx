import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { to12Hour } from "../utils/time";

const SlotCard = ({ slot }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="slot-card"
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => navigate(`/slot/${slot.id}`)}
    >
      <h2>{slot.slotName}</h2>

      <p>
        {to12Hour(slot.startTime)} - {to12Hour(slot.endTime)}
      </p>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Click to reveal 🎰
      </motion.div>
    </motion.div>
  );
};

export default SlotCard;
