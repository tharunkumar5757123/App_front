import React from "react";
import Sidebar from "../../components/Sidebar";
import HostDashboardContent from "./HostDashboardContent";

const HostDashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex">
      <Sidebar role="host" onLogout={handleLogout} />
      <div
        className="flex-grow-1 p-4"
        style={{ marginLeft: "250px", background: "#f8f9fa", minHeight: "100vh" }}
      >
        <HostDashboardContent />
      </div>
    </div>
  );
};

export default HostDashboard;
