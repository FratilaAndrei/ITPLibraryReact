import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { Message } from "primereact/message";
import { FC, useContext, useEffect, useState } from "react";
import { RegisterContext } from "../../contexts/RegisterProvider";
import {
  REGISTER_INITIAL_VALUES,
  registerValuesType,
  SIGN_UP_SCHEMA,
} from "./AuthValidationSchema";

const SignUpForm: FC = (): JSX.Element => {
  const { checkIfUserExists, findEmail } = useContext(RegisterContext);
  const [emailExists, setEmailExists] = useState<boolean>(false);

  const handleFormSubmit = (
    values: registerValuesType,
    actions: FormikHelpers<registerValuesType>
  ) => {
    if (findEmail(values)) {
      setEmailExists(true);
    } else {
      setEmailExists(false);
      checkIfUserExists(values);
      alert(JSON.stringify(values, null, 2));
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
  }, [emailExists]);

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
            <div>Register</div>
            <div className="text-normal-black-color font-roboto text-md font-normal fullHd:text-[20px]">
              Create a new account
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
              <div className="flex flex-col gap-y-4">
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
            {props.isSubmitting ? <p>Submitting...</p> : <div>Register</div>}
          </button>
          {emailExists && (
            <Message
              severity="error"
              text="Email aready used"
              className="absolute top-0 right-0"
            />
          )}
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
