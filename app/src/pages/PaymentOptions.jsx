import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import PaymentMethodSelector from "./PaymentMethodSelector";

const PaymentOptions = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const event =
      location.state?.event || JSON.parse(localStorage.getItem("selectedEvent"));
    if (event) setEventDetails(event);
    else navigate("/");
  }, [location, navigate]);

  const handlePayment = async () => {
    if (!selected) return alert("⚠️ Please select a payment method");
    if (!eventDetails) return alert("❌ Event not found!");

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        alert("⚠️ Please login to continue");
        navigate("/login");
        return;
      }

      // ✅ Save cart in localStorage for success page
      const cart = [
        {
          _id: eventDetails._id,
          name: eventDetails.title,
          price: eventDetails.price || 0,
          quantity: 1,
          date: eventDetails.dateTime,
          venue: eventDetails.venue,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ Redirect ALL payment methods to Stripe
      const { data } = await API.post("/payment/create-checkout-session", {
        cart,
        userId: user._id,
      });

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("❌ Failed to start payment session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!eventDetails) return null;

  return (
    <div
      className="fade-in py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <div className="container">
        <h3 className="text-center fw-bold mb-4 text-dark">
          💳 Choose a Payment Method
        </h3>

        <Card
          className="shadow-lg border-0 rounded-4 p-4 mx-auto"
          style={{ maxWidth: "600px", backgroundColor: "white" }}
        >
          <div className="text-center mb-4">
            <h5 className="fw-bold text-primary">{eventDetails.title}</h5>
            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Date(eventDetails.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              <span className="badge bg-success fs-6">
                ₹{eventDetails.price > 0 ? eventDetails.price : "Free"}
              </span>
            </p>
          </div>

          <PaymentMethodSelector selected={selected} setSelected={setSelected} />
        </Card>

        <div className="text-center mt-5">
          <Button
            variant="success"
            disabled={!selected || loading}
            onClick={handlePayment}
            className="px-5 py-2 fw-bold shadow-sm"
            style={{ borderRadius: "30px", fontSize: "16px" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Processing...
              </>
            ) : (
              `Pay with ${selected ? selected.toUpperCase() : "..."}`
            )}
          </Button>

          <div className="mt-4">
            <Button
              variant="outline-dark"
              onClick={() => navigate(-1)}
              className="fw-bold"
              style={{ borderRadius: "25px" }}
            >
              ← Back to Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
