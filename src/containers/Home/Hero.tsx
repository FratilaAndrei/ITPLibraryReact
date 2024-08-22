import { Carousel } from "primereact/carousel";
import { classNames } from "primereact/utils";
import carrousel1 from "../../assets/images/carrousel1.png";
import carrousel2 from "../../assets/images/carrousel2.png";
import carrousel3 from "../../assets/images/carrousel3.png";
import HeroCarrousel from "../../components/Home/HeroCarrousel";
import { CarrouselItemType } from "../../data/types/type";

const CARROUSEL_ITEMS: CarrouselItemType[] = [
  {
    id: 0,
    image: carrousel1,
  },
  {
    id: 1,
    image: carrousel2,
  },
  {
    id: 2,
    image: carrousel3,
  },
];

const Hero = () => {
  return (
    <div className="card">
      <Carousel
        value={CARROUSEL_ITEMS}
        numVisible={1}
        numScroll={1}
        itemTemplate={(item: CarrouselItemType) => (
          <HeroCarrousel panel={item} />
        )}
        autoplayInterval={5000}
        showNavigators={false}
        showIndicators={true}
        pt={{
          indicator: {
            className: "relative h-1 w-4",
          },
          indicatorButton: ({ context }: { context: { active: boolean } }) => ({
            className: classNames(
              " h-1 transition duration-200 rounded-0",
              "focus:outline-none focus:outline-offset-0 ",
              {
                "bg-gray-300 hover:bg-gray-500": !context?.active,
                "bg-gray-color  w-[35px] ": context?.active,
              }
            ),
          }),
          indicators: {
            className:
              "absolute flex gap-x-4 bottom-32 z-30 left-1/2 -translate-x-1/2",
          },
          content: {
            className: "relative",
          },
        }}
      />
    </div>
  );
};

export default Hero;
