import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";

const DeliveryAdress = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        {t("orderDetailsPage.deliveryAddress")}
      </div>
      <Field
        as="select"
        name="deliveryCity"
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      >
        <option value="Romania">Romania</option>
        <option value="Germany">Germany</option>
        <option value="Italy">Italy</option>
      </Field>
      <ErrorMessage name="deliveryCity" />
      <Field
        type="text"
        name="deliveryAddress"
        placeholder={t("orderDetailsPage.address")}
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      />
      <ErrorMessage name="deliveryAddress" />
      <Field
        type="number"
        name="deliveryPhone"
        placeholder={t("orderDetailsPage.phone")}
        className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
      />
      <ErrorMessage name="deliveryPhone" />
    </div>
  );
};

export default DeliveryAdress;
