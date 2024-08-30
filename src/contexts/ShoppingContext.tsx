import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ORDERS_ROUTE } from "../data/routes";
import { BookType, orderType } from "../data/types/type";
import { FormContext } from "./FormProvider";

export type ShoppingContextType = {
  shoppingArray: BookType[];
  setShoppingArray: Dispatch<SetStateAction<BookType[]>>;
  shoppingPrice: number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
  placeOrder: () => void;
  ordersArray: orderType[];
  addToShoppingCart: (book: BookType) => void;
  // getInitialShoppingState: () => void;
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
  ordersArray: [],
  addToShoppingCart: () => {},
  // getInitialShoppingState: () => {},
  handleAddToCart: () => {},
  handleShipment: () => {},
};

export const ShoppingContext =
  createContext<ShoppingContextType>(initialContext);

const ShoppingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { formArray } = useContext(FormContext);

  const getInitialShoppingState = (): BookType[] => {
    const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
    return SHOPPING_STORAGE ? JSON.parse(SHOPPING_STORAGE) : [];
  };

  const initialOrderState = (): orderType[] => {
    const ORDERS = localStorage.getItem("order-cart");
    return ORDERS ? JSON.parse(ORDERS) : [];
  };

  const navigate = useNavigate();

  const [shoppingArray, setShoppingArray] = useState<BookType[]>(() =>
    getInitialShoppingState()
  );

  const [ordersArray, setOrdersArray] = useState<orderType[]>(() =>
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
    // localStorage.setItem("shopping-cart", JSON.stringify(updatedArray));
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

  const getQuantity = () =>
    shoppingArray.reduce((total, item) => total + item.quantity, 0);

  const placeOrder = () => {
    if (shoppingArray.length > 0) {
      const newOrder: orderType = {
        id: uuidv4(),
        quantity: getQuantity(),
        price: shoppingPrice,
        status: "In Progress",
        form: formArray[formArray.length - 1],
      };
      setOrdersArray((prevState) => [...prevState, newOrder]);
      setShoppingArray([]);
      console.log(newOrder);
      console.log(formArray);
    }
    navigate(ORDERS_ROUTE);
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
        placeOrder,
        ordersArray,
        addToShoppingCart,
        // getInitialShoppingState,
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
