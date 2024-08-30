import OrderItem from "./OrderItem";

const OrdersList = () => {
  return (
    <div className="flex flex-col gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your orders
        </h2>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
          <OrderItem />
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
