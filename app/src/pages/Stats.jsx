import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/actions/authActions";
import { fetchEvents } from "../redux/actions/eventActions";
import { fetchAllTickets } from "../redux/actions/ticketActions";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";

const Stats = () => {
  const dispatch = useDispatch();

  const { users, usersLoading, usersError } = useSelector((state) => state.auth);
  const { events, loading: eventsLoading, error: eventsError } = useSelector(
    (state) => state.events
  );
  const { tickets, loading: ticketsLoading, error: ticketsError } = useSelector(
    (state) => state.tickets
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEvents());
    dispatch(fetchAllTickets());
  }, [dispatch]);

  // Access control
  if (!userInfo || (userInfo.role !== "admin" && userInfo.role !== "host")) {
    return <AlertBox type="danger" message="Access denied." />;
  }

  // Loading & Error Handling
  if (usersLoading || eventsLoading || ticketsLoading) return <Loader />;
  if (usersError || eventsError || ticketsError) {
    return (
      <AlertBox
        type="danger"
        message={usersError || eventsError || ticketsError}
      />
    );
  }

  // Calculate stats
  const totalScannedTickets = tickets.filter((t) => t.isScanned).length;

  const stats = [
    { title: "Users", value: users.length, color: "primary", icon: "👤" },
    { title: "Events", value: events.length, color: "success", icon: "📅" },
    {
      title: "Tickets Sold",
      value: tickets.length,
      color: "warning",
      text: "dark",
      icon: "🎟️",
    },
    {
      title: "Tickets Scanned",
      value: totalScannedTickets,
      color: "danger",
      icon: "✅",
    },
  ];

  return (
    <div className="container mt-5 mb-5 text-center">
      <h2 className="fw-bold mb-4 text-primary">📊 Dashboard Statistics</h2>
      <p className="text-muted mb-5">
        Real-time overview of platform users, events, and ticket activity.
      </p>

      <div className="row g-4 justify-content-center">
        {stats.map((item, index) => (
          <div key={index} className="col-10 col-sm-6 col-md-4 col-lg-3">
            <div
              className={`card border-0 shadow-sm text-center bg-${item.color} ${
                item.text ? `text-${item.text}` : "text-white"
              } h-100 rounded-4 stat-card`}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="stat-icon mb-2">{item.icon}</div>
                <h5 className="fw-semibold mb-1">{item.title}</h5>
                <h2 className="fw-bold">{item.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline styles for smooth effects */}
      <style>{`
        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
        }
        .stat-icon {
          font-size: 2rem;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Stats;
