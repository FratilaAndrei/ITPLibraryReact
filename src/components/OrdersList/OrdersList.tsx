import { useContext, useEffect } from "react";
import { OrderContext } from "../../contexts/OrderProvider";
import { orderModel } from "../../data/types/type";
import Order from "./Order";

const OrdersList = () => {
  const { ordersArray, handleShipment } = useContext(OrderContext);

  useEffect(() => {
    const interval = setInterval(() => {
      ordersArray.forEach((order) => handleShipment(order.id));
    }, 60000);

    return () => clearInterval(interval);
  }, [ordersArray, handleShipment]);

  return (
    <div className="flex flex-col gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your orders
        </h2>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
          {ordersArray.map((order: orderModel, index) => (
            <Order
              index={index}
              key={order.id}
              order={order}
              ordersArray={ordersArray}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
