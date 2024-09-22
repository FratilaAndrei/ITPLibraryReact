import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderDetailsModelWitoutId, orderModel } from "../../data/types/type";

export type ordersListModel = {
  ordersList: orderModel[];
  quantity: number;
  loading: boolean;
  error: string | boolean;
};

const ordersListInitialState: ordersListModel = {
  ordersList: [],
  quantity: 0,
  loading: false,
  error: false,
};

export const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: ordersListInitialState,
  reducers: {
    placeOrder: (
      state,
      action: PayloadAction<{
        orderDetails: orderDetailsModelWitoutId;
        totalQuantity: number;
        totalPrice: number;
      }>
    ) => {
      const { orderDetails, totalQuantity, totalPrice } = action.payload;

      const newOrder: orderModel = {
        // id: uuidv4(),
        // id: auth22.currentUser?.uid,
        quantity: totalQuantity,
        price: totalPrice,
        status: "In Progress",
        orderDetails: {
          ...orderDetails,
          deliveryDate: orderDetails.deliveryDate,
        },
      };
      state.ordersList.push(newOrder);
    },
    editForm: (
      state,
      action: PayloadAction<{
        orderDetails: orderDetailsModelWitoutId;
        id: string;
      }>
    ) => {
      const { orderDetails, id } = action.payload;
      state.ordersList = state.ordersList.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            orderDetails: orderDetails,
          };
        }
        return order;
      });
    },
    handleShipment: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ordersList: state.ordersList.map((order) => {
          return order.id === action.payload
            ? { ...order, status: "Completed" }
            : order;
        }),
      };
    },
    fetchOrderRequest: (state) => {
      state.loading = true;
      // console.log("Acc -", action.payload);
    },
    fetchOrderSuccess: (
      state,
      action: PayloadAction<orderModel[]>
      // user: User
    ) => {
      state.loading = false;
      state.ordersList = action.payload;
      // Pe baza de id stochez un array de comanda
    },
    fetchOrderError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  placeOrder,
  editForm,
  handleShipment,
  fetchOrderRequest,
  fetchOrderSuccess,
  fetchOrderError,
} = ordersListSlice.actions;

export default ordersListSlice.reducer;
