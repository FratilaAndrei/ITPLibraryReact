import { FC } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BookModel } from "../../data/types/type";
import {
  addBookCounter,
  handleAddToCart,
} from "../../features/shoppingCart/ShoppingCartSlice";

type Props = {
  book: BookModel;
};

const Book: FC<Props> = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col w-full md:w-[30%] lg:w-fit xl:w-[229px] justify-between  px-8   md:px-0 "
      key={book.id}
    >
      <Link
        to={`/book/${book.id}`}
        className="flex flex-col h-fit w-full xl:w-fit"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-[70%] fullHd:h-[329px] fullHd:w-[232px] w-full"
        />
        <div className="flex flex-col mt-6 fullHd:pt-0 w-full">
          <div className="flex w-full fullHd:justify-between">
            <div className="w-3/4">
              <div className="text-important-black-color font-lora font-bold text-md carrousel-description-secondary line-clamp-2">
                {book.title}
              </div>
              <div className="text-normal-black-color font-lora font-normal text-xs fullHd:text-sm">
                {book.author}
              </div>
            </div>
            <div className="text-beige-color font-roboto font-bold carrousel-description-secondary">
              {book.price}
            </div>
          </div>
        </div>
      </Link>
      <button
        className="flex justify-center gap-x-2 xl:mt-6 fullHd:mt-14 fullHd:py-2 text-xs bg-black text-white-color items-center py-1.5 rounded-[4px]"
        onClick={() =>
          dispatch(handleAddToCart(book), dispatch(addBookCounter()))
        }
      >
        <FaShoppingCart />
        <div className="font-lora font-normal fullHd:text-sm">Add to Cart</div>
      </button>
    </div>
  );
};

export default Book;
