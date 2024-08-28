import { ErrorMessage, Field, Formik } from "formik";
import { Checkbox } from "primereact/checkbox";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RegisterContext } from "../../contexts/RegisterProvider";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "../../data/routes";
import { LOGIN_INITIAL_VALUES } from "./AuthValidationSchema";
import { LOG_IN_SCHEMA } from "./LogInValidationSchema";

const LoginForm = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const { findAccount } = useContext(RegisterContext);

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
        console.log(values);
        findAccount(values);
      }}
      validationSchema={LOG_IN_SCHEMA}
      validateOnChange={false}
    >
      {(props) => (
        <form
          className="fullHd:w-[30%] px-6 flex flex-col gap-y-12"
          onSubmit={props.handleSubmit}
        >
          <div className="text-important-black-color font-lora font-bold text-4xl fullHd:text-[48px] flex flex-col gap-y-2">
            <div>Login</div>
            <div className="text-normal-black-color font-roboto text-md font-normal fullHd:text-[20px]">
              Log into an existing account
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-full fullHd:pb-6">
            <div className="flex flex-col gap-y-2 text-sm md:w-2/3 fullHd:w-full fullHd:gap-y-8">
              <div className="flex flex-col gap-y-4">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  name="remembear-box"
                  pt={{
                    box: {
                      className: "border-2 border-border-color",
                    },
                  }}
                  onChange={(e) =>
                    setChecked(e.checked != undefined ? e.checked : false)
                  }
                  checked={checked}
                />
                <label
                  htmlFor="remembear-box"
                  className="font-roboto font-normal text-xs text-gray-color fullHd:text-[14px]"
                >
                  Remembear me?
                </label>
              </div>
            </div>
          </div>
          <button
            className="ITPbutton bg-black text-white rounded"
            type="submit"
          >
            Log In
          </button>
          <div className="flex flex-col gap-y-2 xl:gap-y-8 text-sm underline cursor-pointer xl:text-xs fullHd:text-[14px] font-normal text-important-black-color font-roboto">
            <Link to={FORGOT_PASSWORD_ROUTE}>Forgot your password?</Link>
            <Link to={REGISTER_ROUTE}>Register as a new user</Link>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
