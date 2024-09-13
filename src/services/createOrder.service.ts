import axios from "axios";
import { orderModel } from "../data/types/type";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const createOrder = async (order: orderModel) => {
  try {
    const res = await axios.post(`${apiURL}/orders.json`, order);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
