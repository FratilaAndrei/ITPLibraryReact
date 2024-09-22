import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../contexts/UsersProvider";
import { orderModel } from "../../data/types/type";
import {
  fetchOrderRequest,
  handleShipment,
} from "../../features/ordersList/ordersListSlice";
import { RootState } from "../../state/store";
import Order from "./Order";

const OrdersList = () => {
  const dispatch = useDispatch();
  const ordersList = useSelector(
    (state: RootState) => state.ordersList.ordersList
  );

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      ordersList.forEach((order) => dispatch(handleShipment(order.id)));
    }, 60000);

    return () => clearInterval(interval);
  }, [ordersList, dispatch]);

  const { loading, error } = useSelector(
    (state: RootState) => state.ordersList
  );
  const listOfOrders = useSelector(
    (state: RootState) => state.ordersList.ordersList
  );

  useEffect(() => {
    if (currentUser === null) return;
    dispatch(fetchOrderRequest(currentUser.uid));
  }, [dispatch, currentUser]);

  if (loading) {
    return <div>Se incarca pagina stai</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 mx-8 md:mx-auto flex-grow my-24 md:my-4 fullHd:my-16  fullHd:w-[70%] md:w-4/5 md:items-start md:justify-between">
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-lora font-bold text-3xl fullHd:text-[38px]">
          Your orders
        </h2>
        <div className="flex flex-col md:max-h-[400px] xl:max-h-[600px] md:overflow-y-scroll scroll-smooth px-4 -mx-4 my-4">
          {/* {ordersList.map((order: orderModel, index) => (
            <Order
              index={index}
              key={order.id}
              order={order}
              ordersArray={ordersList}
            />
          ))} */}
          {listOfOrders.map((order: orderModel, index) => {
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
