import { Message } from "primereact/message";
import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingItem from "../../components/ShoppingItem";
import { ShoppingContext } from "../../contexts/ShoppingContext";
import { HOME_PAGE_ROUTE, ORDER_DETAILS_ROUTE } from "../../data/routes";

const ShoppingCart: FC = () => {
  const {
    shoppingArray,
    shoppingPrice,
    incrementQuantity,
    decrementQuantity,
    handleRemoveItem,
  } = useContext(ShoppingContext);

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSwitchToForm = () => {
    if (shoppingArray.length > 0) {
      navigate(ORDER_DETAILS_ROUTE);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col relative w-full gap-y-4 ">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </h2>
        <div className="flexflex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
          <ShoppingItem
            shoppingArray={shoppingArray}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
      <div className="card flex flex-col gap-y-4 w-full md:justify-between fullHd:gap-y-12">
        <div className="flex justify-between w-full gap-y-4 font-bold text-lg fullHd:text-3xl">
          <div className="font-lora">Total:</div>
          <div className="font-roboto text-beige-color">${shoppingPrice}</div>
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
          <Link
            to={HOME_PAGE_ROUTE}
            className=" ITPbutton bg-white text-black flex items-center justify-center"
          >
            <button>Continue Shopping</button>
          </Link>
          <button
            className="ITPbutton text-white bg-black flex items-center justify-center"
            onClick={handleSwitchToForm}
          >
            Place Order
          </button>
          {showError ? (
            <Message
              severity="error"
              text="Your cart is empty. Please add items to your cart before placing an order."
              className="absolute top-1/4 right-1/2 translate-x-1/2"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
