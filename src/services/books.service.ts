import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { bookModel2 } from "../data/types/type";
import { API_URL, imageDB } from "../firebase/firebase";

const imageBucket = import.meta.env.VITE_APP_BUCKET_STORAGE;

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
    const gsReference = ref(imageDB, "gs://booksImages/the-idiot.jpg");

    const imageUrl = await getDownloadURL(gsReference);

    const book: bookModel2 = {
      id,
      image: imageUrl,
      title: "Goddess Of Insanity",
      author: "Dennis Jenkins",
      price: 70,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
      description:
        "The Goddess of Insanity rules a world where madness is power and chaos is law. In this dark fantasy epic, one man ventures into the heart of insanity to reclaim his lost family. Facing horrifying creatures, twisted landscapes, and psychological torment, he must embrace his own madness to survive. The line between reality and delusion blurs, and only by confronting the truth of the Goddess's control can he hope to break free. A chilling exploration of mental fortitude and the strength of the human spirit.",
    };
    const res = await axios
      .put(`${API_URL}/books/${id}.json`, book)
      .then(function (response) {
        console.log(response.data);
      });
  } catch (error) {
    console.error("A crapat post book", error);
  }
};
