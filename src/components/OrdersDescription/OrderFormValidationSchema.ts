import * as Yup from "yup";
import { formType } from "../../data/types/type";

const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
export const initialValues: formType = {
  id: "",
  firstName: "",
  lastName: "",
  billingPhone: "",
  billingCity: "Romania",
  billingAddress: "",
  deliveryPhone: "",
  deliveryCity: "Romania",
  deliveryAddress: "",
  showDelivery: false,
  payment: "Online",
  deliveryDate: new Date(),
  observations: "",
  recommended: false,
};

export const OrderFormValidationSchema = Yup.object().shape({
  showDelivery: Yup.boolean(),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  billingCity: Yup.string()
    .oneOf(["Romania", "Germany", "Italy"])
    .required("Billing city is required"),

  deliveryCity: Yup.string()
    .oneOf(["Romania", "Germany", "Italy"])
    .when("showDelivery", {
      is: true,
      then(schema) {
        return schema.required("Delivery city is required");
      },
      otherwise(schema) {
        return schema.notRequired();
      },
    }),

  billingPhone: Yup.string()
    .matches(phoneNumberRegex, "Phone number is not valid")
    .required("Billing phone is required"),

  deliveryPhone: Yup.string().when("showDelivery", {
    is: true,
    then(schema) {
      return schema.required("Delivery phone is required");
    },
    otherwise(schema) {
      return schema.notRequired();
    },
  }),

  billingAddress: Yup.string().required("Billing address is required"),
  deliveryAddress: Yup.string().when("showDelivery", {
    is: true,
    then(schema) {
      return schema.required("Delivery Address is required");
    },
    otherwise(schema) {
      return schema.notRequired();
    },
  }),
  deliveryDate: Yup.date().required("Delivery date is required"),
  observations: Yup.string(),
});
