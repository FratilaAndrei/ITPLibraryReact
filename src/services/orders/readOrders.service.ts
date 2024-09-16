import axios from "axios";
import { orderModel } from "../../data/types/type";
import { API_URL } from "../../firebase/firebase";

export const readOrders = async () => {
  try {
    const res = await axios.get(`${API_URL}/orders.json`);
    const ordersArray: orderModel[] = Object.keys(res.data).map((key) => ({
      id: key,
      ...res.data[key],
    }));
    return ordersArray;
  } catch (error) {
    console.error("There was an error!", error);
    throw error; // Ensure errors are propagated correctly
  }
};
