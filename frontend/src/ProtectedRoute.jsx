import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useHealth } from "./context/health";

function ProtectedRoute({ children }) {
  const { _id, role } = useHealth();
  const { pathname } = useLocation();

  const renderRoutes = {
    0: [
      "/admin",
      "/admin/doctor",
      "/admin/patient",
      "/admin/action",
      "/admin/monitor",
      "/user/data",
    ],
    1: ["/doctor", "/doctor/patient", "/doctor/monitor", "/user/data"],
    2: ["/user/data", "/patient/monitor"],
    [null]: ["/"],
    [-1]: ["/"],
  };

  return renderRoutes[role].includes(pathname) ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
}

export default ProtectedRoute;
