import React from "react";

const TicketCard = ({ ticket }) => {
  if (!ticket) return null;

  const { event, seatNumber, attendeeName, createdAt, isScanned, qrCodeData } = ticket;

  return (
    <div
      className="ticket-card card shadow-lg border-0 w-100 position-relative"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        borderLeft: `6px solid ${isScanned ? "#198754" : "#6c757d"}`,
      }}
    >
      {/* Header */}
      <div
        className="card-header text-center text-white fw-bold py-3"
        style={{
          background: isScanned
            ? "linear-gradient(90deg, #198754, #20c997)"
            : "linear-gradient(90deg, #6c757d, #adb5bd)",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        🎟️ {event?.title || "Untitled Event"}
      </div>

      {/* Body */}
      <div className="card-body p-4">
        <p className="mb-2">
          <strong>Seat:</strong>{" "}
          {seatNumber ? seatNumber : <em>Auto-assigned</em>}
        </p>
        <p className="mb-2">
          <strong>Attendee:</strong>{" "}
          {attendeeName || ticket.user?.username || "Guest"}
        </p>
        <p className="mb-2">
          <strong>Date:</strong>{" "}
          {event?.dateTime
            ? new Date(event.dateTime).toLocaleString()
            : "TBA"}
        </p>
        <p className="mb-2">
          <strong>Venue:</strong> {event?.venue || "Not specified"}
        </p>

        {/* Status + Issue Date */}
        <div className="d-flex justify-content-between align-items-center mt-2 gap-3">
          <span
            className={`badge px-3 py-2 ${
              isScanned ? "bg-success" : "bg-secondary"
            }`}
            style={{ fontSize: "0.9rem" }}
          >
            {isScanned ? "✅ Scanned" : "⌛ Pending"}
          </span>
          <small className="text-muted">
            Issued on {new Date(createdAt).toLocaleDateString()}
          </small>
        </div>

        {/* QR Code */}
        {qrCodeData && (
          <div className="text-center mt-4">
            <img
              src={qrCodeData}
              alt="QR Code"
              className="rounded shadow-sm"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Download Button */}
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => window.print()}
          >
            Download Ticket
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="ticket-divider"></div>

      {/* Footer */}
      <div className="card-footer text-center bg-light text-muted small py-2">
        <em>{event?.location || "Location TBA"}</em>
      </div>

      {/* Styles */}
      <style>{`
        .ticket-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .ticket-divider {
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            transparent 0,
            transparent 8px,
            rgba(0, 0, 0, 0.15) 8px,
            rgba(0, 0, 0, 0.15) 16px
          );
          margin: 0 15px;
        }

        .ticket-card:hover::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.1), transparent);
          pointer-events: none;
          animation: shine 1.5s linear infinite;
        }

        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        @media (max-width: 576px) {
          .ticket-card {
            width: 100% !important;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketCard;
