import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) return <p className="text-center mt-5">Not logged in.</p>;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary mb-3">👤 My Profile</h2>
      <div className="card shadow-sm p-4 border-0 rounded-4">
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Role:</strong> {userInfo.role}</p>
      </div>
    </div>
  );
};

export default Profile;
