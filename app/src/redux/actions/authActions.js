import API from "../../api/api";

// 🔹 LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    const { data } = await API.post("/auth/login", { email, password });

    // Support both { user, token } and { token, role, email, ... }
    const userData = data.user ? { ...data.user, token: data.token } : data;

    dispatch({ type: "AUTH_SUCCESS", payload: userData });
    localStorage.setItem("userInfo", JSON.stringify(userData));
  } catch (err) {
    dispatch({
      type: "AUTH_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};


// 🔹 REGISTER (Signup)
export const register =
  (username, email, password, role, navigate) => async (dispatch) => {
    try {
      dispatch({ type: "AUTH_REQUEST" });
      console.log("Register payload:", { username, email, password, role });

      await API.post("/auth/signup", { username, email, password, role });

      dispatch({ type: "AUTH_SUCCESS", payload: null });
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      dispatch({
        type: "AUTH_FAIL",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

// 🔹 LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "AUTH_LOGOUT" });
};

// 🔹 FETCH USERS (Admin Only)
export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USERS_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await API.get("/admin/users", config);

    dispatch({ type: "USERS_SUCCESS", payload: data.users });
  } catch (err) {
    dispatch({
      type: "USERS_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

// 🔹 UPDATE USER ROLE
export const updateUser = (id, updates) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await API.put(`/admin/users/${id}`, updates, config);

    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data.user });
  } catch (err) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

// 🔹 DELETE USER
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DELETE_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await API.delete(`/admin/users/${id}`, config);

    dispatch({ type: "USER_DELETE_SUCCESS", payload: id });
  } catch (err) {
    dispatch({
      type: "USER_DELETE_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};
