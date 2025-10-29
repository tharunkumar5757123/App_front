// src/components/PaymentMethodSelector.jsx
import React from "react";
import { ListGroup } from "react-bootstrap";

const paymentMethods = [
  { id: "gpay", name: "Google Pay", logo: "/gp.jpg" },
  { id: "phonepe", name: "PhonePe", logo: "/pp.jpg" },
  { id: "paytm", name: "Paytm", logo: "/paytm.jpg" },
  { id: "card", name: "Credit / Debit Card", logo: "/card.jpg" },
];

const PaymentMethodSelector = ({ selected, setSelected }) => {
  return (
    <ListGroup variant="flush">
      {paymentMethods.map((method) => (
        <ListGroup.Item
          key={method.id}
          onClick={() => setSelected(method.id)}
          className={`d-flex align-items-center justify-content-between p-3 rounded-4 mb-3 shadow-sm ${
            selected === method.id
              ? "border border-success bg-light"
              : "border border-0"
          }`}
          style={{
            cursor: "pointer",
            backgroundColor: selected === method.id ? "#f9fff9" : "#ffffff",
            transition: "all 0.2s ease",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm me-3"
              style={{ width: "50px", height: "50px", overflow: "hidden" }}
            >
              <img
                src={method.logo}
                alt={method.name}
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                }}
              />
            </div>
            <h6 className="mb-0 fw-semibold">{method.name}</h6>
          </div>

          {selected === method.id && (
            <span className="text-success fw-bold">✔ Selected</span>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PaymentMethodSelector;
