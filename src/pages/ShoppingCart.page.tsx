import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import ShoppingCartContainer from "../containers/ShoppingCart/ShoppingCartContainer";

const ShoppingCart = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <ShoppingCartContainer />
      <Footer />
    </div>
  );
};

export default ShoppingCart;
