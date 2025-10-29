// ✅ Load user info from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userFromStorage,
  error: null,
  users: [], // Admin view: all users
  usersLoading: false,
  usersError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔹 LOGIN / REGISTER
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null };

    case "AUTH_SUCCESS":
      return { ...state, loading: false, userInfo: action.payload, error: null };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "AUTH_LOGOUT":
      return { ...state, userInfo: null, error: null };

    // 🔹 ADMIN — Manage Users
    case "USERS_REQUEST":
      return { ...state, usersLoading: true, usersError: null };

    case "USERS_SUCCESS":
      return { ...state, usersLoading: false, users: action.payload };

    case "USERS_FAIL":
      return { ...state, usersLoading: false, usersError: action.payload };

    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case "USER_DELETE_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
};

export default authReducer;
