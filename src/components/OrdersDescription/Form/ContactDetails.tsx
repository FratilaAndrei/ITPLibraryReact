import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isFieldDisabled?: boolean;
};

const ContactDetails: FC<Props> = ({ isFieldDisabled }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
      <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
        {t("orderDetailsPage.contactDetails")}
      </div>
      <div className="w-full flex flex-wrap gap-x-4 gap-y-4 fullHd:gap-x-0 md:justify-between lg:gap-y-0 text-sm">
        <div className="w-full lg:w-[45%] flex flex-col gap-y-2 fullHd:gap-y-4">
          <Field
            type="text"
            name="firstName"
            placeholder={t("orderDetailsPage.firstName")}
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
            disabled={isFieldDisabled}
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="w-full lg:w-[45%] flex flex-col gap-y-2 fullHd:gap-y-4">
          <Field
            type="text"
            name="lastName"
            placeholder={t("orderDetailsPage.lastName")}
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full text-order-input"
            disabled={isFieldDisabled}
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
