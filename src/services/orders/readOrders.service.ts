import axios from "axios";
import { orderModel } from "../../data/types/type";
import { API_URL } from "../../firebase/firebase";

// const getTokenFromCookies = () => {
//   const token = document.cookie.split("=")[1];
//   console.log("Token DIN COOKIE este - ", token);
//   return token;
// };

// const getAccountToken = async () => {
//   if (auth22.currentUser) {
//     const token = await auth22.currentUser.getIdToken();
//     console.log("Token from Firebase Auth:", token);
//     return token;
//   } else {
//     console.error("No user is currently signed in.");
//     return null;
//   }
// };

export const readOrders = async () => {
  // const accToken = await getAccountToken();

  // const token = getTokenFromCookies();
  // console.log("Token din Cont", accToken);

  // if (!token) {
  //   console.log("no token");
  //   return;
  // }

  // NU reusesc sa inteleg, token cont - token cookie, 1 - 1 imi da unauthorized
  // Req crapa din 3 motive diferite, in res.data sunt date, la metoda de ordersArray nu mai sunt
  // Nu mai inteleg nimic..

  try {
    // const res = await axios.get(`${API_URL}/orders.json`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const res = await axios.get(`${API_URL}/orders.json`);
    // const ordersArray: orderModel[] = Object.keys(res.data).map((key) => ({
    //   id: key,
    //   ...res.data[key],
    // }));
    // return ordersArray;
    console.log(res.data);

    const ordersArray: orderModel[] = Object.keys(res.data.orders).map(
      (key) => ({
        id: key,
        ...res.data[key],
      })
    );
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
