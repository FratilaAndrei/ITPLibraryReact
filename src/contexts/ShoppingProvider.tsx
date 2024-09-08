import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BookModel } from "../data/types/type";

export type ShoppingContextModel = {
  shoppingArray: BookModel[];
  setShoppingArray: Dispatch<SetStateAction<BookModel[]>>;
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  addToShoppingCart: (book: BookModel) => void;
  handleAddToCart: (book: BookModel) => void;
  showAddedPopup: boolean;
  lastAddedBook: BookModel | null;
};

const initialContext = {
  shoppingArray: [],
  setShoppingArray: () => {},
  shoppingPrice: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  handleRemoveItem: () => {},
  placeOrder: () => {},
  addToShoppingCart: () => {},
  handleAddToCart: () => {},
  showAddedPopup: false,
  lastAddedBook: null,
};

export const ShoppingContext =
  createContext<ShoppingContextModel>(initialContext);

const ShoppingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const getInitialShoppingState = (): BookModel[] => {
    const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
    return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
  };

  const [shoppingArray, setShoppingArray] = useState<BookModel[]>(() =>
    getInitialShoppingState()
  );

  const [lastAddedBook, setLastAddedBook] = useState<BookModel | null>(null);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingArray));
  }, [shoppingArray]);

  const shoppingPrice = shoppingArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateShoppingArray = (updatedArray: BookModel[]) => {
    setShoppingArray(updatedArray);
  };

  const incrementQuantity = (id: number) => {
    const updatedArray = [...shoppingArray];
    const book = updatedArray.find((b) => b.id === id);
    if (!book) return;
    book.quantity += 1;
    updateShoppingArray(updatedArray);
  };

  const decrementQuantity = (id: number) => {
    const updatedArray = [...shoppingArray];
    const book = updatedArray.find((b) => b.id === id);
    if (!book) return;
    if (book.quantity > 1) {
      book.quantity -= 1;
      updateShoppingArray(updatedArray);
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedArray = shoppingArray.filter((book) => book.id !== id);
    updateShoppingArray(updatedArray);
  };
  const showPopup = () => {
    setShowAddedPopup(true);
    setTimeout(() => {
      setShowAddedPopup(false);
    }, 3000);
  };

  const addToShoppingCart = (book: BookModel) => {
    setShoppingArray((prevState) => [...prevState, book]);
    setLastAddedBook(book);
    showPopup();
  };

  const handleAddToCart = (book: BookModel) => {
    const existingBook = shoppingArray.find(
      (targetBook: BookModel) => targetBook.id === book.id
    );
    if (existingBook) {
      existingBook.quantity += 1;
      setShoppingArray([...shoppingArray]);
    } else {
      addToShoppingCart(book);
    }
    setLastAddedBook(book);
    showPopup();
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingArray,
        shoppingPrice,
        incrementQuantity,
        decrementQuantity,
        handleRemoveItem,
        addToShoppingCart,
        handleAddToCart,
        setShoppingArray,
        showAddedPopup,
        lastAddedBook,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingProvider;
