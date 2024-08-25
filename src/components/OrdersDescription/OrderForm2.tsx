import { Field, Formik } from "formik";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SHOPPING_CART_ROUTE } from "../../data/routes";
import BillingAdressInputs from "./Form/BillingAdressInputs";
import ContactDetails from "./Form/ContactDetails";
import DeliveryAdress from "./Form/DeliveryAdress";
import {
  initialValues,
  OrderFormValidationSchema,
} from "./OrderFormValidationSchema";

const OrderForm2 = () => {
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
  const formStorage = localStorage.getItem("order-form");
  const formStorageArray = formStorage ? JSON.parse(formStorage) : [];
  const [formResult, setFormResult] = useState(formStorageArray);
  const updateFormArray = (updateForm: any) => {
    localStorage.setItem("order-form", JSON.stringify(updateForm));
    setFormResult(updateForm);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderFormValidationSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={(values, actions) => {
        if (!values.showDelivery) {
          values.deliveryAddress = values.billingAddress;
          values.deliveryCity = values.billingCity;
          values.deliveryPhone = values.billingPhone;
        }
        const formData = JSON.stringify(values, null, 2);
        const formDataObject = JSON.parse(formData);
        alert(formData);
        actions.setSubmitting(false);
        setFormResult(formDataObject);
        updateFormArray(formDataObject);
        console.log(formDataObject);
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
            className="w-full border mt-16 fullHd:space-y-1.5 md:mt-0 border-border-color rounded-[4px] p-4 fullHd:px-10 xl:p-8 xl:my-4 xl:w-3/4 fullHd:w-2/5 flex flex-col gap-y-8 fullHd:mr-20 text-order-input"
          >
            <div className="text-2xl xl:text-3xl text-important-black-color fullHd:text-[38px] font-semibold font-lora">
              Order Details
            </div>
            <ContactDetails />
            <BillingAdressInputs />
            <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                name="delivery"
                onChange={handleCheckboxChange}
                onClick={() => setIsDeliveryVisible((prev) => !prev)}
              />
              <label htmlFor="delivery">Use Address for delivery</label>
            </div>
            {isDeliveryVisible && <DeliveryAdress />}
            <div
              role="group"
              aria-labelledby="paymentType-group"
              className="flex gap-x-2 items-center"
            >
              <label className="flex gap-x-2">
                <Field
                  type="radio"
                  name="paymentType"
                  value="Online"
                  checked={props.values.paymentType === "Online"}
                />
                Online
              </label>
              <label className="flex gap-x-2">
                <Field type="radio" name="paymentType" value="Cash" />
                Cash
              </label>
            </div>
            <div>
              <label htmlFor="buttondisplay" className="font-bold block mb-2">
                Delivery Date
              </label>
              <Calendar
                id="buttondisplay"
                value={props.values.deliveryDate}
                onChange={(e) => props.setFieldValue("deliveryDate", e.value)}
                name="deliveryDate"
                showIcon
                className="w-full border border-border-color p-2"
                placeholder="Delivery Date"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
              <Link
                to={SHOPPING_CART_ROUTE}
                className=" ITPbutton bg-white text-black flex items-center justify-center"
              >
                <button>Cancel Order</button>
              </Link>
              <button
                className="ITPbutton text-white bg-black flex items-center justify-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default OrderForm2;
