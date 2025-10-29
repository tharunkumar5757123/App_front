import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-5">
      <h2 className="text-danger fw-bold">❌ Payment Failed!</h2>
      <p>Something went wrong with your payment. Please try again.</p>
      <Button variant="danger" onClick={() => navigate("/payment-options")}>
        Try Again
      </Button>
    </div>
  );
};

export default PaymentFailed;
