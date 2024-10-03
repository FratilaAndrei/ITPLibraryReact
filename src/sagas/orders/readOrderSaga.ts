import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { orderModel } from "../../data/types/type";
import {
  fetchOrderError,
  fetchOrderRequest,
  fetchOrderSuccess,
} from "../../features/ordersList/ordersListSlice";
import { auth22 } from "../../firebase/firebase";
import { readOrders } from "../../services/orders/readOrders.service";

function* readOrderSaga(action: PayloadAction<void>) {
  try {
    const user = auth22.currentUser; // Assuming auth22 is the Firebase auth object
    const res: orderModel[] = yield call(readOrders, user?.uid, []);
    yield put(fetchOrderSuccess(res)); // Dispatch success action with fetched orders
  } catch (error) {
    yield put(fetchOrderError("Error fetching orders"));
  }
}

export function* watchReadOrder() {
  yield takeLatest(fetchOrderRequest.type, readOrderSaga);
}
