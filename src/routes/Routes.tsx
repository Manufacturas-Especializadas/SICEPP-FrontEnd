import { Route, Routes } from "react-router-dom";
import { EppIndex } from "../pages/EPP/EppIndex";
import { Store } from "../pages/Store/Store";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EppIndex />} />
      <Route path="/almacen" element={<Store />} />
    </Routes>
  );
};
