import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { orderDetailsModel, orderModel } from "../../data/types/type";

export type ordersListModel = {
  ordersList: orderModel[];
  quantity: number;
};
const getInitialOrderState = (): orderModel[] => {
  const ORDERS = localStorage.getItem("orders");
  return ORDERS ? JSON.parse(ORDERS) : [];
};

const ordersListInitialState: ordersListModel = {
  ordersList: getInitialOrderState(),
  quantity: 0,
};

export const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: ordersListInitialState,
  reducers: {
    placeOrder: (
      state,
      action: PayloadAction<{
        orderDetails: orderDetailsModel;
        totalQuantity: number;
        totalPrice: number;
      }>
    ) => {
      const { orderDetails, totalQuantity, totalPrice } = action.payload;

      const newOrder: orderModel = {
        id: uuidv4(),
        quantity: totalQuantity,
        price: totalPrice,
        status: "In Progress",
        orderDetails: {
          ...orderDetails,
          deliveryDate: orderDetails.deliveryDate,
        },
      };
      state.ordersList.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.ordersList));
    },
    editForm: (
      state,
      action: PayloadAction<{ orderDetails: orderDetailsModel; id: string }>
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
      localStorage.setItem("orders", JSON.stringify(state.ordersList));
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
  },
});

export const { placeOrder, editForm, handleShipment } = ordersListSlice.actions;

export default ordersListSlice.reducer;
