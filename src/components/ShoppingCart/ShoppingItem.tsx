import { FC } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BookType } from "../../types/type";

const ShoppingItem: FC = () => {
  const SHOPPING_STORAGE = localStorage.getItem("shopping-cart");
  const SHOPPING_STORAGE_ARRAY =
    SHOPPING_STORAGE && JSON.parse(SHOPPING_STORAGE);

  const handleRemoveItem = () => {
    localStorage.removeItem("shopping-cart");
  };

  return SHOPPING_STORAGE_ARRAY?.map((item: BookType, index: number) => {
    return (
      <div>
        <div
          className="card flex flex-col items-center md:flex-row md:w-full md:items-start md:justify-between"
          key={item.id}
        >
          <div className="flex flex-col md:flex-row gap-x-4">
            <div className="md:w-[92px] md:h-[132px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:flex justify-between mt-2 md:mt-0">
              <div className="flex flex-col items-center md:items-start gap-y-2 md:gap-y-0">
                <div className="font-lora font-bold text-xl text-center">
                  {item.title}
                </div>
                <div className="flex gap-x-2 items-center font-roboto">
                  <span>by</span>
                  <div className="font-bold text-lg ">{item.author}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-x-2 items-center font-roboto md:items-end">
            <div className="text-beige-color font-bold fullHd:text-3xl text-lg">
              ${item.price}
            </div>
            <div>
              <div className="card flex flex-column align-items-center">
                <span className="font-bold text-4xl mb-5">{item.quantity}</span>
              </div>
            </div>
            <div
              className="flex gap-x-2 items-center cursor-pointer"
              onClick={handleRemoveItem}
            >
              <IoTrashOutline />
              <span className="text-base fullHd:text-xl text-black">
                Remove
              </span>
            </div>
          </div>
        </div>
        {index != SHOPPING_STORAGE_ARRAY.length - 1 && (
          <div className="h-[1px] w-full bg-border-color my-8" />
        )}
      </div>
    );
  });
};

export default ShoppingItem;
