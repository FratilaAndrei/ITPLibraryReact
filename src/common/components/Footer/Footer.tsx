import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container h-14 bg-footer-color fullHd:h-[70px] text-xs">
      <div className=" mx-auto md:w-[90%] lg:w-full xl:w-[85%] flex items-center justify-between h-full ">
        <div className="flex gap-x-2 items-center font-roboto text-normal-black-color fullHd:text-sm ">
          <span className="font-normal">@Copyright</span>
          <span className="font-bold underline">IT Perspectives</span>
        </div>
        <Link to="/" className="rounded-[4px] bg-black p-1">
          <MdOutlineKeyboardArrowUp className="text-2xl text-white " />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
