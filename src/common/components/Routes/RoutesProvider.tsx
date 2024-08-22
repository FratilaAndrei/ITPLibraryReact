import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../data/routes";
import { RoutesType } from "../../../data/types/type";

const RoutesProvider = () => {
  return (
    <Routes>
      {ROUTES.map((route: RoutesType) => {
        return (
          <Route path={route.path} element={route.name()} key={route.id} />
        );
      })}
    </Routes>
  );
};

export default RoutesProvider;
