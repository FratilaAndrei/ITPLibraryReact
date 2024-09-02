import * as Yup from "yup";

export const LOG_IN_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
