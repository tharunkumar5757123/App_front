import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, updateTicket } from "../redux/actions/ticketActions";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    attendeeName: "",
    seatNumber: "",
  });

  // Fetch ticket data
  useEffect(() => {
    if (!tickets || tickets.length === 0) {
      dispatch(fetchTickets());
    } else {
      const ticket = tickets.find((t) => t._id === id);
      if (ticket) {
        setFormData({
          attendeeName: ticket.attendeeName || ticket.user?.username || "",
          seatNumber: ticket.seatNumber || "",
        });
      }
    }
  }, [dispatch, tickets, id]);

  // Restrict unauthorized access
  if (!userInfo) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTicket(id, formData));
      navigate("/my-tickets");
    } catch (err) {
      console.error("Ticket update failed:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;

  return (
    <div className="container mt-5 mb-4">
      <h2 className="fw-bold text-primary text-center mb-4">🎟️ Edit Ticket</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-4 shadow-sm bg-light"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Attendee Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Attendee Name</label>
          <input
            type="text"
            name="attendeeName"
            className="form-control"
            value={formData.attendeeName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Seat Number */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Seat Number</label>
          <input
            type="text"
            name="seatNumber"
            className="form-control"
            value={formData.seatNumber}
            onChange={handleChange}
            placeholder="Example: A12"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success px-4 py-2"
            style={{ transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
