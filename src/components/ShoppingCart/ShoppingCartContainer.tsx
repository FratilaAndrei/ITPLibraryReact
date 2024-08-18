import { BookType } from "../../types/type";
import ShoppingItem from "./ShoppingItem";

const ShoppingCartContainer = () => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  const SHOPPING_STORAGE_ARRAY =
    SHOPPING_STORAGE && JSON.parse(SHOPPING_STORAGE);

  const handleTotalPrice =
    SHOPPING_STORAGE != null
      ? SHOPPING_STORAGE_ARRAY.reduce((totalPrice: number, item: BookType) => {
          return totalPrice + item.price * item.quantity;
        }, 0)
      : 0;

  return (
    <div className="flex flex-col items-center gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <div className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </div>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 ">
          <ShoppingItem />
        </div>
      </div>
      <div className="card flex flex-col gap-y-4 w-full md:justify-between fullHd:gap-y-12">
        <div className="flex justify-between w-full gap-y-4 font-bold text-lg fullHd:text-3xl">
          <div className="font-lora">Total:</div>
          <div className="font-roboto text-beige-color">
            ${handleTotalPrice}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
          <button className=" rounded-sm ITPbutton text-black ">
            Continue Shopping
          </button>
          <button className="rounded ITPbutton text-white bg-black ">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartContainer;
