import { motion } from "framer-motion";

export default function MaintenancePage() {
  return (
    <div className="maintenance-container">
      <motion.div
        className="maintenance-card"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="icon"
        >
          🛠️
        </motion.div>

        <h1>We’ll Be Back Soon</h1>
        <p>
          We’re improving things for you ✨ <br />
          Thanks for your patience and support ❤️
        </p>

        <motion.div
          className="pulse"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      </motion.div>
    </div>
  );
}
