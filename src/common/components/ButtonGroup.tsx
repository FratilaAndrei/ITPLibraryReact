import { FC } from "react";
import { Link } from "react-router-dom";
import { ButtonGroupType } from "../../data/types/type";

type Props = {
  buttonGroup: ButtonGroupType[];
};

const ButtonGroup: FC<Props> = ({ buttonGroup }) => {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between">
      {buttonGroup.map((button: ButtonGroupType) =>
        button.link ? (
          <Link
            to={button.link}
            key={button.id}
            className={` ${
              button.className ? button.className : null
            } ITPbutton bg-black text-black flex items-center justify-center `}
            onClick={button?.onClick}
          >
            <button onClick={button?.onClick}>{button.label}</button>
          </Link>
        ) : (
          <button
            className={`${button.className} ITPbutton`}
            onClick={button?.onClick}
            key={button.id}
          >
            {button.label}
          </button>
        )
      )}
    </div>
  );
};

export default ButtonGroup;
