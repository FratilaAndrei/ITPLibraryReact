import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiHouse, PiTruck } from "react-icons/pi";
import { UserContext } from "../../../contexts/UsersProvider";
import {
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  SHOPPING_CART_ROUTE,
} from "../../../data/routes";
import NavLink from "./NavLink";
const SidebarMenu = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const { currentUser, logOut } = useContext(UserContext);

  return (
    <>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-3/5 rounded-tl-lg flex flex-col"
        position="right"
        pt={{
          content: {
            className: "flex flex-col justify-between items-center pb-2",
          },
        }}
      >
        <div className="flex flex-col gap-y-4">
          <NavLink link={HOME_PAGE_ROUTE} icon={<PiHouse />}>
            Home
          </NavLink>
          <NavLink link={SHOPPING_CART_ROUTE} icon={<CiShoppingCart />}>
            Shopping Cart
          </NavLink>
          {currentUser ? (
            <>
              <NavLink link={ORDERS_ROUTE} icon={<PiTruck />}>
                Orders
              </NavLink>
              <div className="text-center" onClick={logOut}>
                Sign Out
              </div>
            </>
          ) : null}
        </div>
        {!currentUser ? (
          <NavLink link={LOGIN_ROUTE} icon={<IoPersonOutline />}>
            Login
          </NavLink>
        ) : (
          <div className="bg-slate-100 w-11/12 py-0 rounded-lg text-center text-xl ">
            {currentUser.email?.split("@")[0]}
          </div>
        )}
      </Sidebar>
      <Button
        icon="pi pi-arrow-right"
        className="sm:hidden"
        onClick={() => setVisible(true)}
      />
    </>
  );
};

export default SidebarMenu;
