import { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiHouse, PiTruck } from "react-icons/pi";
import logoImage from "../../../assets/images/logo.png";
import { UserContext } from "../../../contexts/UsersProvider";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import NavLink from "./NavLink";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { currentUser, loading, logOut } = useContext(UserContext);
  const [isAccountMenuOpened, setIsAccountMenuOpened] = useState(false);

  return (
    <nav className="bg-white h-[56px] fixed z-50 w-full flex fullHd:px-28 items-center justify-between fullHd:h-[72px]">
      <ul className="flex  items-center font-medium font-lora text-xl fullHd:text-[28px] ">
        <img src={logoImage} alt="logo-img" className="h-[55px] width-[70px]" />
        <li className="">ITP Library</li>
      </ul>
      <ul className="hidden sm:flex  uppercase font-medium text-sm gap-x-2 font-roboto pr-4 fullHd:text-base fullHd:gap-x-12 fullHd:pr-8">
        <NavLink link={HOME_PAGE_ROUTE} icon={<PiHouse />}>
          Home
        </NavLink>
        <NavLink link={SHOPPING_CART_ROUTE} icon={<CiShoppingCart />}>
          Shopping Cart
        </NavLink>
        <NavLink link={ORDERS_ROUTE} icon={<PiTruck />}>
          Orders
        </NavLink>
        {loading ? (
          <div>Loading...</div>
        ) : currentUser ? (
          <>
            <div
              onMouseEnter={() => setIsAccountMenuOpened(true)}
              onMouseLeave={() => setIsAccountMenuOpened(false)}
            >
              <div className="relative">{currentUser.email?.split("@")[0]}</div>
              {isAccountMenuOpened ? (
                <div className="absolute bg-white shadow-lg rounded-xl py-4 px-4">
                  <div>{currentUser.email}</div>
                  <div onClick={logOut} className="cursor-pointer">
                    Log Out
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <NavLink link={LOGIN_ROUTE} icon={<IoPersonOutline />}>
            Login
          </NavLink>
        )}
      </ul>
      <Sidebar />
    </nav>
  );
};

export default Navbar;
