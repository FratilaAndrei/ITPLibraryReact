import { Message } from "primereact/message";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import BooksSectionsContainer from "../containers/Home/BooksSectionsContainer";
import Hero from "../containers/Home/Hero";
import { RootState } from "../state/store";

const Homepage = () => {
  const lastAddedBook = useSelector(
    (state: RootState) => state.shoppingCart.lastAddedBook
  );

  const showPopup = useSelector(
    (state: RootState) => state.shoppingCart.showPopup
  );

  const addedBookCounter = useSelector(
    (state: RootState) => state.shoppingCart.bookAddedCount
  );

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(resetAddedBookCounter());
  //   if (showPopup) {
  //     const timer = setTimeout(() => {
  //       dispatch(hidePopup());
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showPopup, dispatch, lastAddedBook]);

  return (
    <div className="flex flex-col h-full justify-between space-y-14">
      <Navbar />
      <div className="flex flex-col mx-4 fullHd:mx-6">
        <Hero />
        <BooksSectionsContainer />
        {showPopup ? (
          <Message
            text={`${lastAddedBook?.title} added to cart ${addedBookCounter}`}
            severity="success"
            className="fixed top-6 right-1/2 translate-x-1/2 z-50"
          />
        ) : null}
      </div>
      <Footer hasIcon />
    </div>
  );
};

export default Homepage;
