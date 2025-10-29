import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaCalendarAlt, FaTicketAlt, FaRupeeSign, FaChartLine, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import socket from "../../utils/socket";

const HostDashboardContent = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalTickets: 0,
    totalRevenue: 0,
    avgRevenuePerEvent: 0,
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        const { data } = await API.get("/stats");
        if (data.stats) {
          const totalEvents = data.stats.length;
          const totalTickets = data.stats.reduce((sum, e) => sum + e.totalTickets, 0);
          const totalRevenue = data.stats.reduce((sum, e) => sum + (e.totalTickets * (e.price || 0)), 0);
          const avgRevenuePerEvent = totalEvents > 0 ? totalRevenue / totalEvents : 0;

          setStats({ totalEvents, totalTickets, totalRevenue, avgRevenuePerEvent });
        }

        if (data.upcomingEvents) setUpcomingEvents(data.upcomingEvents);
      } catch (err) {
        console.error("Error fetching host data:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostData();
  }, []);

  // Live updates via socket
  useEffect(() => {
    socket.on("updateStats", (data) => {
      setStats((prev) => ({
        ...prev,
        totalTickets: prev.totalTickets + 1,
        totalRevenue: prev.totalRevenue + (data.amount || 0),
      }));
    });

    return () => {
      socket.off("updateStats");
    };
  }, []);

  const handleCreateEvent = () => navigate("/create-event");

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Host Dashboard</h2>
        <Button variant="warning" className="fw-semibold" onClick={handleCreateEvent}>
          <FaPlusCircle className="me-2" />
          Create New Event
        </Button>
      </div>

      {/* Stats Cards */}
      <Row xs={1} sm={2} lg={4} className="g-4">
        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaCalendarAlt size={32} className="text-primary mb-2" />
              <h5 className="fw-bold">{stats.totalEvents}</h5>
              <p className="text-muted mb-0">My Events</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaTicketAlt size={32} className="text-success mb-2" />
              <h5 className="fw-bold">{stats.totalTickets}</h5>
              <p className="text-muted mb-0">Tickets Sold</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaRupeeSign size={32} className="text-danger mb-2" />
              <h5 className="fw-bold">₹{Number(stats.totalRevenue).toLocaleString()}</h5>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaChartLine size={32} className="text-warning mb-2" />
              <h5 className="fw-bold">₹{Number(stats.avgRevenuePerEvent).toLocaleString()}</h5>
              <p className="text-muted mb-0">Avg / Event</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Events */}
      <div className="mt-5">
        <h4 className="fw-semibold mb-3 text-dark">Upcoming Events</h4>
        {upcomingEvents.length > 0 ? (
          <div className="list-group shadow-sm rounded-3">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                style={{ borderLeft: "4px solid #ffc107", borderRadius: "8px" }}
              >
                <div>
                  <h6 className="fw-bold mb-1">{event.title}</h6>
                  <small className="text-muted">
                    📅 {new Date(event.dateTime).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • 🎟️ {event.ticketsSold || 0} sold • ₹{event.price}
                  </small>
                </div>
                <Button variant="outline-primary" size="sm" onClick={() => navigate(`/events/${event._id}`)}>
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No upcoming events found.</p>
        )}
      </div>

      <style>{`
        .stat-card {
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default HostDashboardContent;
