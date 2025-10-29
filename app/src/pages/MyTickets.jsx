import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, deleteTicket } from "../redux/actions/ticketActions";
import { useNavigate, Navigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import TicketCard from "../components/TicketCard";

const MyTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) dispatch(fetchTickets());
    window.scrollTo(0, 0);
  }, [dispatch, userInfo]);

  if (!userInfo) return <Navigate to="/login" />;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(id));
    }
  };

  const handleView = (eventId) => {
    if (eventId) navigate(`/events/${eventId}`);
  };

  if (loading) return <Loader />;
  if (error) return <AlertBox type="danger" message={error} />;

  const userTickets = tickets.filter(
    (t) => (t.user?._id || t.user) === userInfo._id
  );

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-primary mb-4 text-center">
        🎟️ My Tickets
      </h2>

      {userTickets.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-5 text-muted mb-3">
            You haven’t purchased any tickets yet.
          </p>
          <button
            className="btn btn-success explore-btn px-4 py-2"
            onClick={() => navigate("/events")}
          >
            🎫 Explore Events
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {userTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            >
              <div className="ticket-wrapper position-relative w-100 h-100">
                <TicketCard ticket={ticket} />

                {/* QR + Actions */}
                <div
                  className="qr-footer text-center bg-light p-3"
                  style={{
                    borderTop: "1px dashed rgba(0,0,0,0.2)",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                  }}
                >
                  <div className="d-flex flex-column align-items-center gap-3">
                    <QRCode
                      value={`${ticket._id}-${ticket.event?._id || ""}`}
                      size={80}
                      className="shadow-sm"
                    />
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() =>
                          ticket.event?._id && handleView(ticket.event._id)
                        }
                      >
                        👀 View Event
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(ticket._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styles */}
      <style>{`
        .ticket-wrapper {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ticket-wrapper:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .explore-btn {
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .explore-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(25, 135, 84, 0.3);
        }
        .qr-footer:hover {
          background: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default MyTickets;
