import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ORDERS_ROUTE } from "../data/routes";
import { BookType } from "../data/types/type";

export type ShoppingContextType = {
  shoppingArray: BookType[];
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  placeOrder: () => void;
  ordersArray: BookType[];
};

export const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

const getInitialShoppingState = (): BookType[] => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  console.log(SHOPPING_STORAGE);
  return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
};

const initialOrderState = (): BookType[] => {
  const ORDERS = localStorage.getItem("order-cart");
  return ORDERS ? JSON.parse(ORDERS) : [];
};

const ShoppingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const [shoppingArray, setShoppingArray] = useState<BookType[]>(
    getInitialShoppingState()
  );

  const [ordersArray, setOrdersArray] = useState<BookType[]>(
    initialOrderState()
  );

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingArray));
  }, [shoppingArray]);

  useEffect(() => {
    localStorage.setItem("order-cart", JSON.stringify(ordersArray));
  }, [ordersArray]);

  const shoppingPrice = shoppingArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateShoppingArray = (updatedArray: BookType[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(updatedArray));
    setOrdersArray([...updatedArray]);
    setShoppingArray(updatedArray);
  };

  // useEffect(() => {
  //   updateShoppingArray(shoppingArray);
  // }, [shoppingArray]);

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

  const placeOrder = () => {
    if (shoppingArray.length > 0) {
      setOrdersArray([...shoppingArray, ...ordersArray]);
      setShoppingArray([]);
    }
    navigate(ORDERS_ROUTE);
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingArray,
        shoppingPrice,
        incrementQuantity,
        decrementQuantity,
        handleRemoveItem,
        placeOrder,
        ordersArray,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
