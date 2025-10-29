import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api"; // ✅ use centralized axios instance
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const TicketSuccess = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await API.get(`/tickets/${ticketId}`); // ✅ using API
        setTicket(data.ticket);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;

  const totalPrice = ticket?.price
    ? `₹${ticket.price.toLocaleString()}`
    : "N/A";

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg border-0 p-4">
        <h3 className="text-success fw-bold mb-3">🎉 Payment Successful!</h3>
        <p className="text-muted">
          Your ticket is confirmed and has been emailed to you.
        </p>

        {/* QR Code */}
        <div className="d-flex justify-content-center mt-4">
          <img
            src={ticket?.qrCodeData}
            alt="Ticket QR Code"
            className="img-fluid"
            style={{
              maxWidth: "220px",
              borderRadius: "10px",
              border: "2px solid #198754",
              padding: "10px",
              backgroundColor: "#f8f9fa",
            }}
          />
        </div>

        {/* Ticket Info */}
        <div className="mt-4 text-start mx-auto" style={{ maxWidth: "400px" }}>
          <h5 className="text-center mb-3">{ticket?.event?.title}</h5>
          <p>
            <strong>👤 Attendee:</strong> {ticket?.user?.username || "You"}
          </p>
          <p>
            <strong>🎟️ Seat:</strong> {ticket?.seatNumber || "Auto-assigned"}
          </p>
          <p>
            <strong>📅 Date:</strong>{" "}
            {ticket?.event?.dateTime
              ? new Date(ticket.event.dateTime).toLocaleString()
              : "TBA"}
          </p>
          <p>
            <strong>💰 Total Paid:</strong> {totalPrice}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4">
          <Link to="/my-tickets" className="btn btn-outline-success me-2">
            🎟️ View My Tickets
          </Link>
          <Link to="/" className="btn btn-success">
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketSuccess;
