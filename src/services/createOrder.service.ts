import axios from "axios";
import { orderModel } from "../data/types/type";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const createOrder = async (order: orderModel) => {
  const id = uuidv4();
  try {
    const res = await axios.post(`${apiURL}/orders/${id}.json`, order);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
