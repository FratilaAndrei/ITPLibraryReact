import { ErrorMessage, Field, Formik } from "formik";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BillingAdressInputs from "../../components/OrdersDescription/Form/BillingAdressInputs";
import ContactDetails from "../../components/OrdersDescription/Form/ContactDetails";
import DeliveryAdress from "../../components/OrdersDescription/Form/DeliveryAdress";
import InputSection from "../../components/OrdersDescription/InputSection";
import { OrderFormValidationSchema } from "../../components/OrdersDescription/OrderFormValidationSchema";
import { ORDERS_ROUTE } from "../../data/routes";
import { orderModelFetchModel } from "../../data/types/type";
import { editForm } from "../../features/ordersList/ordersListSlice";
import { RootState } from "../../state/store";

const EditOrderDetails = () => {
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);

  // const { ordersArray, editForm } = useContext(OrderContext);
  const dispatch = useDispatch();
  const ordersList = useSelector(
    (state: RootState) => state.ordersList.ordersList
  );
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  if (!id) return;
  const order = ordersList.find(
    (order: orderModelFetchModel) => order.id === id
  );
  console.log("Order Found", order);
  // console.log("Status Comanda", order.status);
  if (!order) {
    return <div>form not found</div>;
  }
  const { orderDetails } = order;
  const isCompleted = order.status === "Completed";

  return (
    <Formik
      initialValues={orderDetails}
      validationSchema={OrderFormValidationSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={(values, actions) => {
        if (isDeliveryVisible === false) {
          values.deliveryAddress = values.billingAddress;
          values.deliveryCity = values.billingCity;
          values.deliveryPhone = values.billingPhone;
        }
        dispatch(
          editForm({
            id,
            orderDetails: values,
            totalQuantity: order.totalQuantity,
            totalPrice: order.totalPrice,
            status: order.status,
          })
        );
        navigate(ORDERS_ROUTE);
        actions.setSubmitting(false);
      }}
    >
      {(props) => {
        const handleCheckboxChange = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          props.setFieldValue("showDelivery", e.target.checked);

          if (!e.target.checked) {
            props.setFieldValue("deliveryAddress", props.values.billingAddress);
            props.setFieldValue("deliveryCity", props.values.billingCity);
            props.setFieldValue("deliveryPhone", props.values.billingPhone);
          }
        };

        return (
          <form
            onSubmit={props.handleSubmit}
            className="mx-auto w-[90%] md:w-[75%] lg:w-[70%] border my-8 fullHd:space-y-1.5 md:mt-0 border-border-color rounded p-4 fullHd:px-10 xl:w-1/2  flex flex-col gap-y-8 text-order-input"
          >
            <div className="text-2xl xl:text-3xl text-important-black-color fullHd:text-[38px] font-semibold font-lora">
              Order Details
            </div>
            <ContactDetails isFieldDisabled={isCompleted} />
            <BillingAdressInputs isFieldDisabled={isCompleted} />
            <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                name="delivery"
                onChange={handleCheckboxChange}
                onClick={() => setIsDeliveryVisible((prev) => !prev)}
                disabled={isCompleted}
              />
              <label htmlFor="delivery">Use Address for delivery</label>
            </div>
            {isDeliveryVisible && <DeliveryAdress />}
            <div className="space-y-2">
              <label
                htmlFor="paymentType-group"
                className="mb-2 text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color"
              >
                Payment Type
              </label>
              <div
                className="flex gap-x-2 items-center"
                role="group"
                aria-labelledby="paymentType-group"
              >
                <label className="flex gap-x-2">
                  <Field
                    type="radio"
                    name="paymentType"
                    value="Online"
                    checked={props.values.paymentType === "Online"}
                    disabled={isCompleted}
                  />
                  Online
                </label>
                <label className="flex gap-x-2">
                  <Field
                    type="radio"
                    name="paymentType"
                    value="Cash"
                    disabled={isCompleted}
                  />
                  Cash
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="buttondisplay"
                className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color"
              >
                Delivery Date
              </label>
              <Calendar
                id="buttondisplay"
                value={new Date(props.values.deliveryDate)}
                onChange={(e) => props.setFieldValue("deliveryDate", e.value)}
                name="deliveryDate"
                showIcon
                className="py-1 pl-2 border-border-color rounded font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
                placeholder="Delivery Date"
                readOnlyInput
                disabled={isCompleted}
              />
              <ErrorMessage
                name="deliveryDate"
                component="div"
                className="text-red-500"
              />
            </div>
            <InputTextarea
              autoResize
              value={props.values.observations}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                props.setFieldValue("observations", e.target.value)
              }
              rows={5}
              cols={30}
              placeholder="Observations"
              name="observations"
              className="w-full border border-border-color p-2"
              readOnly={order.status === "Completed" ? true : false}
              disabled={isCompleted}
            />
            <ErrorMessage
              name="observations"
              component="div"
              className="text-red-500"
            />
            {order.status === "In Progress" ? (
              <InputSection
                title="Would you recommand us?"
                option={true}
                optionLabel="Would you recommand us?"
                hasInputFields={false}
              />
            ) : null}
            <div className="mx-auto w-4/5 lg:w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
              <Link
                to={ORDERS_ROUTE}
                className=" ITPbutton bg-white text-black flex items-center justify-center"
              >
                <button>
                  {order.status === "In Progress" ? "Cancel" : "Back"}
                </button>
              </Link>
              {/* {order.status === "In Progress" ? ( */}
              <button
                className="ITPbutton text-white bg-black flex items-center justify-center"
                type="submit"
                disabled={isCompleted}
              >
                Update Order
              </button>
              {/* ) : null} */}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditOrderDetails;
