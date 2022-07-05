import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import Modal from "../../components/Modal";
import { usePatient } from "../../context/patient";
import PatientData from "../../components/PatientData";
import { useDoctor } from "../../context/doctor";
import useSocket from "../../hooks/useSocket";
import useLoader from "../../hooks/useLoader";

function Monitor() {
  const ref = useRef();
  const { allPatients, allPatientDetails } = usePatient();
  const [data, subscribe] = useSocket();
  const [subscribe_id, setSubscriber] = useState(null);
  const { patientName = "" } = allPatientDetails[subscribe_id] ?? {};

  useEffect(() => {
    subscribe_id && subscribe(subscribe_id);
    console.log(subscribe_id);
  }, [subscribe_id]);

  return (
    <HomeContainer loader={null}>
      <div className="patient-container">
        <div className="patients-list-container">
          <div className="header">
            <div>Patient ID</div>
            <div>Name</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Blood Group</div>
          </div>
          {allPatients.map((patient) => (
            <div
              onClick={() => setSubscriber(patient._id)}
              className="patient-list"
            >
              <div>{patient._id}</div>
              <div>{patient.patientName}</div>
              <div>{patient.age}</div>
              <div>{patient.gender}</div>
              <div>{patient.bloodGroup}</div>
            </div>
          ))}
          <Modal
            title={`Patient Monitoring of ${patientName}`}
            modalRef={ref}
            open={subscribe_id ? true : false}
            closeModal={() => setSubscriber(null)}
          >
            <PatientData data={data} />
          </Modal>
        </div>
      </div>
    </HomeContainer>
  );
}

export { Monitor };
