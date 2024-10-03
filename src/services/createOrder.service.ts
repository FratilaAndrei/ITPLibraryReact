import axios from "axios";
import { orderModel } from "../data/types/type";
import { API_URL, auth22 } from "./../firebase/firebase";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (order: orderModel) => {
  const id = uuidv4();
  const userId = auth22.currentUser?.uid;
  try {
    await axios.put(`${API_URL}/orders/${userId}/${id}.json`, order);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
