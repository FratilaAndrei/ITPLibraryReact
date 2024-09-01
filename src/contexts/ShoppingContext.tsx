import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BookType } from "../data/types/type";

export type ShoppingContextType = {
  shoppingArray: BookType[];
  setShoppingArray: Dispatch<SetStateAction<BookType[]>>;
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  addToShoppingCart: (book: BookType) => void;
  handleAddToCart: (book: BookType) => void;
  showAddedPopup: boolean;
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
};

export const ShoppingContext =
  createContext<ShoppingContextType>(initialContext);

const ShoppingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const getInitialShoppingState = (): BookType[] => {
    const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
    return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
  };

  const [shoppingArray, setShoppingArray] = useState<BookType[]>(() =>
    getInitialShoppingState()
  );

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingArray));
  }, [shoppingArray]);

  const shoppingPrice = shoppingArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateShoppingArray = (updatedArray: BookType[]) => {
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

  const addToShoppingCart = (book: BookType) => {
    setShoppingArray((prevState) => [...prevState, book]);
    showPopup();
  };

  const handleAddToCart = (book: BookType) => {
    const existingBook = shoppingArray.find(
      (targetBook: BookType) => targetBook.id === book.id
    );
    if (existingBook) {
      existingBook.quantity += 1;
      setShoppingArray([...shoppingArray]);
      showPopup();
    } else {
      addToShoppingCart(book);
    }
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
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
