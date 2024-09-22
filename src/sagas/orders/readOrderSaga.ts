import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import { orderModel } from "../../data/types/type";
import {
  fetchOrderError,
  fetchOrderRequest,
  fetchOrderSuccess,
} from "../../features/ordersList/ordersListSlice";
import { readOrders } from "../../services/orders/readOrders.service";

function* readOrderSaga(PayloadAction: PayloadAction<User>) {
  console.log("Saga - ", PayloadAction.payload);
  try {
    const res: orderModel[] = yield call(readOrders, PayloadAction.payload);
    yield put(fetchOrderSuccess(res));
  } catch (error) {
    console.error("There was an error!", error);
    yield put(fetchOrderError("Eroare"));
  }
}

export function* watchReadOrder() {
  yield takeLatest(fetchOrderRequest.type, readOrderSaga);
}
