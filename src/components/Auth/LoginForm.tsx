import { ErrorMessage, Field, Formik } from "formik";
import { Checkbox } from "primereact/checkbox";
import { Message } from "primereact/message";
import { useContext, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UsersProvider";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "../../data/routes";
import { LOGIN_INITIAL_VALUES } from "./AuthValidationSchema";
import { LOG_IN_SCHEMA } from "./LogInValidationSchema";

const LoginForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);

  const { logInUser } = useContext(UserContext);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      onSubmit={(values, actions) => {
        logInUser(values.email, values.password);
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
            <Trans i18nKey={"loginPage.logIn"} />
            <div className="text-normal-black-color font-roboto text-md font-normal fullHd:text-[20px]">
              <Trans i18nKey={"loginPage.logInDescription"} />
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-full fullHd:pb-6">
            <div className="flex flex-col gap-y-2 text-sm md:w-2/3 fullHd:w-full fullHd:gap-y-8">
              <div className="flex flex-col gap-y-4">
                <label htmlFor="email">
                  <Trans i18nKey={"loginPage.email"} />
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder={t("loginPage.email")}
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <label htmlFor="password">
                  <Trans i18nKey={"loginPage.password"} />
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder={t("loginPage.password")}
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
                  <Trans i18nKey={"loginPage.rememberMe"} />
                </label>
              </div>
            </div>
          </div>
          <button
            className="ITPbutton bg-black text-white rounded"
            type="submit"
          >
            <Trans i18nKey={"loginPage.logIn"} />
          </button>
          <div className="flex flex-col gap-y-2 xl:gap-y-8 text-sm underline cursor-pointer xl:text-xs fullHd:text-[14px] font-normal text-important-black-color font-roboto">
            <Link to={FORGOT_PASSWORD_ROUTE}>
              <Trans i18nKey={"loginPage.forgotPassword"} />
            </Link>
            <Link to={REGISTER_ROUTE}>
              <Trans i18nKey={"loginPage.registerNewUser"} />
            </Link>
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
