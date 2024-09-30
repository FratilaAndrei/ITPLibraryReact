import { Message } from "primereact/message";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ITPButton from "../../components/common/ITPButton";
import ShoppingItem from "../../components/ShoppingItem";
import { HOME_PAGE_ROUTE, ORDER_DETAILS_ROUTE } from "../../data/routes";
import { getShoppingPrice } from "../../features/shoppingCart/ShoppingCartSlice";
import { RootState } from "../../state/store";

const ShoppingCart: FC = () => {
  const dispatch = useDispatch();
  const shoppingArray = useSelector(
    (state: RootState) => state.shoppingCart.items
  );
  const shoppingPrice = useSelector(
    (state: RootState) => state.shoppingCart.shoppingPrice
  );
  useEffect(() => {
    dispatch(getShoppingPrice());
  }, [dispatch, shoppingArray]);

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
    <div className="flex flex-col h-full gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col relative w-full gap-y-4 h-[85%] ">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </h2>
        {/* <div className="flexflex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4"> */}
        <div className="flex flex-col md:max-h-[90%] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
          <ShoppingItem />
        </div>
      </div>
      <div className="card flex flex-col gap-y-4 w-full md:justify-between fullHd:gap-y-0">
        <div className="flex justify-between w-full gap-y-4 font-bold text-lg fullHd:text-3xl">
          <div className="font-lora">Total:</div>
          <div className="font-roboto text-beige-color">${shoppingPrice}</div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-y-4 md:gap-y-0 justify-between">
          {/* <button>Continue Shopping</button> */}
          <ITPButton className="md:w-[15%] bg-white text-black border border-black">
            <Link to={HOME_PAGE_ROUTE}>Continue Shopping</Link>
          </ITPButton>
          <ITPButton
            className=" md:w-[15%] text-white bg-black"
            onClick={handleSwitchToForm}
          >
            Place Order
          </ITPButton>
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
