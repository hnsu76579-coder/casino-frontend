import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { getAllSlots } from "../api/slotApi";
import { updateNumber, updateSlot } from "../api/adminApi";
import { connectSocket } from "../websocket/socket";

import AdminHeader from "../components/AdminHeader";
import NumberModal from "../components/NumberModal";
import EditSlotModal from "../components/EditSlotModal";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editSlot, setEditSlot] = useState(null);

  // 🔄 Load slots + listen for live updates
  useEffect(() => {
    getAllSlots().then((res) => setSlots(res.data.data));

    connectSocket((updatedSlot) => {
      setSlots((prev) =>
        prev.map((s) =>
          s.id === updatedSlot.id ? updatedSlot : s
        )
      );
    });
  }, []);

  // 🔢 Save slot number
  const saveNumber = async (num) => {
    const res = await updateNumber(selectedSlot.id, num);

    setSlots((prev) =>
      prev.map((s) =>
        s.id === res.data.data.id ? res.data.data : s
      )
    );

    setSelectedSlot(null);
  };

  // ✏️ Save slot details (name, time, active)
  const saveSlot = async (data) => {
    const res = await updateSlot(editSlot.id, data);

    setSlots((prev) =>
      prev.map((s) =>
        s.id === res.data.data.id ? res.data.data : s
      )
    );

    setEditSlot(null);
  };

  return (
    <>
      <AdminHeader />

      {/* 🔢 Change Number Modal */}
      <AnimatePresence>
        {selectedSlot && (
          <NumberModal
            key="number-modal"
            onClose={() => setSelectedSlot(null)}
            onSave={saveNumber}
          />
        )}
      </AnimatePresence>

      {/* ✏️ Edit Slot Modal */}
      <AnimatePresence>
        {editSlot && (
          <EditSlotModal
            key="edit-slot-modal"
            slot={editSlot}
            onClose={() => setEditSlot(null)}
            onSave={saveSlot}
          />
        )}
      </AnimatePresence>

      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        {/* 🔐 Account Actions */}
        <div className="admin-actions-group">
          <h3>Account</h3>
          <div className="btn-group">
            <button onClick={() => navigate("/admin/change-password")}>
              Change Password
            </button>
            <button onClick={() => navigate("/admin/change-username")}>
              Change Username
            </button>
          </div>
        </div>

        {/* 🎰 Slot List */}
        <div className="admin-slot-list">
          {slots.map((s) => (
            <div key={s.id} className="admin-slot-item">
              <div className="slot-info">
                <strong>{s.slotName}</strong>
                {" "}({s.startTime} - {s.endTime}) →{" "}
                {s.number === -1 ? "No number" : s.number}
              </div>
              <div className="slot-actions">
                <button onClick={() => setSelectedSlot(s)}>
                  Change Number
                </button>
                <button onClick={() => setEditSlot(s)}>Edit Slot</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
