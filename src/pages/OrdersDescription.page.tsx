import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";
import OrdersForm from "../components/OrdersDescription/OrdersForm";

const OrdersDescription = () => {
  return (
    <>
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="flex">
        <OrdersDescriptionHero />
        <OrdersForm />
      </div>
      <Footer />
    </>
  );
};

export default OrdersDescription;
