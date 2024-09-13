import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { orderModel } from "../../data/types/type";
import { placeOrder } from "../../features/ordersList/ordersListSlice";
import { createOrder } from "../../services/createOrder.service";

function* createOrderSaga(action: PayloadAction<orderModel>) {
  try {
    const response: orderModel = yield call(createOrder, action.payload);
    console.log(response);
  } catch (error) {
    console.error("There was an error!", error);
  }
}

export function* watchOrders() {
  yield takeLatest(placeOrder.type, createOrderSaga);
}
