import React from "react";
import { motion } from "framer-motion";
import {
  FaMusic,
  FaTheaterMasks,
  FaFootballBall,
  FaLaugh,
  FaGlassCheers,
} from "react-icons/fa";

const categories = [
  { name: "Concerts", icon: <FaMusic />, color: "#007bff" },
  { name: "Sports", icon: <FaFootballBall />, color: "#28a745" },
  { name: "Theatre", icon: <FaTheaterMasks />, color: "#6f42c1" },
  { name: "Comedy", icon: <FaLaugh />, color: "#fd7e14" },
  { name: "Festivals", icon: <FaGlassCheers />, color: "#dc3545" },
];

const EventCategories = () => {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <motion.h2
          className="fw-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎭 Explore Event Categories
        </motion.h2>

        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="col-6 col-md-4 col-lg-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="category-card p-4 rounded-4 shadow-sm"
                whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  className="icon mb-3"
                  style={{ fontSize: "2.5rem", color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h5 className="fw-semibold">{cat.name}</h5>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
