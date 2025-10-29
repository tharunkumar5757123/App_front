import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center loader-container"
      style={{ height: "250px" }}
    >
      <div className="spinner-border text-primary mb-3 loader-spinner" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="text-muted fw-semibold">{message}</p>

      <style>{`
        .loader-container {
          animation: fadeIn 0.6s ease-in-out;
        }

        .loader-spinner {
          width: 3rem;
          height: 3rem;
          animation: pulse 1.2s infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(13, 110, 253, 0.3); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
