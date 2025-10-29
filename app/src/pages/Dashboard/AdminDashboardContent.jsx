import React, { useEffect, useState } from "react";
import { FaUsers, FaCalendarAlt, FaTicketAlt, FaRupeeSign } from "react-icons/fa";
import { Card, Row, Col } from "react-bootstrap";
import API from "../../api/api"; // ✅ your axios instance

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalTickets: 0,
    totalRevenue: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStatsAndActivities = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/activities"),
        ]);

        setStats({
          totalUsers: statsRes.data.totalUsers,
          totalEvents: statsRes.data.totalEvents,
          totalTickets: statsRes.data.totalTickets,
          totalRevenue: statsRes.data.totalRevenue,
        });

        setActivities(activityRes.data.activities || []);
      } catch (err) {
        console.error("Error loading admin dashboard:", err.response?.data || err.message);
      }
    };

    fetchStatsAndActivities();
  }, []);

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4 text-primary">Admin Dashboard</h2>

      <Row xs={1} sm={2} lg={4} className="g-4">
        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaUsers size={32} className="text-primary mb-2" />
              <h5 className="fw-bold">{stats.totalUsers}</h5>
              <p className="text-muted mb-0">Total Users</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaCalendarAlt size={32} className="text-success mb-2" />
              <h5 className="fw-bold">{stats.totalEvents}</h5>
              <p className="text-muted mb-0">Total Events</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaTicketAlt size={32} className="text-warning mb-2" />
              <h5 className="fw-bold">{stats.totalTickets}</h5>
              <p className="text-muted mb-0">Tickets Sold</p>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm stat-card">
            <Card.Body>
              <FaRupeeSign size={32} className="text-danger mb-2" />
              <h5 className="fw-bold">₹{stats.totalRevenue.toLocaleString()}</h5>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-5">
        <h4 className="fw-semibold text-dark mb-3">Recent Activities</h4>
        {activities.length > 0 ? (
          <ul className="list-group shadow-sm">
  {activities.map((a, i) => (
    <li key={i} className="list-group-item">
      <strong>{a.type}</strong>: {a.message} <em className="text-muted">({a.time})</em>
    </li>
  ))}
</ul>
        ) : (
          <p className="text-muted">No recent activities</p>
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

export default AdminDashboardContent;
