import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contacts from "./contact";
import auth from "./auth";
import notification from "./notification";

const reducer = combineReducers({
  auth,
  contacts,
  notification,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
