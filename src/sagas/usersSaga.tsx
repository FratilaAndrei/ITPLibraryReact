import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { userModel } from "../components/Auth/AuthValidationSchema";
import {
  fetchUserSuccess,
  saveNewUser,
} from "../features/userAccount/userAccountSlice";
import { fetchUsers, postUser } from "../services/users.service";

function* fetchUsersSaga() {
  try {
    const res: userModel[] = yield call(fetchUsers);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
}

function* postUsersSaga(action: PayloadAction<userModel>) {
  try {
    const res: userModel = yield call(postUser, action.payload);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
}
// function getUsers() {
//   try {
//     const res = yield call(fetchAllUsers);
//     console.log(res.data);
//   } catch (error) {
//     console.error("There was an error!", error);
//   }
// }

export function* watchFetchUsers() {
  yield takeLatest(fetchUserSuccess.type, fetchUsersSaga);
  yield takeLatest(saveNewUser.type, postUsersSaga);
  //   yield takeLatest(fetchUserSuccess.type, getUsers);
  // yield takeLatest(fetchMostRecentBooks, fetchMostRecentBooks);
}
