import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, deleteTicket } from "../../redux/actions/ticketActions";
import TicketCard from "../../components/TicketCard";
import Loader from "../../components/Loader";
import AlertBox from "../../components/AlertBox";
import { useNavigate } from "react-router-dom";

const UserDashboardContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets = [], loading, error } = useSelector((state) => state.tickets);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.role === "user") {
      dispatch(fetchTickets());
    }
  }, [dispatch, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this ticket?")) dispatch(deleteTicket(id));
  };

  const handleEdit = (id) => navigate(`/edit-ticket/${id}`);

  const upcoming = tickets.filter(
    (t) => t.event?.dateTime && new Date(t.event.dateTime) > Date.now()
  );
  const scanned = tickets.filter((t) => t.isScanned);

  return (
    <div>
      <h2 className="fw-bold text-primary mb-4">🎟️ My Tickets</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertBox type="danger" message={error} />
      ) : (
        <>
          <h4 className="fw-semibold mb-3">Upcoming Events</h4>
          {upcoming.length === 0 ? (
            <AlertBox type="info" message="No upcoming events." />
          ) : (
            <div className="row">
              {upcoming.map((ticket) => (
                <div className="col-md-4 mb-4" key={ticket._id}>
                  <TicketCard ticket={ticket} />
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(ticket._id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(ticket._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h4 className="fw-semibold mt-5 mb-3">📋 Scan History</h4>
          {scanned.length === 0 ? (
            <AlertBox type="info" message="No scanned tickets yet." />
          ) : (
            <ul className="list-group shadow-sm rounded-4 border-0">
              {scanned.map((t) => (
                <li
                  key={t._id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded-3 shadow-sm"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div>
                    <strong>{t.event?.title || "Untitled Event"}</strong>
                    <br />
                    <small className="text-muted">
                      Scanned on {new Date(t.createdAt).toLocaleString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboardContent;
