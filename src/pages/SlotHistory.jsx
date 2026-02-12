import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getSlotHistory } from "../api/slotApi";

const SlotHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [page, setPage] = useState(0);

  const {
    data: history = [],
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["slotHistory", id],
    queryFn: () =>
      getSlotHistory(id).then((res) => res.data.data),
    // keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  const grouped = history.reduce((acc, item) => {
    const date = new Date(item.changedAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="slot-history-page">
      <button className="casino-back-btn" onClick={() => navigate(-1)}>
        ← Back to Slot
      </button>

      <h1 className="history-title">Slot History</h1>

      {Object.keys(grouped).map((date) => (
        <div key={date} className="history-date-group">
          {/* <h3 className="history-date">{date}</h3> */}

          {grouped[date].map((h, idx) => (
            <motion.div
              key={idx}
              className="history-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="history-date">{date}</h3>
              <span className="history-number">
                {h.number === -1
                  ? "No number selected"
                  : h.number}
              </span>

              /* {/* ✅ FIXED TIME DISPLAY */}
              <span className="history-time">
                {new Date(h.changedAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span> */
            </motion.div>
          ))}
        </div>
      ))}

      {/* <button
        className="casino-load-btn"
        disabled={isPreviousData || isFetching}
        onClick={() => setPage((p) => p + 1)}
      >
        {isFetching ? "Loading..." : "Load More"}
      </button> */}
    </div>
  );
};

export default SlotHistory;

