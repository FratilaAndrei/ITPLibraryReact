import { Route, Routes } from "react-router-dom";
import Homepage from "../../../pages/Home.page";
import ShoppingCart from "../../../pages/ShoppingCart.page";
import { HOME_PAGE_ROUTE, SHOPPING_CART_ROUTE } from "../../data/routes";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE_ROUTE} element={<Homepage />} />
      <Route path={SHOPPING_CART_ROUTE} element={<ShoppingCart />} />
    </Routes>
  );
};

export default RoutesProvider;
