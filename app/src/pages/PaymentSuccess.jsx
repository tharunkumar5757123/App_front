import React, { useEffect, useState } from "react";
import { Button, Spinner, Card } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/api";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeTicket = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const sessionId = searchParams.get("session_id"); // stripe session id

        if (!user) {
          console.warn("❌ No user found in localStorage");
          setLoading(false);
          return;
        }

        // First preference: localStorage cart
        if (cart && cart.length > 0) {
          const event = cart[0];
          console.log("🎟️ Confirming ticket for:", event);

          const { data } = await API.post("/payment/confirm-checkout", {
            eventId: event._id || event.id,
            userId: user._id,
            quantity: event.quantity || 1,
          });

          setTicketCreated(true);
          setTicketInfo(data.ticket);
          localStorage.removeItem("cart");
        } else if (sessionId) {
          // Fallback: confirm via Stripe session if cart is missing
          console.log("🔄 Trying to confirm ticket using Stripe session:", sessionId);
          const { data } = await API.get(`/payment/session/${sessionId}`);
          if (data.ticket) {
            setTicketCreated(true);
            setTicketInfo(data.ticket);
          }
        } else {
          console.warn("No user or cart found — skipping confirmation.");
        }
      } catch (err) {
        console.error("❌ Error confirming ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    finalizeTicket();
  }, [searchParams]);

  const handleGoToTickets = () => navigate("/my-tickets");
  const handleGoHome = () => navigate("/");

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
      }}
    >
      <Card
        className="shadow-lg border-0 p-5 text-center"
        style={{ maxWidth: "600px", borderRadius: "20px" }}
      >
        {loading ? (
          <>
            <Spinner animation="border" variant="success" />
            <h5 className="mt-3 text-secondary">Processing your payment...</h5>
          </>
        ) : ticketCreated ? (
          <>
            <h2 className="text-success fw-bold">✅ Payment Successful!</h2>
            <p className="mt-3 fs-5">
              Your payment was processed successfully.
              <br />
              Tickets will appear in your <strong>“My Tickets”</strong> section
              shortly.
            </p>

            {ticketInfo && (
              <div className="mt-4">
                <h5 className="fw-bold text-primary">
                  {ticketInfo.event?.title}
                </h5>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(ticketInfo.event?.date).toLocaleString()}
                </p>
                <p>
                  <strong>Venue:</strong> {ticketInfo.event?.venue || "TBA"}
                </p>
                {ticketInfo.qrCode && (
                  <img
                    src={ticketInfo.qrCode}
                    alt="QR Code"
                    style={{
                      width: "150px",
                      marginTop: "15px",
                      border: "2px solid #ddd",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            )}

            <div className="mt-5">
              <Button
                variant="success"
                className="px-4 py-2 fw-bold"
                style={{ borderRadius: "25px" }}
                onClick={handleGoToTickets}
              >
                🎟️ View My Tickets
              </Button>
              <Button
                variant="outline-dark"
                className="ms-3 px-4 py-2 fw-bold"
                style={{ borderRadius: "25px" }}
                onClick={handleGoHome}
              >
                🏠 Back to Home
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-danger fw-bold">
              ⚠️ Payment Completed, but Ticket Not Found
            </h2>
            <p className="mt-3 fs-6">
              Something went wrong generating your ticket. Don’t worry — if
              payment succeeded, your ticket will appear in
              <strong> “My Tickets”</strong> soon.
            </p>
            <Button
              variant="outline-dark"
              className="mt-4 fw-bold"
              style={{ borderRadius: "25px" }}
              onClick={handleGoToTickets}
            >
              Go to My Tickets
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;
