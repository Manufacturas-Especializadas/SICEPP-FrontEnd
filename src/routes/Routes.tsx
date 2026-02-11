import { Route, Routes } from "react-router-dom";
import { EppIndex } from "../pages/EPP/EppIndex";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EppIndex />} />
    </Routes>
  );
};
