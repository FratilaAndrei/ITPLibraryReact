// booksSaga.ts or where you handle API calls
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
} from "../features/books/booksSlice";
import { getBooksData } from "../services/books.service";

function* fetchBooksSaga() {
  try {
    const response = yield call(getBooksData);
    yield put(fetchBooksSuccess(response));
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

// function* fetchMostRecentBooks() {
//   try {
//     const response = yield call(getMostRecentBooks);
//     yield put(fetchMostRecentBooks(response));
//   } catch (error) {
//     yield put(fetchBooksFailure(error.message));
//   }
// }

export function* watchFetchBooks() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
  // yield takeLatest(fetchMostRecentBooks, fetchMostRecentBooks);
}
