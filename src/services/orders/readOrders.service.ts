import axios from "axios";
import { User } from "firebase/auth";
import { orderModelFetchModel } from "../../data/types/type";
import { API_URL, auth22 } from "../../firebase/firebase";

export const getTokenFromCookies = () => {
  const token = document.cookie.match(/Auth-jwt=([^;]+)/)?.[1];
  return token;
};

const getAccountToken = async (user: User) => {
  if (user) {
    const token = await auth22.currentUser?.getIdToken();
    return token;
  } else {
    console.error("No user is currently signed in.");
    return null;
  }
};

export const readOrders = async (
  // user: User,
  user: User,
  orderData: orderModelFetchModel[]
) => {
  await getAccountToken(user);

  const token = getTokenFromCookies();

  try {
    const res = await axios.get(`${API_URL}/orders/${user}.json`, {
      headers: {
        "X-Authorization": `Bearer ${token}`,
      },
    });

    if (res.data && typeof res.data === "object") {
      const ordersArray: orderModelFetchModel[] = Object.keys(res.data).map(
        (key) => ({
          id: key,
          ...res.data[key],
        })
      );
      orderData.push(...ordersArray);
    } else {
      console.warn("No orders found or data is not in expected format.");
    }

    return orderData;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const modifyOrder = async (user: User, order: orderModelFetchModel) => {
  const token = getTokenFromCookies();
  try {
    await axios.put(`${API_URL}/orders/${user}/${order.id}.json`, order, {
      headers: {
        "X-Authorization": `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const updateStatusOrder = async (
  user: User,
  order: orderModelFetchModel
) => {
  const token = getTokenFromCookies();
  try {
    await axios.put(`${API_URL}/orders/${user}/${order.id}.json`, order, {
      headers: {
        "X-Authorization": `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("There was an error updating status", error);
  }
};
