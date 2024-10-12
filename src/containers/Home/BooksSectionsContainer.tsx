import { useQuery } from "react-query";
import BooksSection from "../../components/Home/BooksSection";
import { BookRowModel } from "../../data/types/type";
import { getBooksData } from "../../services/books.service";

const BooksSectionsContainer = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooksData,
    staleTime: 1000 * 60 * 60, // an hour because its not changing that often it shouldnt trigger a refresh
    cacheTime: 1000 * 60 * 60, // 30 minute cache time before carbage collection and refresh will be triggered
    refetchOnWindowFocus: false, // it shouldnt trigger a refresh if the window is focused
  });

  if (error) {
    console.error("Error fetching books with query:", error);
    return <div>Failed Fetching Books</div>;
  }

  if (isLoading) {
    return <div>Se Incarca</div>;
  }

  if (!books) return <div>No books Were Found</div>;
  const bestBooks = books.filter((book) => book.isBestBook);
  const mostRecentBooks = books.slice(-6);

  const BOOKS_ROWS_2 = [
    {
      id: 1,
      title: "Best Books of the Month",
      books: bestBooks,
    },
    {
      id: 2,
      title: "Recently Added",
      books: mostRecentBooks,
    },
  ];

  return (
    <div className="container -mt-28 mx-auto w-full fullHd:w-11/12 z-10 bg-white-color">
      {BOOKS_ROWS_2.map((bookRow: BookRowModel) => {
        if (bookRow.books.length === 0) return null;
        return <BooksSection bookRow={bookRow} key={bookRow.id} />;
      })}
    </div>
  );
};

export default BooksSectionsContainer;
