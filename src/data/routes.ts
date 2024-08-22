import Homepage from "../pages/Home.page";
import Login from "../pages/Login.page";
import Orders from "../pages/Orders.page";
import OrdersDescription from "../pages/OrdersDescription.page";
import ShoppingCart from "../pages/ShoppingCart.page";
import { RoutesType } from "./types/type";

export const HOME_PAGE_ROUTE = "/";
export const SHOPPING_CART_ROUTE = "/ShoppingCart";
export const ORDERS_ROUTE = "/Orders";
export const ORDER_DETAILS_ROUTE = "/Orders/Details";
export const LOGIN_ROUTE = "/Login";
export const SIGNUP_ROUTE = "/Signup";
export const BOOKS_ROUTE = "/Books";
export const BOOK_ROUTE = "/Books/:bookId";

export const ROUTES: RoutesType[] = [
  {
    id: 1,
    path: HOME_PAGE_ROUTE,
    name: Homepage,
  },
  {
    id: 2,
    path: SHOPPING_CART_ROUTE,
    name: ShoppingCart,
  },
  {
    id: 3,
    path: ORDERS_ROUTE,
    name: Orders,
  },
  {
    id: 4,
    path: ORDER_DETAILS_ROUTE,
    name: OrdersDescription,
  },
  {
    id: 5,
    path: LOGIN_ROUTE,
    name: Login,
  },
];
