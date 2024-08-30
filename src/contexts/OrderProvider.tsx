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
  editForm: (orderId: string, updatedForm: formType) => void;
  handleShipment: (order: string) => void;
};

const orderInitialContext = {
  ordersArray: [],
  setOrdersArray: () => {},
  placeOrder: () => {},
  editForm: () => {},
  handleShipment: () => {},
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

  const editForm = (orderId: string, updatedForm: formType) => {
    setOrdersArray((prevState) => {
      return prevState.map((order: orderType) => {
        return order.id === orderId ? { ...order, form: updatedForm } : order;
      });
    });
    navigate(ORDERS_ROUTE);
  };

  const handleShipment = (orderId: string) => {
    setOrdersArray((prevState) => {
      return prevState.map((order: orderType) => {
        return order.id === orderId ? { ...order, status: "Completed" } : order;
      });
    });
  };

  return (
    <OrderContext.Provider
      value={{
        ordersArray,
        setOrdersArray,
        placeOrder,
        editForm,
        handleShipment,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
