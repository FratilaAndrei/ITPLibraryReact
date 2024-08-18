import { BOOKS_ROWS } from "../../../common/data/constants";
import { BookRowType, BookType } from "../../../types/type";
import Book from "./Book";

const BooksSection = () => {
  const BookRow = BOOKS_ROWS.map((bookRow: BookRowType) => {
    if (bookRow.books.length === 0) return null;

    return (
      <div className="h-fit xl:px-10  flex flex-col gap-y-6" key={bookRow.id}>
        <div className="w-full">
          <div className="py-12 font-roboto text-2xl text-center md:text-start font-normal fullHd:text-[24px] text-normal-black-color">
            {bookRow.title}
          </div>
          <div className="flex flex-wrap lg:flex-nowrap md:gap-8 lg:gap-y-0 space-y-12 md:space-y-0 mx-auto fullHd:py-8 justify-center fullHd:-my-8 fullHd:max-w-full gap-x-8 fullHd:space-x-3 h-fit">
            {bookRow.books.map((book: BookType) => (
              <Book book={book} key={book.id} />
            ))}
          </div>
        </div>
      </div>
    );
  });

  return <div>{BookRow}</div>;
};

export default BooksSection;
