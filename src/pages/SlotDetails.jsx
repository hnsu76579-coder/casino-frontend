import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSlotById } from "../api/slotApi";
import { connectSocket } from "../websocket/socket";
import { to12Hour } from "../utils/time";
import { addSlotListener } from "../websocket/socket";
import { addResetListener } from "../websocket/socket";
const SlotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    getSlotById(id).then((res) => setSlot(res.data.data));

    addSlotListener((updatedSlot) => {
      if (Number(updatedSlot.id) === Number(id)) {
        setSlot((prev) => ({ ...prev, ...updatedSlot }));
      }
    });
    addResetListener(() => {
  getSlotById(id).then((res) => setSlot(res.data.data));
});

  }, [id]);

  if (!slot) return <div>Loading...</div>;

  return (
    <div className="slot-detail-page">
      {/* Back Button */}
      <button className="casino-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Title */}
      <h1 className="slot-title">{slot.slotName}</h1>

      {/* Time */}
      <p className="slot-time">
        {to12Hour(slot.startTime)} – {to12Hour(slot.endTime)}
      </p>
      <button
        className="casino-history-btn"
        onClick={() => navigate(`/slot/${slot.id}/history`)}
      >
        See History
      </button>

      {/* Number Card */}
      <div className="slot-number-card">
        <span className="slot-number-text">
          🎯 Number: {slot.number === -1 ? "No number selected" : slot.number}
        </span>
      </div>
    </div>
  );
};

export default SlotDetail;

