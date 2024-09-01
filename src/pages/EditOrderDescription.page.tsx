import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";
import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";
import EditOrderForm from "../containers/OrdersDescription/EditOrderForm";
const EditOrderDescription = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <div className="flex">
        <OrdersDescriptionHero />
        <EditOrderForm />
      </div>
      <Footer />
    </div>
  );
};

export default EditOrderDescription;
