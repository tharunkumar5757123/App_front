const initialState = {
  tickets: [],
  loading: false,
  error: null,

  // Separate states for each operation
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  scanLoading: false,
  scanError: null,
  scanResult: null,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    /** 🔹 FETCH ALL TICKETS */
    case "TICKETS_REQUEST":
      return { ...state, loading: true, error: null };
    case "TICKETS_SUCCESS":
      return { ...state, loading: false, tickets: action.payload };
    case "TICKETS_FAIL":
      return { ...state, loading: false, error: action.payload };

    /** 🔹 CREATE TICKET */
    case "CREATE_TICKET_REQUEST":
      return { ...state, createLoading: true, createError: null };
    case "CREATE_TICKET_SUCCESS":
      return {
        ...state,
        createLoading: false,
        tickets: [...state.tickets, action.payload],
      };
    case "CREATE_TICKET_FAIL":
      return { ...state, createLoading: false, createError: action.payload };

    /** 🔹 UPDATE TICKET */
    case "UPDATE_TICKET_REQUEST":
      return { ...state, updateLoading: true, updateError: null };
    case "UPDATE_TICKET_SUCCESS":
      return {
        ...state,
        updateLoading: false,
        tickets: state.tickets.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };
    case "UPDATE_TICKET_FAIL":
      return { ...state, updateLoading: false, updateError: action.payload };

    /** 🔹 DELETE TICKET */
    case "DELETE_TICKET_REQUEST":
      return { ...state, deleteLoading: true, deleteError: null };
    case "DELETE_TICKET_SUCCESS":
      return {
        ...state,
        deleteLoading: false,
        tickets: state.tickets.filter((t) => t._id !== action.payload),
      };
    case "DELETE_TICKET_FAIL":
      return { ...state, deleteLoading: false, deleteError: action.payload };

    /** 🔹 SCAN TICKET */
    case "SCAN_TICKET_REQUEST":
      return { ...state, scanLoading: true, scanError: null, scanResult: null };
    case "SCAN_TICKET_SUCCESS":
      return { ...state, scanLoading: false, scanResult: action.payload };
    case "SCAN_TICKET_FAIL":
      return { ...state, scanLoading: false, scanError: action.payload };

    default:
      return state;
  }
};

export default ticketsReducer;




// ✅ Reducer Logic

// Properly maps all *_REQUEST, *_SUCCESS, and *_FAIL

// Immutably updates, deletes, and adds tickets

// Stores scan results cleanly

// Example:

// case "UPDATE_TICKET_SUCCESS":
//   return {
//     ...state,
//     updateLoading: false,
//     tickets: state.tickets.map((t) =>
//       t._id === action.payload._id ? action.payload : t
//     ),
//   };


// ✅ Best practice: immutable state updates
// ✅ Matches Redux Toolkit-style clarity

// ⚙️ Bonus Enhancement (Optional)

// You can reset scan results when closing modal:

// case "SCAN_TICKET_RESET":
//   return { ...state, scanResult: null, scanError: null };


// and use it like:

// dispatch({ type: "SCAN_TICKET_RESET" });


// after the user closes the QR modal or alert.