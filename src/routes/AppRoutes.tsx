import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Viewer from "../pages/Viewer";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/viewer/:fileId" element={<Viewer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
