import { FC, useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiHouse, PiTruck } from "react-icons/pi";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import { UserContext } from "../../../contexts/UsersProvider";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import NavLink from "./NavLink";
import SidebarMenu from "./SidebarMenu";

type Props = {
  className?: string;
};

const lngs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
  fr: { nativeName: "French" },
};

const Navbar: FC<Props> = ({ className }) => {
  const { currentUser, loading, logOut } = useContext(UserContext);
  const [isAccountMenuOpened, setIsAccountMenuOpened] = useState(false);

  const { i18n } = useTranslation();

  return (
    <nav
      className={` ${className} bg-white h-[56px] fixed  z-50 w-full flex fullHd:px-28 items-center justify-between fullHd:h-[72px] `}
    >
      <ul className="flex  items-center font-medium font-lora text-xl fullHd:text-[28px] ">
        <Link to={HOME_PAGE_ROUTE} className="flex items-center">
          <img
            src={logoImage}
            alt="logo-img"
            className="h-[55px] width-[70px]"
          />
          <li className="">ITP Library</li>
        </Link>
      </ul>
      <ul className="hidden sm:flex  uppercase font-medium text-sm gap-x-2 font-roboto pr-4 fullHd:text-base fullHd:gap-x-12 fullHd:pr-8">
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{ fontWeight: i18n.language === lng ? 700 : 400 }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}

        <NavLink link={HOME_PAGE_ROUTE} icon={<PiHouse />}>
          <Trans i18nKey={"navbar.home"}>Home</Trans>
        </NavLink>
        <NavLink link={SHOPPING_CART_ROUTE} icon={<CiShoppingCart />}>
          <Trans i18nKey={"navbar.shoppingCart"}>Shopping Cart</Trans>
        </NavLink>
        {currentUser ? (
          <NavLink link={ORDERS_ROUTE} icon={<PiTruck />}>
            <Trans i18nKey={"navbar.orders"}>Orders</Trans>
          </NavLink>
        ) : null}
        {loading ? (
          <div>Loading...</div>
        ) : currentUser ? (
          <>
            <div
              onMouseEnter={() => setIsAccountMenuOpened(true)}
              onMouseLeave={() => setIsAccountMenuOpened(false)}
              className=""
            >
              <div className="relative">{currentUser.email?.split("@")[0]}</div>
              {isAccountMenuOpened ? (
                <div className="absolute bg-white lowercase rounded-xl shadow-lg rounded-t-none flex flex-col gap-y-2 px-4 py-4">
                  <div>{currentUser.email}</div>
                  <div className="first-letter:uppercase">
                    <Trans i18nKey={"accountMenu.showProfile"} />
                  </div>
                  <button
                    onClick={logOut}
                    className="cursor-pointer bg-slate-300/20 rounded-lg px-4"
                  >
                    <Trans i18nKey={"accountMenu.logOut"} />
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <NavLink link={LOGIN_ROUTE} icon={<IoPersonOutline />}>
            <Trans i18nKey={"navbar.logIn"}>Log In</Trans>
          </NavLink>
        )}
      </ul>
      <SidebarMenu />
    </nav>
  );
};

export default Navbar;
