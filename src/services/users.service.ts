import axios from "axios";
import { userModel } from "../components/Auth/AuthValidationSchema";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../firebase/firebase";

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users.json`);
    console.log(res);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users.json`);
    return res;
  } catch (error) {
    console.error("No users", error);
  }
};

export const postUser = async (user: userModel) => {
  try {
    const id = uuidv4();
    const res = await axios
      .put(`${API_URL}/users/${id}.json`, user)
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
      });
  } catch (error) {
    console.error("A crapat post user", error);
  }
};
