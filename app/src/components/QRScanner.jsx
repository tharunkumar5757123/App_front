import React, { useState } from "react";
import QrScanner from 'react-qr-scanner';
import API from "../api/api";
import { useSelector } from "react-redux";
import AlertBox from "./AlertBox";
import { Card, Spinner } from "react-bootstrap";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [status, setStatus] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // ✅ Restrict access to hosts only
  if (!userInfo || userInfo.role !== "host") {
    return (
      <AlertBox
        type="danger"
        message="Access denied. Only hosts can scan tickets."
      />
    );
  }

  const handleScan = async (data) => {
    if (!data || data === scanResult || isProcessing) return;

    setIsProcessing(true);
    setScanResult(data);
    setStatus("⏳ Verifying ticket...");
    setTicketInfo(null);

    try {
      console.log("🔍 Scanning ticket:", data);

      // 🧩 Extract ticketId from combined QR code (eventId-ticketId-timestamp)
      const parts = data.split("-");
      const ticketId = parts.length >= 2 ? parts[1] : data;

      console.log("🎫 Extracted ticketId:", ticketId);

      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      const res = await API.post("/tickets/scan", { ticketId }, config);

      setStatus("✅ Ticket scanned successfully!");
      setTicketInfo(res.data.ticket);
    } catch (err) {
      console.error("❌ Scan error:", err.response?.data || err.message);
      setStatus(`❌ Scan failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setTimeout(() => {
        setScanResult(null);
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
    setStatus("❌ Camera access error. Please allow permissions or refresh.");
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="fw-bold mb-3 text-primary">🎟️ Ticket Scanner</h2>
      <p className="text-muted">
        Point your camera at a valid QR code to verify tickets instantly.
      </p>

      {/* Toggle Scan Button */}
      <button
        className={`btn ${
          isScanning ? "btn-danger" : "btn-success"
        } mb-4 px-4 py-2 fw-semibold`}
        onClick={() => {
          setIsScanning(!isScanning);
          setStatus("");
          setTicketInfo(null);
        }}
      >
        {isScanning ? "⏹ Stop Scanning" : "▶ Start Scanning"}
      </button>

      {/* Scanner Box */}
      <div
        className="mx-auto mb-4 scanner-box border border-3 border-primary rounded-4 p-2 position-relative bg-dark bg-opacity-10"
        style={{
          width: "100%",
          maxWidth: "420px",
          aspectRatio: "1 / 1",
          overflow: "hidden",
        }}
      >
        {isScanning ? (
          <QrScanner
            onResult={(result, error) => {
              if (result) handleScan(result?.text);
              if (error) handleError(error);
            }}
            constraints={{ facingMode: "environment" }}
            style={{ width: "100%" }}
          />
        ) : (
          <div className="p-5 text-muted">Camera paused</div>
        )}

        {/* Animated scanning line */}
        {isScanning && (
          <div
            className="scan-line position-absolute start-0 w-100"
            style={{
              height: "3px",
              background: "rgba(13,110,253,0.9)",
              animation: "scanMove 2.2s linear infinite",
            }}
          ></div>
        )}
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`alert mt-3 fade show ${
            status.startsWith("✅")
              ? "alert-success"
              : status.startsWith("⏳")
              ? "alert-warning"
              : "alert-danger"
          }`}
          style={{ transition: "opacity 0.5s ease" }}
        >
          {isProcessing && status.startsWith("⏳") && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}
          {status}
        </div>
      )}

      {/* ✅ Ticket Info Card */}
      {ticketInfo && (
        <Card
          className="mt-4 shadow-sm border-0 mx-auto"
          style={{ maxWidth: "420px" }}
        >
          <Card.Body>
            <h5 className="fw-bold text-primary mb-2">
              {ticketInfo.event?.title || "Unnamed Event"}
            </h5>
            <p className="mb-1">
              <strong>Attendee:</strong> {ticketInfo.user?.name}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {ticketInfo.user?.email}
            </p>
            <p className="mb-1">
              <strong>Seat:</strong> {ticketInfo.seatNumber || "General"}
            </p>
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  ticketInfo.status === "Used"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {ticketInfo.status}
              </span>
            </p>
            <p className="text-muted small mt-2 mb-0">
              Scanned at: {new Date().toLocaleString()}
            </p>
          </Card.Body>
        </Card>
      )}

      {/* Inline Styles */}
      <style>{`
        @keyframes scanMove {
          0% { top: 5%; }
          50% { top: 90%; }
          100% { top: 5%; }
        }
        .scanner-box:hover {
          box-shadow: 0 0 25px rgba(13,110,253,0.4);
          transition: box-shadow 0.3s ease;
        }
        .btn:hover {
          transform: scale(1.05);
          transition: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default QRScanner;
