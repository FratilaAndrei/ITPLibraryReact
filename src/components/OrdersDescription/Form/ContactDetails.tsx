import { ErrorMessage, Field } from "formik";

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        Contact Details
      </div>
      <div className="w-full flex flex-wrap gap-x-4 gap-y-4 fullHd:gap-x-0 fullHd:justify-between lg:gap-y-0 text-sm">
        <div className="w-full lg:w-[45%] flex flex-col gap-y-2 fullHd:gap-y-4">
          <Field
            type="text"
            name="firstName"
            placeholder="First Name"
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
          />
          <ErrorMessage name="firstName" />
        </div>
        <div className="w-full lg:w-[45%] flex flex-col gap-y-2 fullHd:gap-y-4">
          <Field
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
          />
          <ErrorMessage name="lastName" />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
