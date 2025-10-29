import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          maxWidth: "500px",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
        }}
      >
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="fw-semibold">Oops! Page Not Found 😢</h2>
        <p className="text-muted mt-2">
          The page you’re looking for might have been moved, deleted, or never existed.
        </p>

        <Link
          to="/"
          className="btn btn-primary mt-3 px-4 py-2"
          style={{ transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          ⬅️ Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
