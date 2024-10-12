import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/UsersProvider";
import { orderModelFetchModel } from "../../data/types/type";
import { readOrders } from "../../services/orders/readOrders.service";
import Order from "./Order";

const OrdersList = () => {
  const { currentUser } = useContext(UserContext);

  const idUser = currentUser?.uid;
  const { data: listOfOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (currentUser) {
        return readOrders(idUser, []);
      }
    },
    staleTime: 0,
    cacheTime: 60000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 60000,
  });

  return (
    <div className="flex flex-col h-full gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4 h-full">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your orders
        </h2>
        <div className="flex flex-col max-h-[90%]  md:overflow-y-scroll scrollbar-hide  scroll-smooth px-4 -mx-4 my-4">
          {listOfOrders?.map((order: orderModelFetchModel, index) => {
            return (
              <Order
                index={index}
                key={order.id ?? `order-${index}`}
                order={order}
                ordersArray={listOfOrders}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
