import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ named import for Vite
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/authReducers";
import eventReducer from "./reducers/eventReducers";
import ticketsReducer from "./reducers/ticketReducers";
import paymentReducer from "./reducers/paymentReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  tickets: ticketsReducer,
  payment: paymentReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
