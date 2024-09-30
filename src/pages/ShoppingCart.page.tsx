import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import ShoppingCartContainer from "../containers/ShoppingCart/ShoppingCartContainer";

const ShoppingCart = () => {
  return (
    // <PageTemplate>
    //   <ShoppingCartContainer />
    // </PageTemplate>

    <div className="md:h-screen flex flex-col justify-between ">
      <div className="h-4/5">
        <Navbar className="relative" />
        <ShoppingCartContainer />
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
