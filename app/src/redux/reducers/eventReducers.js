const initialState = {
  events: [],          // All events
  eventDetails: null,  // Single event details
  stats: null,         // Event or host analytics
  loading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔹 Generic loading
    case "EVENTS_REQUEST":
    case "CREATE_EVENT_REQUEST":
    case "UPDATE_EVENT_REQUEST":
    case "DELETE_EVENT_REQUEST":
    case "EVENT_DETAILS_REQUEST":
      return { ...state, loading: true, error: null };

    // 🔹 Success handlers
    case "EVENTS_SUCCESS":
      return { ...state, loading: false, events: action.payload };

    case "CREATE_EVENT_SUCCESS":
      return {
        ...state,
        loading: false,
         events: [action.payload, ...state.events],
      };

    case "UPDATE_EVENT_SUCCESS":
      return {
        ...state,
        loading: false,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };

    case "DELETE_EVENT_SUCCESS":
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event._id !== action.payload),
      };

    case "EVENT_DETAILS_SUCCESS":
      return { ...state, loading: false, eventDetails: action.payload };

    case "EVENT_STATS_SUCCESS":
      return { ...state, loading: false, stats: action.payload };

    // 🔹 Failure handlers
    case "EVENTS_FAIL":
    case "CREATE_EVENT_FAIL":
    case "UPDATE_EVENT_FAIL":
    case "DELETE_EVENT_FAIL":
    case "EVENT_DETAILS_FAIL":
    case "EVENT_STATS_FAIL":
      return { ...state, loading: false, error: action.payload };

    // 🔹 Cleanup actions
    case "CLEAR_EVENT_DETAILS":
      return { ...state, eventDetails: null };

    case "CLEAR_EVENT_STATS":
      return { ...state, stats: null };

    default:
      return state;
  }
};

export default eventReducer;
