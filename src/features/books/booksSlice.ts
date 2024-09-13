import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookModel } from "../../data/types/type";
interface BooksState {
  books: BookModel[];
  loading: boolean;
  error: string | null;
  mostRecentBooks: BookModel[];
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  mostRecentBooks: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
    },
    fetchBooksSuccess: (state, action: PayloadAction<BookModel[]>) => {
      state.books = action.payload;
      state.loading = false;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchMostRecentBooks: (state, action: PayloadAction<BookModel[]>) => {
      state.mostRecentBooks = action.payload;
    },
  },
});

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  fetchMostRecentBooks,
} = bookSlice.actions;
export default bookSlice.reducer;
