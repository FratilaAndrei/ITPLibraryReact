import { useState } from "react";
import ButtonGroup from "../../common/components/ButtonGroup";
import ShoppingItem from "../../components/ShoppingItem";
import { HOME_PAGE_ROUTE, ORDER_DETAILS_ROUTE } from "../../data/routes";
import { BookType, ButtonGroupType } from "../../data/types/type";

const BUTTON_CANCEL_PLACE_ORDER_GROUP: ButtonGroupType[] = [
  {
    id: 1,
    label: "Continue Shopping",
    link: HOME_PAGE_ROUTE,
    className: "bg-white text-slate-900",
  },
  {
    id: 2,
    label: "Place Order",
    link: ORDER_DETAILS_ROUTE,
  },
];

const ShoppingCartContainer = () => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  const SHOPPING_STORAGE_ARRAY = SHOPPING_STORAGE
    ? JSON.parse(SHOPPING_STORAGE)
    : [];

  const [shoppingArray, setShoppingArray] = useState<BookType[]>(
    SHOPPING_STORAGE_ARRAY
  );
  const shoppingPrice = shoppingArray.reduce(
    (total: number, item: BookType) => total + item.price * item.quantity,
    0
  );

  const updateShoppingArray = (updatedArray: BookType[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(updatedArray));
    setShoppingArray(updatedArray);
  };

  const incrementQuantity = (id: number) => {
    const updatedArray = [...shoppingArray];
    const book = updatedArray.find((b) => b.id === id);
    if (!book) return;
    book.quantity += 1;
    updateShoppingArray(updatedArray);
  };
  const decrementQuantity = (id: number) => {
    const updatedArray = [...shoppingArray];
    const book = updatedArray.find((b) => b.id === id);
    if (!book) return;
    if (book.quantity > 1) {
      book.quantity -= 1;
      updateShoppingArray(updatedArray);
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedArray = shoppingArray.filter((book) => book.id !== id);
    updateShoppingArray(updatedArray);
  };

  return (
    <div className="flex flex-col items-center gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <div className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your products
        </div>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4 ">
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
        <ButtonGroup buttonGroup={BUTTON_CANCEL_PLACE_ORDER_GROUP} />
      </div>
    </div>
  );
};

export default ShoppingCartContainer;
