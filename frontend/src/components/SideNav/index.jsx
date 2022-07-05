import {
  faHome,
  faHospital,
  faSignOut,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHealth } from "../../context/health";
import { role } from "../../util/constants";
import "./index.css";
import icon from "../../assets/icon.png";
import { Link } from "react-router-dom";

function Index() {
  const { type, _id } = useHealth();

  const renderSideNav = {
    [role.ROOT]: [
      { name: "Home", icon: faHome, route: "/" },
      { name: "Patient", icon: faUser, route: "/admin/patient" },
      { name: "Monitor", icon: faHospital, route: "/admin/monitor" },
      { name: "P Services", icon: faHospital, route: "/admin/action" },
    ],
    [role.DOCTOR]: [
      { name: "Home", icon: faHome, route: "/" },
      { name: "Monitor", icon: faHospital, route: "/doctor/monitor" },
    ],
    [role.PATIENT]: [
      { name: "Home", icon: faHome, route: "/" },
      { name: "History", icon: faHospital, route: "/user/data?id=" + _id },
    ],
  };

  return (
    <div className="side-nav-container">
      <div>
        {renderSideNav[type] &&
          renderSideNav[type].map((option) => (
            <Link to={option.route} className="side-nav">
              <FontAwesomeIcon icon={option.icon} size="2x" />
              {option.name}
            </Link>
          ))}
        <div className="side-nav">
          <FontAwesomeIcon icon={faSignOut} size="2x" />
          Log Out
        </div>
      </div>
      <img className="bottom-icon" src={icon} />
    </div>
  );
}

export default Index;
