import { FC } from "react";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";
import orderBook from "../../assets/images/orderBook.png";
import { ORDER_DETAILS_ROUTE } from "../../data/routes";
import { orderModel } from "../../data/types/type";

type Props = {
  order: orderModel;
  index: number;
  ordersArray: orderModel[];
};

const Order: FC<Props> = ({ order, index, ordersArray }) => {
  // const getAllQuantity = (id: string) => {
  //   let totalQuantity = 0;
  //   ordersArray.forEach((order) => {
  //     if (order.id === id) return (totalQuantity += order.quantity);
  //   });
  //   return totalQuantity;
  // };

  // const getAllPrice = (id: string) => {
  //   let totalPrice = 0;
  //   ordersArray.forEach((item) => {
  //     if (item.id === id) return (totalPrice += item.price * item.quantity);
  //   }, 0);
  //   return totalPrice;
  // };
  const getAllQuantity = (id: string) => {
    let totalQuantity = 0;
    ordersArray.forEach((order) => {
      if (order.id === id) {
        totalQuantity += order.quantity;
      }
    });
    return totalQuantity;
  };

  const getAllPrice = (id: string) => {
    let totalPrice = 0;
    ordersArray.forEach((item) => {
      if (item.id === id) {
        totalPrice += item.price * item.quantity;
      }
    });
    return totalPrice;
  };

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
                Order #{order.id.slice(0, 5)}
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
          {order.status === "In Progress" && order.orderDetails ? (
            <Link
              to={`${ORDER_DETAILS_ROUTE}/edit/${order.id}`}
              className="flex gap-x-2 items-center cursor-pointer"
            >
              <GoPencil />
              <span className="text-base fullHd:text-xl text-black">
                Edit order details
              </span>
            </Link>
          ) : (
            <Link
              to={`${ORDER_DETAILS_ROUTE}/edit/${order.id}`}
              className="flex gap-x-2 items-center cursor-pointer"
            >
              <span className="text-base fullHd:text-xl text-black">
                View Order
              </span>
            </Link>
          )}
        </div>
      </div>
      {}
      {index != ordersArray.length - 1 && (
        <div className="h-[1px] w-full bg-border-color my-8" key={index} />
      )}
    </div>
  );
};

export default Order;
