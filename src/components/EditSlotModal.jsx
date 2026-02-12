import { useState } from "react";
import { motion } from "framer-motion";

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

const EditSlotModal = ({ slot, onClose, onSave }) => {
  const [form, setForm] = useState({
    slotName: slot.slotName,
    startTime: slot.startTime,
    endTime: slot.endTime,
    active: slot.active,
  });

  return (
    <motion.div
      className="modal-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"  //10.39.149.217
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
        <h3>Edit Slot</h3>

        <input
          className="casino-input"
          value={form.slotName}
          onChange={(e) => setForm({ ...form, slotName: e.target.value })}
        />

        <input
          className="casino-input"
          type="time"
          value={form.startTime?.slice(0,5)}
  onChange={(e) =>
    setForm({
      ...form,
      startTime: e.target.value + ":00"
    })
  }
        />

        <input
          className="casino-input"
          type="time"
         value={form.endTime?.slice(0,5)}
  onChange={(e) =>
    setForm({
      ...form,
      endTime: e.target.value + ":00"
    })
  }
        />

        {/* <div className="casino-checkbox-row">
          <label className="casino-checkbox">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <span>Active</span>
          </label>
        </div> */}

        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Save</button>
          <button className="casino-btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditSlotModal;
