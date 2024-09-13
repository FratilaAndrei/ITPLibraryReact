import axios from "axios";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const getBooksData = async () => {
  try {
    const response = await axios.get(`${apiURL}/books.json`);

    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const getMostRecentBooks = async () => {
  try {
    const response = await axios.get(`${apiURL}/books.json`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("There was an error!", error);
  }
};
