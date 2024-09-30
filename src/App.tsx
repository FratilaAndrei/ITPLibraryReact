import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleShipment } from "./features/ordersList/ordersListSlice";
import RoutesProvider from "./Routes/RoutesProvider";
import { RootState } from "./state/store";

function App() {
  const dispatch = useDispatch();

  const ordersList = useSelector(
    (state: RootState) => state.ordersList.ordersList
  );

  useEffect(() => {
    const interval = setInterval(() => {
      ordersList.forEach((order) => dispatch(handleShipment(order)));
      console.log("Se updateaza starea");
    }, 6000);

    return () => clearInterval(interval);
  }, [ordersList, dispatch]);
  return <RoutesProvider />;
}

export default App;
