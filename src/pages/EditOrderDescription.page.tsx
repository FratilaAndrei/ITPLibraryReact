import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";
import EditOrderDetails from "../containers/OrdersDescription/EditOrderDetails";
const EditOrderDescription = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="flex">
        <OrdersDescriptionHero />
        <EditOrderDetails />
      </div>
      <Footer hasIcon />
    </div>
  );
};

export default EditOrderDescription;
