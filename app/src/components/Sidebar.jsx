import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaTicketAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
  FaBars,
  FaTimes,
  FaQrcode,
} from "react-icons/fa";

const Sidebar = ({ role = "user", onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Common links
  let links = [];

  if (role === "user") {
    links = [
      { to: "/dashboard/user", icon: <FaHome />, label: "Dashboard" },
      { to: "/events", icon: <FaCalendarAlt />, label: "Browse Events" },
      { to: "/my-tickets", icon: <FaTicketAlt />, label: "My Tickets" },
      { to: "/profile", icon: <FaUser />, label: "Profile" },
    ];
  }

  if (role === "host") {
    links = [
      { to: "/events", icon: <FaCalendarAlt />, label: "Browse Events" },
      { to: "/dashboard/host", icon: <FaHome />, label: "My Dashboard" },
      { to: "/create-event", icon: <FaCog />, label: "Create Event" },
      { to:"/host/scan-ticket", icon: <FaQrcode />, label: "Scan Ticket" },
    ];
  }

  if (role === "admin") {
    links = [
      { to: "/dashboard/admin", icon: <FaShieldAlt />, label: "Dashboard" },
      { to: "/admin-panel", icon: <FaCalendarAlt />, label: "Manage Events" },
      { to: "/admin/users", icon: <FaUser />, label: "Manage Users" },
      { to: "/admin/reports", icon: <FaTicketAlt />, label: "Reported Events" },
    ];
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="btn btn-primary d-lg-none position-fixed m-3"
        style={{ zIndex: 1100 }}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar text-white d-flex flex-column p-3 ${
          isOpen ? "open" : "closed"
        }`}
        style={{
          width: isOpen ? "250px" : "0",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          background: "linear-gradient(180deg, #1a1a2e, #16213e)",
          overflowX: "hidden",
          transition: "0.3s ease",
          zIndex: 1000,
        }}
      >
        {isOpen && (
          <>
            <h3 className="text-center mb-4 fw-bold text-warning">
              🎟️ Eventify
            </h3>

            {/* Navigation Links */}
            <nav className="nav flex-column">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center mb-2 ${
                      isActive ? "active-link" : "text-white-50"
                    }`
                  }
                  style={{
                    gap: "12px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    transition: "0.3s",
                  }}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Logout button */}
            <div className="mt-auto pt-4 border-top border-secondary">
              <button
                onClick={onLogout}
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
              >
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </div>
          </>
        )}

        {/* Inline styles */}
        <style>{`
          .nav-link:hover {
            background-color: rgba(255,255,255,0.1);
            transform: translateX(4px);
          }

          .active-link {
            background-color: #ffc107 !important;
            color: #000 !important;
          }

          @media (max-width: 992px) {
            .sidebar {
              height: 100vh;
              position: fixed;
              top: 0;
              left: 0;
            }
            .sidebar.closed {
              width: 0 !important;
              padding: 0 !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Sidebar;
