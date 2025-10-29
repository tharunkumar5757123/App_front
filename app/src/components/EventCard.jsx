import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((e) => e._id === event._id));
  }, [event._id]);

  const handleViewDetails = () => navigate(`/events/${event._id}`);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter((e) => e._id !== event._id)
      : [...favorites, event];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const renderLocation = () => {
    if (!event.location) return "TBA";
    if (typeof event.location === "string") return event.location;
    return event.location.address
      ? event.location.address
      : "Location not available";
  };

  return (
    <div
      className="event-card card border-0 rounded-4 overflow-hidden shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="position-relative">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          }
          alt={event.title || "Event"}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Overlay Elements */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          }}
        ></div>

        {/* Date Badge */}
        <div
          className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 fw-bold rounded-bottom-start"
          style={{
            fontSize: "0.85rem",
          }}
        >
          {event.dateTime
            ? new Date(event.dateTime).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : "TBA"}
        </div>

        {/* Favorite Button */}
        <button
          className="favorite-btn position-absolute top-0 start-0 m-2 btn btn-light btn-sm rounded-circle"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
        >
          {isFavorite ? (
            <FaHeart color="red" size={18} />
          ) : (
            <FaRegHeart size={18} />
          )}
        </button>

        {/* Price Tag */}
        <div
          className="position-absolute bottom-0 end-0 bg-dark text-light px-3 py-1 fw-semibold rounded-top-start"
          style={{ fontSize: "0.9rem" }}
        >
          {event.price > 0 ? `₹${event.price}` : "Free"}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body text-dark">
        <h5 className="card-title fw-bold mb-2 text-truncate">
          {event.title || "Untitled Event"}
        </h5>

        <p className="text-muted mb-2 d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
          <FaCalendarAlt className="me-2 text-warning" />
          {event.dateTime
            ? new Date(event.dateTime).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "TBA"}
        </p>

        <p className="text-muted d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
          <FaMapMarkerAlt className="me-2 text-danger" />
          {renderLocation()}
        </p>
      </div>

      <style>{`
        .event-card {
          transition: all 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .event-card:hover img {
          transform: scale(1.05);
        }

        .favorite-btn {
          transition: transform 0.2s ease;
        }

        .favorite-btn:hover {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
};

export default EventCard;
