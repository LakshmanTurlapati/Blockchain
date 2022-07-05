import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import Modal from "../../components/Modal";
import { usePatient } from "../../context/patient";
import PatientData from "../../components/PatientData";
import { useDoctor } from "../../context/doctor";
import useSocket from "../../hooks/useSocket";
import { useAssign } from "../../context/assign";

function Monitor() {
  const ref = useRef();
  const { allPatientDetails, allPatients } = usePatient();
  const assign = useAssign();
  const { patients } = assign;
  const [data, subscribe] = useSocket();
  const [subscribe_id, setSubscriber] = useState(null);

  useEffect(() => {
    subscribe_id && subscribe(subscribe_id);
    console.log(subscribe_id);
  }, [subscribe_id]);

  return (
    <HomeContainer>
      <div className="patient-container">
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
                allPatientDetails[patient.patient_id] ?? {};
              return (
                <div
                  onClick={() => setSubscriber(_id)}
                  className="patient-list"
                >
                  <div>{_id}</div>
                  <div>{patientName}</div>
                  <div>{age}</div>
                  <div>{gender}</div>
                  <div>{bloodGroup}</div>
                  <Modal
                    title={`Patient Monitoring of ${patientName}`}
                    modalRef={ref}
                    open={subscribe_id ? true : false}
                    closeModal={() => setSubscriber(null)}
                  >
                    <PatientData data={data} />
                  </Modal>
                </div>
              );
            })}
        </div>
      </div>
    </HomeContainer>
  );
}

export default Monitor;
