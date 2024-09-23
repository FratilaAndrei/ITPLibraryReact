import axios from "axios";
import { User } from "firebase/auth";
import { orderModelFetchModel } from "../../data/types/type";
import { API_URL, auth22 } from "../../firebase/firebase";

export const getTokenFromCookies = () => {
  // const token = document.cookie.split("=")[1];
  const token = document.cookie.match(/Auth-jwt=([^;]+)/)?.[1];
  // Aparent am si Clerk cookies
  // console.log("Token DIN COOKIE este - ", token);
  return token;
};

const getAccountToken = async (user: User) => {
  if (user) {
    const token = await auth22.currentUser?.getIdToken();
    // console.log("Token Account Logged", token);
    return token;
  } else {
    console.error("No user is currently signed in.");
    return null;
  }
};

export const readOrders = async (
  user: User,
  orderData: orderModelFetchModel[]
) => {
  const accToken = await getAccountToken(user);
  // console.log("Token Account Logged:", accToken);

  // if (!accToken) {
  //   console.log("No valid token");
  //   return;
  // }

  // console.log("Service User - ", user);

  const token = getTokenFromCookies();

  // if (!token) {
  //   console.log("no token");
  //   return;
  // }
  // console.log("User", user);

  // if (!user) {
  //   console.error("No valid user is currently signed in.");
  //   return;
  // }

  try {
    const res = await axios.get(`${API_URL}/orders/${user}.json`, {
      headers: {
        "X-Authorization": `Bearer ${token}`,
      },
    });

    console.log("API Response: ", res); // Check the full response object

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

    console.log(orderData);
    return orderData;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const modifyOrder = async (user: User, order: orderModelFetchModel) => {
  const token = getTokenFromCookies();
  try {
    const res = await axios.put(
      `${API_URL}/orders/${user}/${order.id}.json`,
      order,
      {
        headers: {
          "X-Authorization": `Bearer ${token}`,
        },
      }
    );
    console.log("COMANDA UPDATED dupa form: ", res); // Check the full response object
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
    const res = await axios.put(
      `${API_URL}/orders/${user}/${order.id}.json`,
      order,
      {
        headers: {
          "X-Authorization": `Bearer ${token}`,
        },
      }
    );
    console.log("Status order updated", res);
  } catch (error) {
    console.error("There was an error updating status", error);
  }
};
