import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, updateEvent } from "../redux/actions/eventActions";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const UpdateEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, loading, error } = useSelector((state) => state.events);
  const { userInfo } = useSelector((state) => state.auth);

  const [eventData, setEventData] = useState({
    title: "",
    dateTime: "",
    venue: "",
    location: "",
    price: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);

  // ✅ Fetch and prefill event data
  useEffect(() => {
    if (!events || events.length === 0) {
      dispatch(fetchEvents());
    } else {
      const event = events.find((e) => e._id === id);
      if (event) {
        const formattedDateTime = event.dateTime
          ? new Date(event.dateTime).toISOString().slice(0, 16)
          : "";
        setEventData({
          title: event.title || "",
          dateTime: formattedDateTime,
          venue: event.venue || "",
          location: event.location || "",
          price: event.price || 0,
          description: event.description || "",
        });
      }
    }
  }, [dispatch, events, id]);

  // 🚫 Restrict access to hosts only
  if (!userInfo || userInfo.role !== "host") {
    return (
      <AlertBox
        type="danger"
        message="Access denied. Only hosts can update events."
      />
    );
  }

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateEvent(id, { ...eventData, price: Number(eventData.price) })
      );
      setSuccess(true);
      setTimeout(() => navigate("/dashboard/host"), 1500);
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;

  return (
    <div className="container mt-5 mb-5">
      <div
        className="card shadow-lg border-0 p-4 mx-auto bg-light"
        style={{
          maxWidth: "650px",
          borderRadius: "18px",
          transition: "all 0.3s ease",
        }}
      >
        <h2 className="text-center text-primary fw-bold mb-2">
          ✏️ Update Event Details
        </h2>
        <p className="text-muted text-center mb-4">
          Modify your event information below and save your changes.
        </p>

        {success && (
          <AlertBox
            type="success"
            message="✅ Event updated successfully! Redirecting..."
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              className="form-control"
              value={eventData.dateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Venue</label>
            <input
              type="text"
              name="venue"
              className="form-control"
              value={eventData.venue}
              onChange={handleChange}
              placeholder="e.g. Hitex Exhibition Center"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={eventData.location}
              onChange={handleChange}
              placeholder="e.g. Hyderabad, India"
              required
            />
          </div>

          {eventData.location && (
            <div className="mt-3 mb-4 text-center">
              <iframe
                title="event-map"
                width="100%"
                height="250"
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  eventData.location
                )}&output=embed`}
              ></iframe>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Ticket Price ($)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={eventData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your event in detail"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success px-5 py-2 fw-semibold"
              disabled={loading}
              style={{
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
