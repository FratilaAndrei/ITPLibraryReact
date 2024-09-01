import { useContext } from "react";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";
import orderBook from "../../assets/images/orderBook.png";
import { OrderContext } from "../../contexts/OrderProvider";
import { ORDER_DETAILS_ROUTE } from "../../data/routes";

const Order = () => {
  const { handleShipment } = useContext(OrderContext);
  const { ordersArray } = useContext(OrderContext);

  const getAllQuantity = (id: string) => {
    let totalQuantity = 0;
    ordersArray.forEach((order) => {
      if (order.id === id) return (totalQuantity += order.quantity);
    });
    return totalQuantity;
  };

  const getAllPrice = (id: string) => {
    let totalPrice = 0;
    ordersArray.forEach((item) => {
      if (item.id === id) return (totalPrice += item.price * item.quantity);
    }, 0);
    return totalPrice;
  };

  const orderItemBody = ordersArray.map((order, index) => {
    setInterval(() => {
      handleShipment(order.id);
    }, 60000);
    return (
      <div key={order.id}>
        <div className="card flex flex-col items-center md:flex-row md:w-full md:items-start md:justify-between">
          <div className="flex flex-col md:flex-row gap-x-4">
            <div className="md:w-[92px] md:h-[132px]">
              <img
                src={orderBook}
                alt={"pozaImagine"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" flex flex-col justify-between mt-2 md:mt-0">
              <div className="flex flex-col items-center md:items-start gap-y-2 md:gap-y-0">
                <div className="font-lora font-bold text-xl text-center">
                  Order #{order.id}
                </div>
                <div className="flex gap-x-2 items-center font-roboto">
                  <span>Items</span>
                  <div className="font-bold text-lg ">
                    {getAllQuantity(order.id)}
                  </div>
                </div>
              </div>
              <div className="flex  gap-x-2 items-center font-roboto">
                <div>Delivery Status:</div>
                <div className="font-bold text-lg">{order.status}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-x-2 items-center font-roboto md:items-end">
            <div className="text-beige-color font-bold fullHd:text-3xl text-lg">
              ${getAllPrice(order.id)}
            </div>
            {order.status === "In Progress" && order.form ? (
              <Link
                to={`${ORDER_DETAILS_ROUTE}/edit/${order.id}`}
                className="flex gap-x-2 items-center cursor-pointer"
              >
                <GoPencil />
                <span className="text-base fullHd:text-xl text-black">
                  Edit order details
                </span>
              </Link>
            ) : null}
          </div>
        </div>
        {}
        {index != ordersArray.length - 1 && (
          <div className="h-[1px] w-full bg-border-color my-8" key={index} />
        )}
      </div>
    );
  });

  return <div>{orderItemBody}</div>;
};

export default Order;
