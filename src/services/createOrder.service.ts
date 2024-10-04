import axios from "axios";
import { orderModelFetchModel } from "../data/types/type";
import { API_URL, auth22 } from "./../firebase/firebase";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

// export const createOrder = async (order: orderModel) => {
export const order_id = uuidv4();

export const createOrder = async (order: orderModelFetchModel) => {
  const userId = auth22.currentUser?.uid;
  try {
    await axios.put(`${API_URL}/orders/${userId}/${order_id}.json`, order);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
