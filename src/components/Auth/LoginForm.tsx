import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Formik } from "formik";
import { Checkbox } from "primereact/checkbox";
import { Message } from "primereact/message";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UsersProvider";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_PAGE_ROUTE,
  REGISTER_ROUTE,
} from "../../data/routes";
import { findAccount } from "../../features/userAccount/userAccountSlice";
import { auth22 } from "../../firebase/firebase";
import { LOGIN_INITIAL_VALUES } from "./AuthValidationSchema";
import { LOG_IN_SCHEMA } from "./LogInValidationSchema";

const LoginForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logUser = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth22,
        email,
        password
      );
      const user = userCredentials.user;
      setCurrentUser(user);
      navigate(HOME_PAGE_ROUTE);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      onSubmit={(values, actions) => {
        dispatch(findAccount(values));
        logUser(values.email, values.password);
        actions.setSubmitting(false);
      }}
      validationSchema={LOG_IN_SCHEMA}
      validateOnChange={false}
    >
      {(props) => (
        <form
          className="fullHd:w-[30%] px-6 flex flex-col gap-y-12 relative"
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
          {showError ? (
            <Message
              severity="error"
              text="Account not found"
              className="absolute top-0 -right-12"
            />
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
