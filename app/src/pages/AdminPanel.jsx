import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Table, Button, Spinner, Form } from "react-bootstrap";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    venue: "",
    ticketLimit: "",
  });
  const navigate = useNavigate();

  // ✅ Fetch events
  const fetchEvents = async () => {
    try {
      const { data } = await API.get("/events");
      console.log("✅ Events response:", data);
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };

  // ✅ Start editing (safe date handling)
  const handleEditClick = (event) => {
    setEditingEvent(event._id);
    setEditForm({
      title: event.title || "",
      // ✅ convert only if date exists and valid
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      venue: event.venue || "",
      ticketLimit: event.ticketLimit || "",
    });
  };

  // ✅ Handle edit form changes
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ✅ Update event
  const handleUpdate = async () => {
    try {
      const { data } = await API.put(`/events/${editingEvent}`, editForm);
      alert("✅ Event updated successfully!");
      fetchEvents();
      setEditingEvent(null);
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ✅ Format date safely
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" onLogout={handleLogout} />
      <div
        className="flex-grow-1 p-4"
        style={{ marginLeft: "250px", background: "#f8f9fa", minHeight: "100vh" }}
      >
        <h2 className="fw-bold mb-4 text-primary">Manage Events</h2>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Tickets</th>
                <th>Host</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.title || "Untitled"}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.venue || "—"}</td>
                  <td>{event.ticketLimit || 0}</td>
                  <td>{event.host?.name || event.hostName || "—"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditClick(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* === Edit Form Section === */}
        {editingEvent && (
          <div className="card p-4 mt-4 shadow-sm">
            <h5 className="fw-bold text-primary mb-3">Edit Event</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  name="venue"
                  value={editForm.venue}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ticket Limit</Form.Label>
                <Form.Control
                  type="number"
                  name="ticketLimit"
                  value={editForm.ticketLimit}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="success" onClick={handleUpdate}>
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
