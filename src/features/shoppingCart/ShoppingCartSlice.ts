import { createSlice } from "@reduxjs/toolkit";
import { BookModel } from "../../data/types/type";

export type ShoppingCartState = {
  items: BookModel[];
};

const initialState: ShoppingCartState = {
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item: BookModel) => item.id !== action.payload
      );
    },
  },
});

export const { addItem, deleteItem } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
