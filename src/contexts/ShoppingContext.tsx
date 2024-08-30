import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BookType, orderType } from "../data/types/type";

export type ShoppingContextType = {
  shoppingArray: BookType[];
  setShoppingArray: Dispatch<SetStateAction<BookType[]>>;
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  addToShoppingCart: (book: BookType) => void;
  handleAddToCart: (book: BookType) => void;
  handleShipment: (order: orderType) => void;
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
  handleShipment: () => {},
};

export const ShoppingContext =
  createContext<ShoppingContextType>(initialContext);

const ShoppingContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const addToShoppingCart = (book: BookType) => {
    setShoppingArray((prevState) => [...prevState, book]);
  };

  const handleAddToCart = (book: BookType) => {
    const existingBook = shoppingArray.find(
      (targetBook: BookType) => targetBook.id === book.id
    );
    if (existingBook) {
      existingBook.quantity += 1;
      setShoppingArray([...shoppingArray]);
    } else {
      addToShoppingCart(book);
    }
  };

  const handleShipment = (order: orderType) => {
    order.status = "Completed";
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
        handleShipment,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
