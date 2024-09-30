import * as Yup from "yup";

// const passwordRules = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,30}$/;
const passwordRules =
  /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~`]*$/;

export type registerValuesModel = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const REGISTER_INITIAL_VALUES: registerValuesModel = {
  email: "",
  password: "",
  confirmPassword: "",
};

export type loginInitialModel = {
  email: string;
  password: string;
};

export type userModel = {
  email: string;
  password: string;
};

export type userModelWithId = {
  [key: string]: userModel;
};

export const LOGIN_INITIAL_VALUES: loginInitialModel = {
  email: "",
  password: "",
};

export const SIGN_UP_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, { message: "Password doesnt match rules" })
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
