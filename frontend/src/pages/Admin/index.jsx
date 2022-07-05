import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useHealth } from "../../context/health";
import "./index.css";
import HomeContainer from "../../components/HomeContainer";
import { Link } from "react-router-dom";

function Index() {
  const { _id } = useHealth();
  return (
    <HomeContainer>
      <div className="health-container ">
        <h2>Your Options</h2>
        <div className="home-options-container">
          <Link to={"/admin/doctor"}>
            <div className="option">
              <FontAwesomeIcon icon={faUserDoctor} size="10x" />
              <div>Doctor Services</div>
            </div>
          </Link>
          <Link to={"/admin/patient"}>
            <div className="option">
              <FontAwesomeIcon icon={faUser} size="10x" />
              <div>Patient Services</div>
            </div>
          </Link>
          <Link to={"/admin/status"}>
            <div className="option">
              <FontAwesomeIcon icon={faHospital} size="10x" />
              <div>Health Monitor</div>
            </div>
          </Link>
        </div>
      </div>
    </HomeContainer>
  );
}

export default Index;
