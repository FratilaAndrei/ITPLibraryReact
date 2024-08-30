import { createContext, FC, PropsWithChildren, useEffect } from "react";
import { BookType } from "../data/types/type";

export type orderContextType = {
  ordersArray: BookType[];
};

const orderInitialContext = {
  ordersArray: [],
};

export const OrderContext =
  createContext<orderContextType>(orderInitialContext);

// const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);

// const [formResult, setFormResult] = useState(formStorageArray);
// const updateFormArray = (updateForm: typeof initialValues) => {
//   localStorage.setItem("order-form", JSON.stringify(updateForm));
//   setFormResult(updateForm);
// };

const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInitialOrders = () => {
    const ORDERS_STORAGE = localStorage.getItem("orders");
    return ORDERS_STORAGE ? JSON.parse(ORDERS_STORAGE) : [];
  };

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(ordersArray));
  }, [ordersArray]);

  return (
    <OrderContext.Provider value={{ ordersArray }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
