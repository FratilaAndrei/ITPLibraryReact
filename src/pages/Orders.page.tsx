import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import OrdersList from "../components/OrdersList/OrdersList";

const Orders = () => {
  return (
    <div className="md:h-screen flex flex-col justify-between ">
      <div className="h-4/5">
        <Navbar className="relative" />
        <OrdersList />
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
