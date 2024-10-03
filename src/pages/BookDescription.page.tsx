import { Message } from "primereact/message";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTemplate from "../containers/PageTemplate";
import { bookModel2 } from "../data/types/type";
import { handleAddToCart } from "../features/shoppingCart/ShoppingCartSlice";
import { RootState } from "../state/store";

const BookDescription = () => {
  const [bookAddedCount, setBookAddedCount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const showPopup = useSelector(
    (state: RootState) => state.shoppingCart.showPopup
  );
  const books = useSelector((state: RootState) => state.books.books);

  // useEffect(() => {
  //   if (showPopup) {
  //     const timer = setTimeout(() => {
  //       dispatch(hidePopup());
  //       setBookAddedCount(0);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showPopup, dispatch]);

  if (!id) {
    return <div>Book ID is missing</div>;
  }

  const book = books.find((book: bookModel2) => book.id === id);
  if (!book) {
    return <div>Book not found</div>;
  }
  const { title, image, author, price, description } = book;

  return (
    <PageTemplate>
      <section className="flex items-center container m-auto xs:w-4/5 md:w-full lg:w-3/4">
        <div className="md:flex md:px-8 lg:px-0 fullHd:p-0 fullHd:h-[90%]">
          <div className="p-8 md:p-0 w-full xl:w-2/5 md:w-3/5 ultraQ:flex ultraQ:justify-center lg:h-96 fullHd:ml-8 fullHd:h-full">
            <img
              src={image}
              alt={title}
              className="h-full w-full md:w-4/5 lg:w-2/3 fullHd:w-[65%] ultraQ:w-1/2"
            />
          </div>
          <div className="px-8 md:p-0 fullHd:h-full md:w-3/5 xl:w-1/2 fullHd:pr-20">
            <div className="flex gap-y-8 flex-col h-full ultraQ:px-20 fullHd:gap-y-12">
              <div className="flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <div className="text-important-black-color font-bold font-lora text-3xl xl:text-4xl fullHd:text-[48px]">
                    {title}
                  </div>
                  <div className="font-roboto font-bold text-3xl fullHd:text-[38px] text-beige-color">
                    ${price}
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="fullHd:text-[20px] font-roboto font-normal text-normal-black-color">
                    by
                  </span>
                  <span className="text-important-black-color font-lora font-bold xl:text-lg fullHd:text-[24px]">
                    {author}
                  </span>
                </div>
              </div>
              <div className="text-normal-black-color font-roboto font-normal xl:text-sm fullHd:text-base">
                {description}
              </div>
              <button
                onClick={() =>
                  dispatch(
                    handleAddToCart(book),
                    setBookAddedCount(bookAddedCount + 1)
                  )
                }
                className="flex items-center justify-center bg-black rounded-[4px] text-white mb-6 md:mb-0 xl:px-8 md:w-1/2 xl:w-2/5 fullHd:w-[32%] xl:py-1.5 fullHd:py-2.5 py-1 gap-x-2"
              >
                <FaShoppingCart />
                <span className="font-lora font-normal xl:text-sm fullHd:text-sm">
                  Add to cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {showPopup ? (
        <div className="absolute top-24 right-1/2 translate-x-1/2">
          <Message
            severity="success"
            text={`${title} added to cart ${bookAddedCount} `}
          />
        </div>
      ) : null}
    </PageTemplate>
  );
};

export default BookDescription;
