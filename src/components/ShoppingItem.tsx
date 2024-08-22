import { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BookType } from "../data/types/type";

type Props = {
  shoppingArray: BookType[];
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  handleRemoveItem: (id: number) => void;
};

const ShoppingItem: FC<Props> = ({
  shoppingArray,
  incrementQuantity,
  decrementQuantity,
  handleRemoveItem,
}) => {
  return shoppingArray?.map((item: BookType, index: number) => {
    return (
      <div key={item.id}>
        <div className="card flex flex-col items-center md:flex-row md:w-full md:items-start md:justify-between">
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
                <span className=" mb-5 flex items-center gap-x-2">
                  <div
                    onClick={() => incrementQuantity(item.id)}
                    className="cursor-pointer"
                  >
                    <FaPlus />
                  </div>
                  <div className="font-bold text-4xl">{item.quantity}</div>
                  <div
                    onClick={() => decrementQuantity(item.id)}
                    className="cursor-pointer"
                  >
                    <FaMinus />
                  </div>
                </span>
              </div>
            </div>
            <div
              className="flex gap-x-2 items-center cursor-pointer"
              onClick={() => handleRemoveItem(item.id)}
            >
              <IoTrashOutline />
              <span className="text-base fullHd:text-xl text-black">
                Remove
              </span>
            </div>
          </div>
        </div>
        {index != shoppingArray.length - 1 && (
          <div className="h-[1px] w-full bg-border-color my-8" key={index} />
        )}
      </div>
    );
  });
};

export default ShoppingItem;
