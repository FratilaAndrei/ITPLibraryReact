import { ErrorMessage, Field } from "formik";
import { FC } from "react";

type Props = {
  isFieldDisabled?: boolean;
};

const BillingAdressInputs: FC<Props> = ({ isFieldDisabled }) => {
  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        Billing Adress
      </div>
      <Field
        as="select"
        name="billingCity"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
        disabled={isFieldDisabled}
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
        disabled={isFieldDisabled}
      />
      <ErrorMessage
        name="billingAddress"
        component="div"
        className="text-red-500"
      />
      <Field
        type="number"
        name="billingPhone"
        placeholder="Phone Number"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
        disabled={isFieldDisabled}
      />
      <ErrorMessage
        name="billingPhone"
        component="div"
        className="text-red-500"
      />
    </div>
  );
};

export default BillingAdressInputs;
