import BooksSection from "../../components/Home/BooksSection";
import { BOOKS_ROWS } from "../../data/constants";
import { BookRowModel } from "../../data/types/type";

const BooksSectionsContainer = () => {
  return (
    <div className="container -mt-28 mx-auto w-full fullHd:w-11/12 z-10 bg-white-color">
      {BOOKS_ROWS.map((bookRow: BookRowModel) => {
        if (bookRow.books.length === 0) return null;
        return <BooksSection bookRow={bookRow} key={bookRow.id} />;
      })}
    </div>
  );
};

export default BooksSectionsContainer;
