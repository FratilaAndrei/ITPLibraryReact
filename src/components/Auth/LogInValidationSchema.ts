import * as Yup from "yup";
const passwordRules = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,10}$/;

export const LOG_IN_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});
