import { Link } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../data/routes";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-carrousel-color gap-y-4 ">
      <div className="text-6xl bg-gradient-to-r text-transparent bg-clip-text from-orange-400 to-orange-600 ">
        404
      </div>
      <div className="uppercase">OOPS! Nothing was found</div>
      <div className="flex gap-x-2">
        The page you are looking for might have been removed had its name
        changed or it temporarely unavailable
        <Link
          to={HOME_PAGE_ROUTE}
          className="bg-gradient-to-r text-transparent bg-clip-text from-orange-400 to-orange-600 underline cursor-pointer"
        >
          return to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
