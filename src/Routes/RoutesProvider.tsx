import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UsersProvider";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDER_DETAILS_ROUTE,
  ORDERS_ROUTE,
  REGISTER_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../data/routes";
import BookDescription from "../pages/BookDescription.page";
import EditOrderDescription from "../pages/EditOrderDescription.page";
import Homepage from "../pages/Home.page";
import Login from "../pages/Login.page";
import NotFound from "../pages/NotFound.page";
import Orders from "../pages/Orders.page";
import OrdersDescription from "../pages/OrdersDescription.page";
import Register from "../pages/Register.page";
import ShoppingCart from "../pages/ShoppingCart.page";

const RoutesProvider = () => {
  const { currentUser, isUserLogged } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && window.location.pathname === "/Orders") {
      navigate(LOGIN_ROUTE);
    }
  }, [currentUser, navigate]);

  console.log("bla bla bla", isUserLogged);

  return (
    <Routes>
      <Route path={HOME_PAGE_ROUTE} element={<Homepage />} />
      <Route path={SHOPPING_CART_ROUTE} element={<ShoppingCart />} />
      {currentUser ? <Route path={ORDERS_ROUTE} element={<Orders />} /> : null}
      {currentUser ? (
        <Route path={ORDER_DETAILS_ROUTE} element={<OrdersDescription />} />
      ) : null}
      <Route path="*" element={<NotFound />} />
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
