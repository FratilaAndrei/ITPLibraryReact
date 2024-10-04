import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleShipment } from "./features/ordersList/ordersListSlice";
import {
  hidePopup,
  resetAddedBookCounter,
} from "./features/shoppingCart/ShoppingCartSlice";
import RoutesProvider from "./Routes/RoutesProvider";
import { RootState } from "./state/store";

function App() {
  const dispatch = useDispatch();

  const ordersList = useSelector(
    (state: RootState) => state.ordersList.ordersList
  );

  const showPopup = useSelector(
    (state: RootState) => state.shoppingCart.showPopup
  );

  useEffect(() => {
    dispatch(resetAddedBookCounter());
    if (showPopup) {
      const timer = setTimeout(() => {
        dispatch(hidePopup());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      ordersList.forEach((order) => dispatch(handleShipment(order)));
    }, 15000);

    return () => clearInterval(interval);
  }, [ordersList, dispatch]);
  return <RoutesProvider />;
}

export default App;
