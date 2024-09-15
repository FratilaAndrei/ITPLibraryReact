// booksSaga.ts or where you handle API calls
import { call, put, takeLatest } from "redux-saga/effects";
import { BookModel } from "../data/types/type";
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
} from "../features/books/booksSlice";
import { getBooksData } from "../services/books.service";

function* fetchBooksSaga() {
  try {
    const response: BookModel[] = yield call(getBooksData);
    yield put(fetchBooksSuccess(response));
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

export function* watchFetchBooks() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
}
