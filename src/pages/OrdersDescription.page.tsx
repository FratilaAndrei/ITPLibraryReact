import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import OrderDetails from "../components/OrdersDescription/OrderDetails";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";

const OrdersDescription = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="flex my-12 ">
        <OrdersDescriptionHero />
        <OrderDetails />
      </div>
      <Footer />
    </div>
  );
};

export default OrdersDescription;
