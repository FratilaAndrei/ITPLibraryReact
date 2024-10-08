import * as Yup from "yup";

const passwordRules = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,10}$/;

export type registerValuesType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const REGISTER_INITIAL_VALUES: registerValuesType = {
  email: "",
  password: "",
  confirmPassword: "",
};

export type loginInitialType = {
  email: string;
  password: string;
};

export const LOGIN_INITIAL_VALUES: loginInitialType = {
  email: "",
  password: "",
};

export const SIGN_UP_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
