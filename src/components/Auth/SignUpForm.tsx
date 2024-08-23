import { ErrorMessage, Field, Formik } from "formik";
import { FC } from "react";
import { SIGN_UP_SCHEMA } from "./AuthValidationSchema";

const SignUpForm: FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
        console.log(values);
      }}
      validationSchema={SIGN_UP_SCHEMA}
      validateOnChange={false}
    >
      {(props) => (
        <form
          className="fullHd:w-[30%] px-6 flex flex-col gap-y-12"
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
            Register
          </button>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
