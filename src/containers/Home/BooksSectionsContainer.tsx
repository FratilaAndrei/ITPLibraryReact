import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BooksSection from "../../components/Home/BooksSection";
import { BookRowModel } from "../../data/types/type";
import { fetchBooksRequest } from "../../features/books/booksSlice";
import { RootState } from "../../state/store";

const BooksSectionsContainer = () => {
  const booksData = useSelector((state: RootState) => state.books.books);
  const bestBooks = booksData.filter((book) => book.isBestBook);

  const dispatch = useDispatch();
  const BOOKS_ROWS_2 = [
    {
      id: 1,
      title: "Best Books of the Month",
      books: bestBooks,
    },
    // {
    //   id: 2,
    //   title: "Recently Added",
    //   books: booksData.slice(-6),
    // },
  ];

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  return (
    <div className="container -mt-28 mx-auto w-full fullHd:w-11/12 z-10 bg-white-color">
      {BOOKS_ROWS_2.map((bookRow: BookRowModel) => {
        console.log(bookRow);
        if (bookRow.books.length === 0) return null;
        return <BooksSection bookRow={bookRow} key={bookRow.id} />;
      })}
    </div>
  );
};

export default BooksSectionsContainer;
