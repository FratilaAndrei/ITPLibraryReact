import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { bookModel2 } from "../data/types/type";
import { API_URL, imageDB } from "../firebase/firebase";

export const getBooksData = async () => {
  try {
    const response = await axios.get(`${API_URL}/books.json`);

    const booksArray = Object.keys(response.data).map((key) => ({
      ...response.data[key],
      id: key,
    }));

    return booksArray;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const createBook = async () => {
  try {
    const id = uuidv4();

    const gsReference = ref(imageDB, "bookImages/dead-souls.jpg");

    const imageUrl = await getDownloadURL(gsReference);

    const book: bookModel2 = {
      id,
      image: imageUrl,
      title: "The Phoenix Blade",
      author: "Damon Ashcroft",
      price: 88,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
      description:
        "Forged in fire, the Phoenix Blade is a weapon of immense power and destruction. In Damon Ashcroft's 'The Phoenix Blade', a young warrior is chosen to wield the legendary sword in a battle to save his people from an invading force. As the warrior masters the blade, he learns that its power comes at a great cost, and its true purpose is far more sinister than he imagined. In a race against time, he must decide whether to use the blade's power to defeat his enemies or destroy it before it consumes him.",
    };
    await axios.put(`${API_URL}/books/${id}.json`, book);
  } catch (error) {
    console.error("A crapat post book", error);
  }
};
