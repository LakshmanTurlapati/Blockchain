import {
  faHeartbeat,
  faTemperature0,
  faTemperature1,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.css";
import { ReactComponent as Spo2 } from "../../assets/icons/spo2.svg";

function Index({ data }) {
  const { pulse = 0, spo2 = 0, temp = 0 } = data ?? {};
  return (
    <div className="patient-data-container">
      <div className="patient-data">
        <FontAwesomeIcon className="pulse" icon={faHeartbeat} size="3x" />
        <div>
          <div className="title">Pulse</div>
          <div className="data">{Number(pulse).toFixed(2)}</div>
        </div>
      </div>
      <div className="patient-data">
        <Spo2 />
        <div>
          <div className="title">Spo2</div>
          <div className="data">{Number(spo2).toFixed(2)}</div>
        </div>
      </div>
      <div className="patient-data">
        <FontAwesomeIcon className="temp" icon={faTemperature1} size="3x" />
        <div>
          <div className="title">Temp</div>
          <div className="data">{Number(temp).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
