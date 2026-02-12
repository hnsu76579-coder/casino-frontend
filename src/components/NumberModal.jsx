import { motion } from "framer-motion";
import { useState } from "react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const boxVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const NumberModal = ({ onClose, onSave }) => {
  const [value, setValue] = useState("");

  return (
    <motion.div
      className="modal-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal-box"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <h3>Change Slot Number</h3>

        <input
        className="casino-input"
          type="number"
          placeholder="-1 for no number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={() => onSave(Number(value))}>Save</button>
          <button className="casino-btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NumberModal;
