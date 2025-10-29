import API from "../../api/api";

/**
 * 🔹 Create a Stripe Payment Intent
 */
export const createPaymentIntentAction = (amount, eventId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PAYMENT_INTENT_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post(
      "/payments/create-intent",
      { amount, eventId },
      config
    );

    dispatch({
      type: "PAYMENT_INTENT_SUCCESS",
      payload: data.clientSecret,
    });

    return data.clientSecret;
  } catch (err) {
    dispatch({
      type: "PAYMENT_INTENT_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * 🔹 Confirm Ticket Purchase (after successful payment)
 */
export const confirmTicketPurchaseAction = (eventId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_PURCHASE_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post("/tickets", { eventId }, config);

    dispatch({
      type: "TICKET_PURCHASE_SUCCESS",
      payload: data.ticket,
    });

    return data.ticket;
  } catch (err) {
    dispatch({
      type: "TICKET_PURCHASE_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};
