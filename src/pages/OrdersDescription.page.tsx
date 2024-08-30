import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import OrderForm2 from "../components/OrdersDescription/OrderForm2";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";

const OrdersDescription = () => {
  return (
    <>
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="flex">
        <OrdersDescriptionHero />
        {/* <FormProvider> */}
        <OrderForm2 />
        {/* </FormProvider> */}
      </div>
      <Footer />
    </>
  );
};

export default OrdersDescription;
