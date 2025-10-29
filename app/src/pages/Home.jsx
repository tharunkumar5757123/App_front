import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/actions/eventActions";
import { motion } from "framer-motion";
import {
  FaMusic,
  FaTheaterMasks,
  FaFootballBall,
  FaMicrophone,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const categories = [
    { name: "Concerts", icon: <FaMusic />, color: "#007bff" },
    { name: "Theatre", icon: <FaTheaterMasks />, color: "#dc3545" },
    { name: "Sports", icon: <FaFootballBall />, color: "#28a745" },
    { name: "Comedy", icon: <FaMicrophone />, color: "#ffc107" },
  ];

  const cities = [
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1604200214458-0e8d855b8f9a?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1601071345581-e3b3bb05b379?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Chennai",
      image:
        "https://images.unsplash.com/photo-1602310923262-91fe8c5d759d?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1600481176431-4f29e6879b5b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;

  return (
    <div className="home">
      {/* 🌟 HERO SECTION */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center flex-column"
        style={{
          minHeight: "85vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-3 fw-bold"
        >
          Discover & Book Amazing Events 🎟️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="lead mt-3"
          style={{ maxWidth: "650px" }}
        >
          Concerts, Sports, Theatre, Comedy & More — Find your next
          unforgettable experience.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="btn btn-primary mt-4 px-4 py-2 fs-5"
          onClick={() => navigate("/login")}
        >
          Explore Events
        </motion.button>
      </section>

      {/* 🎭 CATEGORIES SECTION */}
      <section className="container text-center my-5">
        <motion.h2
          className="fw-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎭 Explore by Category
        </motion.h2>
        <div className="row justify-content-center g-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="col-6 col-md-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                }}
                className="p-4 rounded-4 bg-white shadow-sm"
                style={{
                  cursor: "pointer",
                  borderTop: `4px solid ${cat.color}`,
                }}
                onClick={() => navigate("/")}
              >
                <div className="fs-1 mb-2" style={{ color: cat.color }}>
                  {cat.icon}
                </div>
                <h5 className="fw-semibold">{cat.name}</h5>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 TRENDING EVENTS */}
      <section className="container mt-5 mb-5">
        <motion.h2
          className="fw-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔥 Trending Events Near You
        </motion.h2>

        <div className="row">
          {events.length === 0 ? (
            <p className="text-center">No events available yet.</p>
          ) : (
            events.slice(0, 6).map((event, index) => (
              <motion.div
                key={event._id}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="position-relative">
                    {/* ✅ Use image from event directly, no fallback prepending */}
                   <img
  src={event.banner || "fallback-image-url"} // fallback just in case
  alt={event.title}
  className="card-img-top"
  style={{
    height: "250px",
    objectFit: "cover",
    display: loadedImages[event._id] ? "block" : "none",
  }}
  onLoad={() =>
    setLoadedImages((prev) => ({
      ...prev,
      [event._id]: true, // mark loaded when image finishes loading
    }))
  }
/>
{(!event.image || !loadedImages[event._id]) && (
  <div
    style={{
      height: "auto",
      backgroundColor: "#f0f0f0",
    }}
  />
)}

                    <span
                      className="badge bg-primary position-absolute"
                      style={{ top: "10px", left: "10px" }}
                    >
                      {event.category || "Event"}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{event.title}</h5>
                    <p className="card-text text-muted mb-1">
                      {new Date(event.dateTime).toLocaleString()}
                    </p>
                    <p className="text-success fw-bold mb-1">
                      {event.price ? `₹${event.price}` : "Free"}
                    </p>
                    <div className="d-flex align-items-center small text-muted">
                      <FaStar className="text-warning me-1" /> 4.9 (120+)
                    </div>
                    <button
                      className="btn btn-outline-primary mt-3 w-100 rounded-pill"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* 🌆 POPULAR CITIES SECTION */}
      <section className="container my-5">
        <motion.h2
          className="fw-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌆 Popular in Your City
        </motion.h2>
        <div className="row g-4">
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              className="col-6 col-md-3"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div
                className="position-relative rounded-4 overflow-hidden shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="img-fluid"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    transition: "0.3s ease",
                  }}
                />
                <div
                  className="position-absolute bottom-0 w-100 text-white text-center py-2"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  }}
                >
                  <FaMapMarkerAlt className="me-2" />
                  {city.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
