import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { orderModel, orderModelFetchModel } from "../../data/types/type";
import {
  editForm,
  fetchOrderError,
} from "../../features/ordersList/ordersListSlice";
import { auth22 } from "../../firebase/firebase";
import { modifyOrder } from "../../services/orders/readOrders.service";

function* modifyOrderSaga(action: PayloadAction<orderModelFetchModel>) {
  try {
    const user = auth22.currentUser;
    const res: orderModel[] = yield call(
      modifyOrder,
      user?.uid,
      action.payload
    );
  } catch (error) {
    yield put(fetchOrderError("Error fetching orders"));
  }
}

export function* watchModifyOrder() {
  yield takeLatest(editForm.type, modifyOrderSaga);
}
