import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { BookType } from "../data/types/type";

export type ShoppingContextType = {
  shoppingArray: BookType[];
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
};

// export const ShoppingContext = createContext<ShoppingContextType | undefined>(
//   undefined
// );

export const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

const getInitialShoppingState = (): BookType[] => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
};

const ShoppingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [shoppingArray, setShoppingArray] = useState<BookType[]>(
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
    localStorage.setItem("shopping-cart", JSON.stringify(updatedArray));
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

  return (
    <ShoppingContext.Provider
      value={{
        shoppingArray,
        shoppingPrice,
        incrementQuantity,
        decrementQuantity,
        handleRemoveItem,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
