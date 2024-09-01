import { FC } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

type Props = {
  hasIcon?: boolean;
};

const Footer: FC<Props> = ({ hasIcon }) => {
  return (
    <div className="h-14 bg-footer-color fullHd:h-[70px] w-full text-xs px-4">
      <div className="mx-auto md:w-full xl:w-[85%] flex items-center justify-between h-full">
        <div className="flex gap-x-2 items-center font-roboto text-normal-black-color fullHd:text-sm">
          <span className="font-normal">@Copyright</span>
          <span className="font-bold underline">IT Perspectives</span>
        </div>
        {hasIcon ? (
          <MdOutlineKeyboardArrowUp
            className="text-2xl text-white rounded bg-black lg:p-1"
            onClick={() => window.scrollTo(0, 0)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Footer;
