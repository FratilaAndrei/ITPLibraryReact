import { Message } from "primereact/message";
import { useSelector } from "react-redux";
import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import BooksSectionsContainer from "../containers/Home/BooksSectionsContainer";
import Hero from "../containers/Home/Hero";
import { RootState } from "../state/store";

const Homepage = () => {
  // const { showAddedPopup, lastAddedBook } = useContext(ShoppingContext);
  const lastAddedBook = useSelector(
    (state: RootState) => state.shoppingCart.lastAddedBook
  );

  const showPopup = useSelector(
    (state: RootState) => state.shoppingCart.showPopup
  );

  return (
    <div className="flex flex-col h-full justify-between space-y-14">
      <Navbar />
      <div className="flex flex-col mx-4 fullHd:mx-6">
        <Hero />
        <BooksSectionsContainer />
        {showPopup ? (
          <Message
            text={`${lastAddedBook?.title} added to cart`}
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
