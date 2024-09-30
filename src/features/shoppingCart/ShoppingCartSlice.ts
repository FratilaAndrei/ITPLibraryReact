import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookModel2 } from "./../../data/types/type";

export type ShoppingCartState = {
  items: bookModel2[];
  shoppingPrice: number;
  showPopup: boolean;
  lastAddedBook: bookModel2 | null;
  bookAddedCount: number;
};
const getInitialShoppingState = (): bookModel2[] => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
};

const saveCartToLocalStorage = (items: bookModel2[]) => {
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
    incrementQuantity: (state, action: PayloadAction<bookModel2>) => {
      const book = state.items.find(
        (book: bookModel2) => book.id === action.payload.id
      );
      if (book) {
        book.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },
    decrementQuantity: (state, action: PayloadAction<bookModel2>) => {
      const book = state.items.find(
        (book: bookModel2) => book.id === action.payload.id
      );
      if (book && book.quantity > 1) {
        book.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },
    handleRemoveItem: (state, action: PayloadAction<bookModel2>) => {
      state.items = state.items.filter(
        (book: bookModel2) => book.id !== action.payload.id
      );
      saveCartToLocalStorage(state.items);
    },
    showPopup: (state) => {
      state.showPopup = true;
    },
    hidePopup: (state) => {
      state.showPopup = false;
    },
    addToShoppingCart: (state, action: PayloadAction<bookModel2>) => {
      state.items.push(action.payload);
      state.lastAddedBook = action.payload;
      state.showPopup = true;
      saveCartToLocalStorage(state.items);
    },
    handleAddToCart: (state, action: PayloadAction<bookModel2>) => {
      const existingBook = state.items.find(
        (book: bookModel2) => book.id === action.payload.id
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
