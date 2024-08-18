import { useEffect, useState } from "react";
import { BookType } from "../../types/type";
import ShoppingItem from "./ShoppingItem";

const ShoppingCartContainer = () => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  const SHOPPING_STORAGE_ARRAY = SHOPPING_STORAGE
    ? JSON.parse(SHOPPING_STORAGE)
    : [];

  const [shoppingArray, setShoppingArray] = useState<BookType[]>(
    SHOPPING_STORAGE_ARRAY
  );
  const [shoppingPrice, setShoppingPrice] = useState(0);

  const updateShoppingArray = (updatedArray: BookType[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(updatedArray));
    setShoppingArray(updatedArray);
  };

  const incrementQuantity = (index: number) => {
    const updatedArray = [...shoppingArray];
    updatedArray[index].quantity += 1;
    updateShoppingArray(updatedArray);
  };
  const decrementQuantity = (index: number) => {
    const updatedArray = [...shoppingArray];
    if (updatedArray[index].quantity > 1) {
      updatedArray[index].quantity -= 1;
      updateShoppingArray(updatedArray);
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedArray = shoppingArray.filter((_, index) => index !== id);
    updateShoppingArray(updatedArray);
  };

  useEffect(() => {
    if (SHOPPING_STORAGE != null) {
      const totalPrice = SHOPPING_STORAGE_ARRAY.reduce(
        (total: number, item: BookType) => total + item.price * item.quantity,
        0
      );
      setShoppingPrice(totalPrice);
    } else {
      setShoppingPrice(0);
    }
  }, [SHOPPING_STORAGE_ARRAY]);

  return (
    <div className="flex flex-col items-center gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <div className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </div>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 ">
          <ShoppingItem
            shoppingArray={SHOPPING_STORAGE_ARRAY}
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
