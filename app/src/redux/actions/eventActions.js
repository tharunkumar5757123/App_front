import API from "../../api/api";

/**
 * 🔹 Fetch All Events (or Events by Host)
 */
export const fetchEvents = (hostId) => async (dispatch) => {
  try {
    dispatch({ type: "EVENTS_REQUEST" });

    const url = hostId ? `/events/host/${hostId}` : "/events";
    const { data } = await API.get(url);

    const events = Array.isArray(data) ? data : data.events;

    // Ensure full URL for event images
    const eventsWithFullImage = events.map((event) => ({
      ...event,
      image: event.image
        ? event.image.startsWith("http")
          ? event.image
          : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${event.image}`
        : null,
    }));

    dispatch({ type: "EVENTS_SUCCESS", payload: eventsWithFullImage });
  } catch (err) {
    dispatch({
      type: "EVENTS_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

/**
 * 🔹 Fetch Single Event Details
 */
export const fetchEventDetails = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: "EVENT_DETAILS_REQUEST" });
    const { data } = await API.get(`/events/${eventId}`);

    const eventWithFullImage = {
      ...data.event,
      image: data.event.image
        ? data.event.image.startsWith("http")
          ? data.event.image
          : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${data.event.image}`
        : null,
    };

    dispatch({ type: "EVENT_DETAILS_SUCCESS", payload: eventWithFullImage });
  } catch (err) {
    dispatch({
      type: "EVENT_DETAILS_FAIL",
      payload: err.response?.data?.message || err.message,
    });
  }
};

/**
 * 🔹 Create Event (Host Only) with Cloudinary Banner
 */
// redux/actions/eventActions.js

export const createEvent = (eventData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_EVENT_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // important for file upload
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post("/events", eventData, config);

    dispatch({ type: "CREATE_EVENT_SUCCESS", payload: data.event });

    // ✅ Immediately add the new event to the global events list in Redux
    dispatch({ type: "EVENTS_SUCCESS_ADD", payload: data.event });

    return data.event;
  } catch (err) {
    dispatch({
      type: "CREATE_EVENT_FAIL",
      payload: err.response?.data?.message || "Server error creating event",
    });
    throw err;
  }
};


/**
 * 🔹 Update Event (supports optional new banner)
 */
export const updateEvent = (eventId, eventData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_EVENT_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // if updating banner
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.put(`/events/${eventId}`, eventData, config);

    // Ensure full URL for the returned event image
    const eventWithFullImage = {
      ...data.event,
      image: data.event.image
        ? data.event.image.startsWith("http")
          ? data.event.image
          : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${data.event.image}`
        : null,
    };

    dispatch({ type: "UPDATE_EVENT_SUCCESS", payload: eventWithFullImage });
    return eventWithFullImage;
  } catch (err) {
    dispatch({
      type: "UPDATE_EVENT_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * 🔹 Delete Event
 */
export const deleteEvent = (eventId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_EVENT_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await API.delete(`/events/${eventId}`, config);

    dispatch({ type: "DELETE_EVENT_SUCCESS", payload: eventId });
    return true;
  } catch (err) {
    dispatch({
      type: "DELETE_EVENT_FAIL",
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};
