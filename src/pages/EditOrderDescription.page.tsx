import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";
import EditOrderDetails from "../containers/OrdersDescription/EditOrderDetails";
const EditOrderDescription = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen fullHd:h-screen">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="lg:flex md:my-8 md:gap-x-12 lg:mx-6 items-center xl:mx-auto xl:w-[90%] 2xl:w-4/5 h-full">
        <OrdersDescriptionHero />
        <EditOrderDetails />
      </div>
      <Footer hasIcon />
    </div>
  );
};

export default EditOrderDescription;
