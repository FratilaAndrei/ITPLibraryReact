import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed sm:hidden top-0 right-0 w-2/5 bg-white shadow-md shadow-modal-background gap-y-2 rounded-bl-lg py-4 pl-4 flex flex-col ">
      <Link to="/">Home</Link>
      <Link to="/ShoppingCart">Shopping Cart</Link>
      <Link to="/Orders">Orders</Link>
      <Link to="/Login">Login</Link>
    </div>
  );
};

export default Sidebar;
