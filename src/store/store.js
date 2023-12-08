import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import cardListReducer from "./slices/cardListSlice";

const store = configureStore({
  reducer: {
    cardList: cardListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;