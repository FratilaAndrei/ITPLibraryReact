import { Route, Routes } from "react-router-dom";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDER_DETAILS_ROUTE,
  ORDERS_ROUTE,
  REGISTER_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import BookDescription from "../../../pages/BookDescription.page";
import EditOrderDescription from "../../../pages/EditOrderDescription.page";
import Homepage from "../../../pages/Home.page";
import Login from "../../../pages/Login.page";
import Orders from "../../../pages/Orders.page";
import OrdersDescription from "../../../pages/OrdersDescription.page";
import Register from "../../../pages/Register.page";
import ShoppingCart from "../../../pages/ShoppingCart.page";

const RoutesProvider = () => {
  return (
    <Routes>
      {/* {ROUTES.map((route: RoutesType) => {
        return (
          <Route path={route.path} element={<route.name />} key={route.id} />
        );
      })} */}
      <Route path={HOME_PAGE_ROUTE} element={<Homepage />} />
      <Route path={SHOPPING_CART_ROUTE} element={<ShoppingCart />} />
      <Route path={ORDERS_ROUTE} element={<Orders />} />
      <Route path={ORDER_DETAILS_ROUTE} element={<OrdersDescription />} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTER_ROUTE} element={<Register />} />
      <Route path="/book/:id" element={<BookDescription />} />
      <Route
        path={`${ORDER_DETAILS_ROUTE}/edit/:id`}
        element={<EditOrderDescription />}
      />
    </Routes>
  );
};

export default RoutesProvider;
