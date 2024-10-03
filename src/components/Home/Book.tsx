import { Skeleton } from "primereact/skeleton";
import { FC } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookModel2 } from "../../data/types/type";
import {
  addBookCounter,
  handleAddToCart,
} from "../../features/shoppingCart/ShoppingCartSlice";
import { RootState } from "../../state/store";
import ITPButton from "../common/ITPButton";

type Props = {
  book: bookModel2;
};

const Book: FC<Props> = ({ book }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.books.loading);

  return (
    <div
      className="flex flex-col w-full md:w-[30%] lg:w-fit xl:w-[229px] justify-between  px-8   md:px-0 "
      key={book.id}
    >
      {loading ? (
        <Skeleton pt={{ root: { style: { height: "300px" } } }} />
      ) : (
        <>
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
          <ITPButton
            className="bg-black text-white"
            onClick={() =>
              dispatch(handleAddToCart(book), dispatch(addBookCounter()))
            }
          >
            <FaShoppingCart />
            <div>Add to Cart</div>
          </ITPButton>
        </>
      )}
    </div>
  );
};

export default Book;
