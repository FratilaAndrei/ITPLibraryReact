import ordersHeroImg from "../../assets/images/order.png";

const OrdersDescriptionHero = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-full flex-col justify-center xl:w-2/5 2xl:w-2/5 fullHd:w-1/3 lg:mb-20 xl:mb-0 ">
      <div className="w-full h-4/5 xl:h-[70%] relative">
        <img src={ordersHeroImg} alt="image-order" className="w-[90%] h-full" />
        <div className="bg-carrousel-color w-[105%] absolute top-20 h-full -z-10"></div>
      </div>
    </div>
  );
};

export default OrdersDescriptionHero;
