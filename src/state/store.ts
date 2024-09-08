import { configureStore } from "@reduxjs/toolkit";
import ordersListReducer from "../features/ordersList/OrdersListSlice";
import shoppingCartReducer from "../features/shoppingCart/ShoppingCartSlice";
import userAccountReducer from "../features/userAccount/userAccountSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    userAccount: userAccountReducer,
    ordersList: ordersListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
