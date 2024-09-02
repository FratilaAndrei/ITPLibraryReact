import { FC } from "react";
import { CarrouselItemModel } from "../../data/types/type";

type Props = {
  panel: CarrouselItemModel;
};

const HeroCarrousel: FC<Props> = ({ panel }) => {
  return (
    <aside
      className="h-[600px] relative fullHd:h-[810px] bg-carrousel-color md:flex items-center lg:justify-between md:pl-8 fullHd:justify-evenly flex-wrap w-full fullHd:px-16"
      key={panel.id}
    >
      <div className="space-y-6 md:h-2/3 xl:h-1/3 p-4 md:p-0 md:w-1/2 lg:w-2/5 xl:pl-20 fullHd:pl-0">
        <div className="font-[600] font-lora text-2xl md:text-5xl text-important-black-color fullHd:text-[64px] text-wrap fullHd:w-[75%] fullHd:leading-tight">
          Buy textbooks for the best price
        </div>
        <div className="text-normal-black-color fullHd:text-[20px] font-roboto carrousel-description-secondary font-normal text-wrap md:w-4/5">
          From applied literature to educational resources, we have lot of
          textbooks to offer you. We sell only the best books.
        </div>
      </div>
      <div className="flex justify-center xs:items-center mx-auto h-1/2 md:m-0 lg:h-full w-full md:w-1/2">
        <img
          src={panel.image}
          alt={"CarrouselImageNr" + panel.id}
          className="md:w-2/3 h-2/3 lg:w-full fullHd:h-[70%] fullHd:w-[90%] rounded-3xl object-cover"
        />
      </div>
    </aside>
  );
};

export default HeroCarrousel;
