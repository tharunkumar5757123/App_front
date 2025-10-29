import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section d-flex align-items-center text-center text-white">
      <div className="container">
        <motion.h1
          className="display-4 fw-bold mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Experience Events Like Never Before 🎟️
        </motion.h1>

        <motion.p
          className="lead mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Book concerts, festivals, and shows — all in one place.
        </motion.p>

        <motion.button
          className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
          onClick={() => navigate("/events")}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaTicketAlt /> Book Tickets Now
        </motion.button>
      </div>

      {/* Inline CSS */}
      <style>{`
        .hero-section {
          min-height: 85vh;
          background: linear-gradient(
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.8)
            ),
            url("https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1500&q=80");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .btn-primary {
          background: linear-gradient(90deg, #007bff, #00c3ff);
          border: none;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #00c3ff, #007bff);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
