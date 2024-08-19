import ordersHeroImg from "../../assets/images/order.png";

const OrdersDescriptionHero = () => {
  return (
    <div className="w-full xl:w-2/3 relative flex justify-center xl:justify-start fullHd:justify-center fullHd:w-1/2 lg:pt-20">
      <img
        src={ordersHeroImg}
        alt="image-order"
        className="h-1/3 md:h-1/2 w-full md:w-full lg:w-3/4 xl:w-4/5 fullHd:w-[512px] fullHd:h-[768px] xl:h-[55%] xl:p-2 fullHd:p-0 object-cover z-20 relative"
      />
      <div className="bg-carrousel-color w-full md:w-full xl:h-[38%] lg:w-3/4 h-full -right-4 lg:right-4 md:h-2/5 fullHd:h-[768px] fullHd:right-16  fullHd:w-[70%] xl:top-48 lg:h-2/5 absolute top-10 md:top-36 z-10"></div>
    </div>
  );
};

export default OrdersDescriptionHero;
