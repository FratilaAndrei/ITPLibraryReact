import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "../features/shoppingCart/ShoppingCartSlice";
import userAccountReducer from "../features/userAccount/userAccountSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    userAccount: userAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
