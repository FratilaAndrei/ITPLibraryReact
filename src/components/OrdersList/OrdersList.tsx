import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/UsersProvider";
import { orderModelFetchModel } from "../../data/types/type";
import { readOrders } from "../../services/orders/readOrders.service";
import Order from "./Order";

const OrdersList = () => {
  // const dispatch = useDispatch();
  // const ordersList = useSelector(
  //   (state: RootState) => state.ordersList.ordersList
  // );

  // const { currentUser } = useContext(UserContext);

  // const { error } = useSelector((state: RootState) => state.ordersList);
  // const listOfOrders = useSelector(
  //   (state: RootState) => state.ordersList.ordersList
  // );

  // useEffect(() => {
  //   if (currentUser === null) return;
  //   dispatch(fetchOrderRequest());
  // }, [dispatch, currentUser, ordersList.length]);

  // // if (loading) {
  // //   return <div>Se incarca pagina stai</div>;
  // // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  const { currentUser } = useContext(UserContext);
  // if (!currentUser) return <div>NU EXISTA USER</div>;

  // console.log("USER ID", currentUser?.uid);
  const idUser = currentUser?.uid;
  const { data: listOfOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (currentUser) {
        return readOrders(idUser, []);
      }
    },
  });

  console.log("ORDERS ---- ", listOfOrders);
  console.log(
    "PRICES ------ ",
    listOfOrders?.map((order) => order.totalPrice)
  );

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
