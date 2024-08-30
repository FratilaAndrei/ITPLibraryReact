import { FC, useContext } from "react";
import ButtonGroup from "../../common/components/ButtonGroup";
import ShoppingItem from "../../components/ShoppingItem";
import { ShoppingContext } from "../../contexts/ShoppingContext";
import { HOME_PAGE_ROUTE, ORDER_DETAILS_ROUTE } from "../../data/routes";
import { ButtonGroupType } from "../../data/types/type";

const ShoppingCart: FC = () => {
  const {
    shoppingArray,
    shoppingPrice,
    incrementQuantity,
    decrementQuantity,
    handleRemoveItem,
  } = useContext(ShoppingContext);

  const navigationButtons: ButtonGroupType[] = [
    {
      id: 1,
      label: "Continue Shopping",
      link: HOME_PAGE_ROUTE,
      className: "bg-white",
    },
    {
      id: 2,
      label: "Place Order",
      link: ORDER_DETAILS_ROUTE,
      className: "text-white",
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </h2>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
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
        <ButtonGroup buttonGroup={navigationButtons} />
      </div>
    </div>
  );
};

export default ShoppingCart;
