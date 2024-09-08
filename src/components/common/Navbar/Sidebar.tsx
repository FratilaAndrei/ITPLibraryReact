import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiHouse, PiTruck } from "react-icons/pi";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import NavLink from "./NavLink";

const Sidebar = () => {
  return (
    <div className="fixed sm:hidden top-0 right-0 w-2/5 bg-white shadow-md shadow-modal-background gap-y-2 rounded-bl-lg py-4 pl-4 flex flex-col ">
      <NavLink link={HOME_PAGE_ROUTE} icon={<PiHouse />}>
        Home
      </NavLink>
      <NavLink link={SHOPPING_CART_ROUTE} icon={<CiShoppingCart />}>
        Shopping Cart
      </NavLink>
      <NavLink link={ORDERS_ROUTE} icon={<PiTruck />}>
        Orders
      </NavLink>
      <NavLink link={LOGIN_ROUTE} icon={<IoPersonOutline />}>
        Login
      </NavLink>
    </div>
  );
};

export default Sidebar;
