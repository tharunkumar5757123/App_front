const initialState = {
  loading: false,
  clientSecret: null, // Stripe client secret or simulated key
  ticket: null,       // Ticket confirmation after successful purchase
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔹 Start of a request
    case "PAYMENT_INTENT_REQUEST":
    case "TICKET_PURCHASE_REQUEST":
      return { ...state, loading: true, error: null };

    // 🔹 Payment intent created
    case "PAYMENT_INTENT_SUCCESS":
      return { ...state, loading: false, clientSecret: action.payload };

    // 🔹 Ticket purchase confirmed
    case "TICKET_PURCHASE_SUCCESS":
      return { ...state, loading: false, ticket: action.payload };

    // 🔹 Failure cases
    case "PAYMENT_INTENT_FAIL":
    case "TICKET_PURCHASE_FAIL":
      return { ...state, loading: false, error: action.payload };

    // 🔹 Reset after success or logout
    case "PAYMENT_RESET":
      return initialState;

    default:
      return state;
  }
};

export default paymentReducer;
