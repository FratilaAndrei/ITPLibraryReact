import { ErrorMessage, Field } from "formik";

const BillingAdressInputs = () => {
  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        Billing Adress
      </div>
      <Field
        as="select"
        name="billingCity"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      >
        <option value="Romania">Romania</option>
        <option value="Germany">Germany</option>
        <option value="Italy">Italy</option>
      </Field>
      <ErrorMessage name="billingCity" />
      <Field
        type="text"
        name="billingAddress"
        placeholder="Adress"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      />
      <ErrorMessage name="billingAddress" />
      <Field
        type="tel"
        name="billingPhone"
        placeholder="Phone Number"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      />
      <ErrorMessage name="billingPhone" />
    </div>
  );
};

export default BillingAdressInputs;
