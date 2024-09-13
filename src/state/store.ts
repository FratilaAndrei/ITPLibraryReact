import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import booksReducer from "../features/books/booksSlice";
import ordersListReducer from "../features/ordersList/ordersListSlice";
import shoppingCartReducer from "../features/shoppingCart/ShoppingCartSlice";
import userAccountReducer from "../features/userAccount/userAccountSlice";
import { watchFetchBooks } from "../sagas/booksSaga";
import { watchOrders } from "../sagas/orders/createOrderSaga";
import { watchReadOrder } from "../sagas/orders/readOrderSaga";
import { watchFetchUsers } from "../sagas/usersSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer,
    userAccount: userAccountReducer,
    ordersList: ordersListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchBooks);
sagaMiddleware.run(watchFetchUsers);
sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchReadOrder);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
