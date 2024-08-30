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
import { formType, orderType } from "../data/types/type";
import { ShoppingContext } from "./ShoppingContext";

export type orderContextType = {
  ordersArray: orderType[];
  setOrdersArray: Dispatch<SetStateAction<orderType[]>>;
  placeOrder: (orderDetails: formType) => void;
};

const orderInitialContext = {
  ordersArray: [],
  setOrdersArray: () => {},
  placeOrder: () => {},
};

export const OrderContext =
  createContext<orderContextType>(orderInitialContext);

const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInitialOrderState = (): orderType[] => {
    const ORDERS = localStorage.getItem("orders");
    return ORDERS ? JSON.parse(ORDERS) : [];
  };

  const [ordersArray, setOrdersArray] = useState<orderType[]>(() =>
    getInitialOrderState()
  );
  const { shoppingArray, shoppingPrice, setShoppingArray } =
    useContext(ShoppingContext);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(ordersArray));
  }, [ordersArray]);

  const getQuantity = () =>
    shoppingArray.reduce((total, item) => total + item.quantity, 0);

  const placeOrder = (orderDetails: formType) => {
    if (shoppingArray.length > 0) {
      const newOrder: orderType = {
        id: uuidv4(),
        quantity: getQuantity(),
        price: shoppingPrice,
        status: "In Progress",
        form: orderDetails,
      };
      setOrdersArray((prevState) => [...prevState, newOrder]);
      setShoppingArray([]);
      console.log(newOrder);
    }
    navigate(ORDERS_ROUTE);
  };

  return (
    <OrderContext.Provider value={{ ordersArray, setOrdersArray, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
