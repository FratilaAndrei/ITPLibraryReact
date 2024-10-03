import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { orderModelFetchModel } from "../../data/types/type";
import { handleShipment } from "../../features/ordersList/ordersListSlice";
import { auth22 } from "../../firebase/firebase";
import { updateStatusOrder } from "../../services/orders/readOrders.service";

function* updateStatusOrderSaga(action: PayloadAction<orderModelFetchModel>) {
  try {
    const user = auth22.currentUser;
    const res: orderModelFetchModel[] = yield call(
      updateStatusOrder,
      user?.uid,
      action.payload
    );
  } catch (error) {
    console.log("Update Failed", error);
  }
}

export function* watchUpdateStatusOrder() {
  yield takeLatest(handleShipment.type, updateStatusOrderSaga);
}
