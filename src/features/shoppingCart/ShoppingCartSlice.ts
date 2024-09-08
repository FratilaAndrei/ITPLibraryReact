import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookModel } from "./../../data/types/type";

export type ShoppingCartState = {
  items: BookModel[];
  shoppingPrice: number;
  showPopup: boolean;
  lastAddedBook: BookModel | null;
  bookAddedCount: number;
};
const getInitialShoppingState = (): BookModel[] => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
};

const saveCartToLocalStorage = (items: BookModel[]) => {
  localStorage.setItem("shopping-cart", JSON.stringify(items));
};

const initialState: ShoppingCartState = {
  items: getInitialShoppingState(),
  shoppingPrice: 0,
  showPopup: false,
  lastAddedBook: null,
  bookAddedCount: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    getShoppingPrice: (state) => {
      state.shoppingPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    incrementQuantity: (state, action: PayloadAction<BookModel>) => {
      const book = state.items.find(
        (book: BookModel) => book.id === action.payload.id
      );
      if (book) {
        book.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },
    decrementQuantity: (state, action: PayloadAction<BookModel>) => {
      const book = state.items.find(
        (book: BookModel) => book.id === action.payload.id
      );
      if (book && book.quantity > 1) {
        book.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },
    handleRemoveItem: (state, action: PayloadAction<BookModel>) => {
      state.items = state.items.filter(
        (book: BookModel) => book.id !== action.payload.id
      );
      saveCartToLocalStorage(state.items);
    },
    showPopup: (state) => {
      state.showPopup = true;
    },
    hidePopup: (state) => {
      state.showPopup = false;
    },
    addToShoppingCart: (state, action: PayloadAction<BookModel>) => {
      state.items.push(action.payload);
      state.lastAddedBook = action.payload;
      state.showPopup = true;
      saveCartToLocalStorage(state.items);
    },
    handleAddToCart: (state, action: PayloadAction<BookModel>) => {
      const existingBook = state.items.find(
        (book: BookModel) => book.id === action.payload.id
      );

      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.items.push(action.payload);
      }

      state.lastAddedBook = action.payload;
      state.showPopup = true;
      saveCartToLocalStorage(state.items);
    },
    addBookCounter: (state) => {
      state.bookAddedCount += 1;
    },
    resetAddedBookCounter: (state) => {
      state.bookAddedCount = 1;
    },
    resetShoppingCartItems: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  getShoppingPrice,
  incrementQuantity,
  decrementQuantity,
  handleRemoveItem,
  showPopup,
  addToShoppingCart,
  handleAddToCart,
  hidePopup,
  addBookCounter,
  resetAddedBookCounter,
  resetShoppingCartItems,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
