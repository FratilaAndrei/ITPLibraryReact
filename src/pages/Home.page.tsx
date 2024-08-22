import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import BooksSectionsContainer from "../containers/Home/BooksSectionsContainer";
import Hero from "../containers/Home/Hero";

const Homepage = () => {
  return (
    <div className="flex flex-col h-full justify-between space-y-14 ">
      <Navbar />
      <div className="flex flex-col mx-4 fullHd:mx-6">
        <Hero />
        <BooksSectionsContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
