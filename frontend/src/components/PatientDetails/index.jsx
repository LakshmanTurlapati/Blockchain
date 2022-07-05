import React from "react";
import Button from "../Button";
import Modal from "../Modal";
import "./index.css";
import { buttonStyle } from "../../util/constants";
import "../Input/index.css";

function Index({ data, doctors, selectDoctor }) {
  return (
    <div className="add-patient-container">
      {Object.keys(data).map(
        (key, index) =>
          index <= 7 && (
            <div className="input-container readonly">
              <div>{key} : </div>
              <input
                type={"text"}
                className="input"
                disabled={true}
                value={data[key]}
              />
            </div>
          )
      )}
      {doctors && (
        <div className="input-container readonly">
          <div>Select Doctor : </div>

          <select
            onChange={(e) => selectDoctor(JSON.parse(e.target.value))}
            type={"text"}
            className="input"
          >
            <option value={{}}>Select</option>
            {doctors.map((doctor) => (
              <option value={JSON.stringify(doctor)}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Index;
