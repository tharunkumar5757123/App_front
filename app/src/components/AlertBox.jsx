import React, { useEffect, useState } from "react";

const AlertBox = ({ type = "info", message, autoClose = false, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  if (!visible) return null;

  return (
    <div
      className={`alert alert-${type} mt-3 fade show shadow-sm rounded-3`}
      role="alert"
      style={{
        transition: "all 0.4s ease",
        opacity: visible ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
};

export default AlertBox;
