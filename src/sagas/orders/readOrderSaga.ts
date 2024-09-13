import { call, put, takeLatest } from "redux-saga/effects";
import { orderModel } from "../../data/types/type";
import {
  fetchOrderError,
  fetchOrderRequest,
  fetchOrderSuccess,
} from "../../features/ordersList/ordersListSlice";
import { readOrders } from "../../services/orders/readOrders.service";

function* readOrderSaga() {
  try {
    const res: orderModel[] = yield call(readOrders);
    console.log(res);
    yield put(fetchOrderSuccess(res));
  } catch (error) {
    console.error("There was an error!", error);
    yield put(fetchOrderError("Eroare"));
  }
}

export function* watchReadOrder() {
  yield takeLatest(fetchOrderRequest.type, readOrderSaga);
}
