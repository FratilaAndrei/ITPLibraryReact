import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  linkFirstBtn: string;
  linkSecondBtn: string;
  labelFirstBtn: string;
  labelSecondBtn: string;
};

const ButtonGroup: FC<Props> = ({
  linkFirstBtn,
  linkSecondBtn,
  labelFirstBtn,
  labelSecondBtn,
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
        <Link to={linkFirstBtn}>
          <button className=" rounded-sm ITPbutton text-black ">
            {labelFirstBtn}
          </button>
        </Link>
        <Link to={linkSecondBtn}>
          <button className="rounded ITPbutton text-white bg-black ">
            {labelSecondBtn}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonGroup;
