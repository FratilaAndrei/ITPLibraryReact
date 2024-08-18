import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
  icon: ReactNode;
  children: string;
};

const NavLink: FC<Props> = ({ link, icon, children }) => {
  return (
    <li className="flex gap-x-2 items-center text-base ">
      <div className="text-lg">{icon}</div>
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default NavLink;
