import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderDetailsModel, orderModel } from "../../data/types/type";

export type ordersListModel = {
  ordersList: orderModel[];
  quantity: number;
  loading: boolean;
  error: string | boolean;
};
// const getInitialOrderState = (): orderModel[] => {
//   const ORDERS = localStorage.getItem("orders");
//   return ORDERS ? JSON.parse(ORDERS) : [];
// };

const ordersListInitialState: ordersListModel = {
  // ordersList: getInitialOrderState(),
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
        orderDetails: orderDetailsModel;
        totalQuantity: number;
        totalPrice: number;
      }>
    ) => {
      const { orderDetails, totalQuantity, totalPrice } = action.payload;

      const newOrder: orderModel = {
        // id: uuidv4(),
        quantity: totalQuantity,
        price: totalPrice,
        status: "In Progress",
        orderDetails: {
          ...orderDetails,
          deliveryDate: orderDetails.deliveryDate,
        },
      };
      state.ordersList.push(newOrder);
      // console.log(newOrder);

      // localStorage.setItem("orders", JSON.stringify(state.ordersList));
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
      // localStorage.setItem("orders", JSON.stringify(state.ordersList));
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
    },
    fetchOrderSuccess: (state, action: PayloadAction<orderModel[]>) => {
      state.loading = false;
      state.ordersList = action.payload;
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
