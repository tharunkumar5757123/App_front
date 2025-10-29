import React from "react";
import Sidebar from "../../components/Sidebar";
import UserDashboardContent from "./UserDashboardContent";

const UserDashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex">
      <Sidebar role="user" onLogout={handleLogout} />
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: "250px",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <UserDashboardContent />
      </div>
    </div>
  );
};

export default UserDashboard;
