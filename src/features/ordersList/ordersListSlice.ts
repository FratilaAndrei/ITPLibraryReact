import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  orderDetailsModelWitoutId,
  orderModel,
  orderModelFetchModel,
} from "../../data/types/type";
import { auth22 } from "../../firebase/firebase";

export type ordersListModel = {
  ordersList: orderModelFetchModel[];
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
      if (!auth22.currentUser) {
        console.log("No ID");
        return;
      }
      const userId = auth22.currentUser.uid;

      const newOrder: orderModelFetchModel = {
        // id: uuidv4(),
        id: userId,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
        status: "In Progress",
        orderDetails: {
          ...orderDetails,
          deliveryDate: orderDetails.deliveryDate,
        },
      };
      state.ordersList.push(newOrder);
    },

    editForm: (state, action: PayloadAction<orderModelFetchModel>) => {
      state.ordersList = state.ordersList.map((order) => {
        if (order.id === action.payload.id) {
          return {
            ...order,
            totalPrice: action.payload.totalPrice, // Update totalPrice
            totalQuantity: action.payload.totalQuantity, // Update totalQuantity
            status: action.payload.status,
            // orderDetails: {
            //   ...order.orderDetails, // Keep existing order details
            //   ...action.payload.orderDetails, // Update specific details
            // },
            orderDetails: action.payload.orderDetails,
          };
        }
        return order;
      });
      console.log("Updated Orders", state.ordersList);
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
    fetchOrderRequest: (state, action: PayloadAction) => {
      state.loading = true;
      console.log("orderData -", action.payload);
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
