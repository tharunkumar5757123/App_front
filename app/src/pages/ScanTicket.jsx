import React from "react";
import QRScanner from "../components/QRScanner";

const ScanTicket = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">📷 Scan Tickets</h2>
        <p className="text-muted">
          Point your camera at attendees’ QR codes to instantly validate their tickets.
        </p>
        <hr className="w-25 mx-auto text-primary opacity-50" />
      </div>

      {/* QR Scanner Component */}
      <QRScanner />
    </div>
  );
};

export default ScanTicket;
