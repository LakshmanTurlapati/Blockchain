import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import { Doctor as AdminDoctor } from "./pages/Admin/Doctor";
import { Patient as AdminPatient } from "./pages/Admin/Patient";
import { Assign as AdminAssign } from "./pages/Admin/Assign";
import { Monitor as AdminMonitor } from "./pages/Admin/Monitor";
import DoctorHome from "./pages/Doctor";
import UserData from "./pages/UserData";
import DoctorMonitor from "./pages/Doctor/Monitor";
import PatientMonitor from "./pages/Patient";

function App() {
  const routes = [
    { path: "/", component: <Home />, protected: false },
    { path: "/admin", component: <Admin />, protected: true },
    { path: "/admin/doctor", component: <AdminDoctor />, protected: true },
    { path: "/admin/patient", component: <AdminPatient />, protected: true },
    { path: "/admin/action", component: <AdminAssign />, protected: true },
    { path: "/admin/monitor", component: <AdminMonitor />, protected: true },
    { path: "/user/data", component: <UserData />, protected: true },
    { path: "/doctor", component: <DoctorHome />, protected: true },
    { path: "/doctor/monitor", component: <DoctorMonitor />, protected: true },
    {
      path: "/patient/monitor",
      component: <PatientMonitor />,
      protected: true,
    },
  ];

  return (
    <Routes>
      {routes.map((route) =>
        route.protected ? (
          <Route
            path={route.path}
            element={<ProtectedRoute>{route.component}</ProtectedRoute>}
          />
        ) : (
          <Route path={route.path} element={<Home />} />
        )
      )}
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctor"
        element={
          <ProtectedRoute>
            <AdminDoctor />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
