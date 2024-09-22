import axios from "axios";
import { User } from "firebase/auth";
import { orderModel } from "../../data/types/type";
import { API_URL, auth22 } from "../../firebase/firebase";

const getTokenFromCookies = () => {
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

export const readOrders = async (user: User) => {
  // console.log("User 3", user);

  // if (!user) {
  //   console.error("No user is currently signed in.");
  //   return;
  // }

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
    // const res = await axios.get(`${API_URL}/orders/${user.uid}.json`, {
    const res = await axios.get(`${API_URL}/orders/${user}.json`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        // "X-Authorization": `Bearer ${accToken}`,
        "X-Authorization": `Bearer ${token}`,
      },
    });
    // const res = await axios.get(`${API_URL}/orders.json`);
    // const ordersArray: orderModel[] = Object.keys(res.data).map((key) => ({
    //   id: key,
    //   ...res.data[key],
    // }));
    // return ordersArray;
    // console.log("Resultat", res.data);

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

// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
