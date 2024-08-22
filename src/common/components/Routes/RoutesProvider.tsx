import { Route, Routes } from "react-router-dom";
import {
  HOME_PAGE_ROUTE,
  ORDER_DETAILS_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import Homepage from "../../../pages/Home.page";
import OrdersDescription from "../../../pages/OrdersDescription.page";
import ShoppingCart from "../../../pages/ShoppingCart.page";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE_ROUTE} element={<Homepage />} />
      <Route path={SHOPPING_CART_ROUTE} element={<ShoppingCart />} />
      <Route path={ORDER_DETAILS_ROUTE} element={<OrdersDescription />}></Route>
    </Routes>
  );
};

export default RoutesProvider;
