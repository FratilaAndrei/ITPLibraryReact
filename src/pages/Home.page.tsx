import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import Hero from "../components/Home/Hero";

const Homepage = () => {
  return (
    <div className="flex flex-col h-full space-y-14 ">
      <Navbar />
      {/* <div className="h-[56px] fullHd:h-[72px]" /> */}
      <div className="mx-4 fullHd:mx-6 ">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
