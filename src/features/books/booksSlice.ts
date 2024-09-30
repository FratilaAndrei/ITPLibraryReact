import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookModel, bookModel2 } from "../../data/types/type";
interface BooksState {
  // books: BookModel[];
  books: bookModel2[];
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
    // fetchBooksSuccess: (state, action: PayloadAction<BookModel[]>) => {
    fetchBooksSuccess: (state, action: PayloadAction<bookModel2[]>) => {
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
