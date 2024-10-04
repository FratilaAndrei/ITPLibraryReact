import { FC } from "react";
import { bookModel2, BookRowModel } from "../../data/types/type";
import Book from "./Book";

type Props = {
  bookRow: BookRowModel;
};
const BooksSection: FC<Props> = ({ bookRow }) => {
  // const { books, error } = useSelector((state: RootState) => state.books);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!books || books.length === 0) return <p>No books available.</p>;

  return (
    <div className="h-fit xl:px-10  flex flex-col gap-y-6" key={bookRow.id}>
      <div className="w-full">
        <div className="py-12 font-roboto text-2xl text-center md:text-start font-normal fullHd:text-[24px] text-normal-black-color">
          {bookRow.title}
        </div>
        <div className="flex flex-wrap lg:flex-nowrap md:gap-8 lg:gap-y-0 space-y-12 md:space-y-0 mx-auto fullHd:py-8 justify-center fullHd:-my-8 fullHd:max-w-full gap-x-8 fullHd:space-x-3 h-fit">
          {bookRow.books.map((book: bookModel2) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksSection;
