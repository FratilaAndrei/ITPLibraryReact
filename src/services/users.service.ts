import axios from "axios";
import { userModel } from "../components/Auth/AuthValidationSchema";
// import { v4 as uuidv4 } from "uuid";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${apiURL}/users.json`);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${apiURL}/users.json`);
    console.log(res);
    return res;
  } catch (error) {
    console.error("No users", error);
  }
};

export const postUser = async (user: userModel) => {
  try {
    const res = await axios.post(`${apiURL}/users/${user.id}.json`, user);
    console.log("Posted", res);
  } catch (error) {
    console.error("A crapat post user", error);
  }
};
