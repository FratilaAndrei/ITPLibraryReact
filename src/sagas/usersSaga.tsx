import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import { userModel } from "../components/Auth/AuthValidationSchema";
import {
  fetchUserSuccess,
  saveNewUser,
} from "../features/userAccount/userAccountSlice";
import { fetchUsers, postUser } from "../services/users.service";

// const { registerUser } = useContext(UserContext);

function* fetchUsersSaga() {
  try {
    yield call(fetchUsers);
  } catch (error) {
    console.error("There was an error!", error);
  }
}

function* postUsersSaga(action: PayloadAction<userModel>) {
  try {
    yield call(postUser, action.payload);
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
  // yield takeLatest(registerUser.type, postUsersSaga);
  //   yield takeLatest(fetchUserSuccess.type, getUsers);
  // yield takeLatest(fetchMostRecentBooks, fetchMostRecentBooks);
}
