import API from "../../api/api";

/**
 * 🔹 Fetch Tickets
 * - User → /tickets/my-tickets
 * - Admin → /tickets/admin/all
 */
export const fetchTickets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKETS_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const endpoint =
      userInfo.role === "admin"
        ? "/tickets/admin/all"
        : "/tickets/my-tickets";

    const { data } = await API.get(endpoint, config);

    dispatch({
      type: "TICKETS_SUCCESS",
      payload: data.tickets,
    });
  } catch (err) {
    dispatch({
      type: "TICKETS_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

/**
 * 🎟️ Purchase Ticket (User)
 */
export const purchaseTicket = (ticketData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_TICKET_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post("/tickets/purchase", ticketData, config);

    dispatch({
      type: "CREATE_TICKET_SUCCESS",
      payload: data.ticket,
    });

    return data.ticket;
  } catch (err) {
    dispatch({
      type: "CREATE_TICKET_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * ✏️ Update Ticket (User/Admin)
 */
export const updateTicket = (ticketId, updates) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_TICKET_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await API.put(`/tickets/${ticketId}`, updates, config);

    dispatch({
      type: "UPDATE_TICKET_SUCCESS",
      payload: data.ticket,
    });

    return data.ticket;
  } catch (err) {
    dispatch({
      type: "UPDATE_TICKET_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * 🗑️ Delete Ticket
 */
export const deleteTicket = (ticketId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_TICKET_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    await API.delete(`/tickets/${ticketId}`, config);

    dispatch({
      type: "DELETE_TICKET_SUCCESS",
      payload: ticketId,
    });
  } catch (err) {
    dispatch({
      type: "DELETE_TICKET_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

/**
 * 📷 Scan Ticket (Host/Admin)
 */
export const scanTicket = (ticketId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SCAN_TICKET_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    // ✅ Backend returns: { message, ticket }
    const { data } = await API.post("/tickets/scan", { ticketId }, config);

    dispatch({
      type: "SCAN_TICKET_SUCCESS",
      payload: {
        ticketId: data.ticket?._id,
        message: data.message,
        ticket: data.ticket,
      },
    });

    return data;
  } catch (err) {
    dispatch({
      type: "SCAN_TICKET_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * ♻️ Reset Scan Result (optional)
 */
export const resetScanResult = () => (dispatch) => {
  dispatch({ type: "SCAN_TICKET_RESET" });
};
