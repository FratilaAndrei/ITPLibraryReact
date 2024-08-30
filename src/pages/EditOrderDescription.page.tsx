import OrdersDescriptionHero from "../components/OrdersDescription/OrdersDescriptionHero";
import EditOrderForm from "../containers/OrdersDescription/EditOrderForm";
import PageTemplate from "../containers/PageTemplate";
const EditOrderDescription = () => {
  return (
    <PageTemplate>
      <div className="flex">
        <OrdersDescriptionHero />
        <EditOrderForm />
      </div>
    </PageTemplate>
  );
};

export default EditOrderDescription;
