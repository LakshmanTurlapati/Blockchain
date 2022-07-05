import React, { useEffect, useRef } from "react";
import HomeContainer from "../../components/HomeContainer";
import "./index.css";
import { usePatient, getAllPatients } from "../../context/patient";
import PatientDetails from "../../components/PatientDetails";
import Modal from "../../components/Modal";
import { useDoctor, getAllDoctors } from "../../context/doctor";
import "../../components/Input/index.css";
import { getPatientsAssigned, useAssign } from "../../context/assign";
import { Link } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { loaderType } from "../../util/constants";

const Assign = () => {
  const { allPatientDetails, dispatch } = usePatient();
  const doctor = useDoctor();
  const assign = useAssign();
  const { patients } = assign;
  const { allDoctors } = doctor;
  const ref = useRef();
  const [loading, setLoader] = useLoader();

  const assignAction = {
    getAllPatient: async () => {
      dispatch({ ...(await getAllPatients()) });
      return this;
    },
    getAllDoctor: async () => {
      doctor.dispatch({ ...(await getAllDoctors()) });
      return this;
    },
  };

  const assignEffect = async () => {
    setLoader(loaderType.DATA);
    await assignAction.getAllPatient();
    await assignAction.getAllDoctor();
    setLoader(false);
  };

  useEffect(() => {
    assignEffect();
  }, []);

  const handleAssignDoctor = async (e) => {
    const { dispatch } = assign;
    const doctor = JSON.parse(e.target.value);
    setLoader(loaderType.DATA);
    dispatch({ ...(await getPatientsAssigned(doctor._id)) });
    setLoader(null);
  };

  return (
    <HomeContainer loader={loading}>
      <div className="patient-container">
        <h3>Get Patient Assigned Doctors</h3>
        <div className="select-container">
          <select onChange={handleAssignDoctor} type={"text"} className="input">
            <option className="option" value={{}}>
              Select
            </option>
            {allDoctors.map((doctor) => (
              <option className="option" value={JSON.stringify(doctor)}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>
        <div className="patients-list-container">
          <div className="header">
            <div>Patient ID</div>
            <div>Name</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Blood Group</div>
          </div>
          {Array.isArray(patients) &&
            patients.map((patient) => {
              const { _id, patientName, age, gender, bloodGroup } =
                allPatientDetails[patient.patient_id];
              return (
                <Link to={"/user/data?id=" + _id}>
                  <div className="patient-list">
                    <div>{_id}</div>
                    <div>{patientName}</div>
                    <div>{age}</div>
                    <div>{gender}</div>
                    <div>{bloodGroup}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </HomeContainer>
  );
};

export { Assign };
