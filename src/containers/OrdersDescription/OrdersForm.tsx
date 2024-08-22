import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import ButtonGroup from "../../common/components/ButtonGroup";
import InputSection from "../../components/OrdersDescription/InputSection";
import { HOME_PAGE_ROUTE, SHOPPING_CART_ROUTE } from "../../data/routes";
import { ButtonGroupType } from "../../data/types/type";

const PAYMENT_TYPE_DATA = ["Online", "Cash"];

const OrdersForm = () => {
  const BUTTON_GROUP_ORDERS: ButtonGroupType[] = [
    {
      id: 1,
      link: SHOPPING_CART_ROUTE,
      label: "Cancel Order",
      className: "bg-white",
    },
    {
      id: 2,
      link: HOME_PAGE_ROUTE,
      label: "Place Order",
      className: "text-white",
    },
  ];

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [value, setValue] = useState<string>("");
  return (
    <form className="w-full border mt-16 fullHd:space-y-1.5 md:mt-0 border-border-color rounded-[4px] p-4 fullHd:px-10 xl:p-8 xl:my-4 xl:w-3/4 fullHd:w-2/5 flex flex-col gap-y-8 fullHd:mr-20">
      <div className="text-2xl xl:text-3xl text-important-black-color fullHd:text-[38px] font-semibold font-lora">
        Order Details
      </div>
      <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
        <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
          Contact Details
        </div>
        <div className="w-full flex flex-wrap gap-x-4 gap-y-4 fullHd:gap-x-0 fullHd:justify-between lg:gap-y-0 text-sm">
          <input
            type="text"
            placeholder="First Name"
            required
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-gray-color fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full lg:w-[48%]"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="py-1 pl-2 border-border-color rounded-[4px] font-roboto font-normal placeholder-order-input fullHd:py-2 fullHd:pl-3 fullHd:text-base border outline-none w-full lg:w-[48%]"
          />
        </div>
      </div>
      <InputSection
        title="Billing Address"
        option={true}
        optionLabel="Use address for delivery"
        hasInputFields
      />
      <InputSection title="Delivery Address" option={false} hasInputFields />
      <InputSection
        title="Payment Type"
        option={false}
        paymentTypeData={PAYMENT_TYPE_DATA}
        hasInputFields={false}
      />
      <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
        <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
          DeliveryDate
        </div>
        <Calendar
          id="buttondisplay"
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          className="border w-full py-1.5 pl-2 rounded"
          placeholder="Delivery Date"
        />
      </div>
      <div className="flex flex-col gap-y-2 fullHd:gap-y-4">
        <div className="text-xs font-roboto font-semibold fullHd:text-sm text-normal-black-color">
          Observations
        </div>
        <InputTextarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
          rows={3}
          cols={30}
          placeholder="Observations"
          className="border w-full py-1.5 pl-2 rounded"
        />
      </div>
      <InputSection
        title="Would you recommand us?"
        option={true}
        optionLabel="Would you recommand us?"
        hasInputFields={false}
      />
      <ButtonGroup buttonGroup={BUTTON_GROUP_ORDERS} />
    </form>
  );
};

export default OrdersForm;
