import { Message } from "primereact/message";
import { useContext } from "react";
import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import BooksSectionsContainer from "../containers/Home/BooksSectionsContainer";
import Hero from "../containers/Home/Hero";
import { ShoppingContext } from "../contexts/ShoppingContext";

const Homepage = () => {
  const { showAddedPopup } = useContext(ShoppingContext);
  return (
    <div className="flex flex-col h-full justify-between space-y-14">
      <Navbar />
      <div className="flex flex-col mx-4 fullHd:mx-6">
        <Hero />
        <BooksSectionsContainer />
        {showAddedPopup ? (
          <Message
            text="Book Added"
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
