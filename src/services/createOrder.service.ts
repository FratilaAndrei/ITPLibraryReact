import axios from "axios";
import { orderModel } from "../data/types/type";
import { API_URL } from "./../firebase/firebase";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (order: orderModel) => {
  const id = uuidv4();
  try {
    const res = await axios.post(`${API_URL}/orders/${id}.json`, order);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
