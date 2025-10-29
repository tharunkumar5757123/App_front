import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const EventDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!eventDetails);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventDetails) {
      // Fetch event from backend if not passed via state
      const fetchEvent = async () => {
        setLoading(true);
        try {
          const { data } = await API.get(`/events/${id}`);
          setEventDetails(data.event);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch event");
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, eventDetails]);

  const handleBookTicket = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo || userInfo.role !== "user") {
    navigate("/login");
    return;
  }

  const ticketsAvailable = (eventDetails.ticketLimit ?? 0) - (eventDetails.ticketCount ?? 0);
  if (ticketsAvailable <= 0 && eventDetails.ticketLimit > 0) {
    alert("❌ Sorry! Tickets are sold out.");
    return;
  }

  // ✅ Save event info temporarily in localStorage for payment flow
  localStorage.setItem("selectedEvent", JSON.stringify(eventDetails));

  // ✅ Redirect user to Payment Options page
  navigate("/payment-options");
};

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;
  if (!eventDetails) return <p>Event not found.</p>;

  const ticketsAvailable = (eventDetails.ticketLimit ?? 0) - (eventDetails.ticketCount ?? 0);
  const mapLocation = eventDetails.location;

  return (
    <div className="container mt-4 mb-5">
      {/* HEADER BANNER */}
      <div
        className="event-banner text-white text-center p-5 mb-4"
        style={{
          background: "linear-gradient(90deg, #007bff 0%, #6610f2 100%)",
          borderRadius: "16px",
        }}
      >
        {eventDetails.banner && (
          <img
            src={eventDetails.banner}
            alt="Event Banner"
            className="img-fluid rounded-3 mb-3"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <h1 className="fw-bold mb-2">{eventDetails.title || "Untitled Event"}</h1>
        <p className="lead mb-0">Hosted by {eventDetails.host?.username || "Unknown"}</p>
      </div>

      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold text-primary mb-3">📅 Event Details</h4>
            <p className="mb-2">
              <strong>Date & Time:</strong>{" "}
              {eventDetails.dateTime
                ? new Date(eventDetails.dateTime).toLocaleString()
                : "To be announced"}
            </p>
            <p className="mb-2">
              <strong>📍 Location:</strong> {mapLocation || "To be announced"}{" "}
              {mapLocation && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-success"
                >
                  (View on Google Maps)
                </a>
              )}
            </p>

            {mapLocation && (
              <iframe
                title="event-map"
                width="100%"
                height="350"
                style={{ borderRadius: "12px", marginTop: "8px", border: "1px solid #ccc" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`}
              ></iframe>
            )}

            <p className="mt-4">
              <strong>Description:</strong> {eventDetails.description || "No description available."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: "100px", borderRadius: "16px" }}>
            <h5 className="fw-bold text-primary mb-3">🎫 Ticket Info</h5>
            <p className="fs-5 mb-2">
              <strong>Price:</strong>{" "}
              <span className="badge bg-success fs-6">
                {eventDetails.price && eventDetails.price > 0 ? `₹${eventDetails.price}` : "Free"}
              </span>
            </p>
            <p>
              <strong>Tickets Sold:</strong> {eventDetails.ticketCount ?? 0} / {eventDetails.ticketLimit ?? "Unlimited"}
            </p>
            <button
              className="btn btn-success w-100 mt-3 py-2"
              onClick={handleBookTicket}
              disabled={ticketsAvailable <= 0 && eventDetails.ticketLimit > 0}
            >
              {ticketsAvailable <= 0 && eventDetails.ticketLimit > 0 ? "❌ Sold Out" : "💳 Pay & Book Ticket"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
