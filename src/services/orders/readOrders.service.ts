import axios from "axios";
import { orderModel } from "../../data/types/type";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const readOrders = async (): Promise<orderModel[]> => {
  try {
    const res = await axios.get(`${apiURL}/orders.json`);
    const ordersArray = Object.keys(res.data).map((key) => ({
      id: key,
      ...res.data[key],
    }));
    console.log(ordersArray);
    return ordersArray;
  } catch (error) {
    console.error("There was an error!", error);
    throw error; // Ensure errors are propagated correctly
  }
};
