import React from "react";
import Sidebar from "../../components/Sidebar";
import AdminDashboardContent from "./AdminDashboardContent"; // contains your existing admin logic

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" onLogout={handleLogout} />
      <div
        className="flex-grow-1 p-4"
        style={{ marginLeft: "250px", background: "#f8f9fa", minHeight: "100vh" }}
      >
        <AdminDashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
