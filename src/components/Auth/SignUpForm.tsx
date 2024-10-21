import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { Message } from "primereact/message";
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../contexts/UsersProvider";
import {
  checkIfUserExists,
  setIsAccountRegistered,
} from "../../features/userAccount/userAccountSlice";
import { RootState } from "../../state/store";
import {
  REGISTER_INITIAL_VALUES,
  registerValuesModel,
  SIGN_UP_SCHEMA,
} from "./AuthValidationSchema";

const SignUpForm: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { registerUser } = useContext(UserContext);

  const isAccountRegistered = useSelector(
    (state: RootState) => state.userAccount.isAccountRegistered
  );

  const registerArray = useSelector(
    (state: RootState) => state.userAccount.registerArray
  );
  const [emailExists, setEmailExists] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleFormSubmit = (
    values: registerValuesModel,
    actions: FormikHelpers<registerValuesModel>
  ) => {
    const emailAlreadyExists = registerArray.find(
      (user: registerValuesModel) => user.email === values.email
    );

    if (!emailAlreadyExists) {
      setEmailExists(false);
      registerUser(values.email, values.password);
      // saveNewUser(values);
      dispatch(checkIfUserExists(values));
      alert(JSON.stringify(values, null, 2));
    } else {
      setEmailExists(true);
    }
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (emailExists) {
      const timer = setTimeout(() => {
        setEmailExists(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    if (isAccountRegistered) {
      const timer2 = setTimeout(() => {
        setIsAccountRegistered(false);
      }, 3000);
      return () => clearTimeout(timer2);
    }
  }, [emailExists, isAccountRegistered]);

  return (
    <Formik
      initialValues={REGISTER_INITIAL_VALUES}
      onSubmit={handleFormSubmit}
      validationSchema={SIGN_UP_SCHEMA}
      validateOnChange={false}
    >
      {(props) => (
        <form
          className="fullHd:w-[30%] px-6 flex flex-col gap-y-12 relative"
          onSubmit={props.handleSubmit}
        >
          <div className="text-important-black-color font-lora font-bold text-4xl fullHd:text-[48px] flex flex-col gap-y-2">
            <div>{t("registerPage.register")}</div>
            <div className="text-normal-black-color font-roboto text-md font-normal fullHd:text-[20px]">
              {t("registerPage.registerDescription")}
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-full fullHd:pb-6">
            <div className="flex flex-col gap-y-2 text-sm md:w-2/3 fullHd:w-full fullHd:gap-y-8">
              <div className="flex flex-col gap-y-4">
                <label htmlFor="email">{t("registerPage.email")}</label>
                <Field
                  type="email"
                  name="email"
                  placeholder={t("registerPage.email")}
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                  onBlur={() => {
                    const emailAlreadyExists = registerArray.find(
                      (user: registerValuesModel) =>
                        user.email === props.values.email
                    );
                    if (emailAlreadyExists) {
                      setEmailExists(true);
                    }
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <label htmlFor="password">{t("registerPage.password")}</label>

                <Field
                  type="password"
                  name="password"
                  placeholder={t("registerPage.password")}
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <label htmlFor="confirmPassword">
                  {t("registerPage.confirmPassword")}
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder={t("registerPage.confirmPassword")}
                  className="w-full fullHd:w-[512px]  py-2.5 pl-3  border placeholder:text-normal-black-color font-roboto border-border-color rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
          </div>
          <button
            className="ITPbutton bg-black text-white rounded"
            type="submit"
          >
            {props.isSubmitting ? (
              <p>Submitting...</p>
            ) : (
              <div>{t("registerPage.register")}</div>
            )}
          </button>
          {emailExists && (
            <Message
              severity="error"
              text="Email aready used"
              className="absolute top-0 right-0"
            />
          )}
          {isAccountRegistered ? (
            <Message
              severity="success"
              text="Account created successfully"
              className="absolute top-0 -right-12"
            />
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
