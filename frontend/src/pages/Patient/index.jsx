import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import Modal from "../../components/Modal";
import { getAllPatients, usePatient } from "../../context/patient";
import PatientData from "../../components/PatientData";
import { useDoctor } from "../../context/doctor";
import useSocket from "../../hooks/useSocket";
import { useAssign } from "../../context/assign";
import "./index.css";
import PatientDetails from "../../components/PatientDetails";
import { useHealth } from "../../context/health";
import Button from "../../components/Button";
import { buttonStyle } from "../../util/constants";

function Monitor() {
  const ref = useRef();
  const { allPatientDetails, allPatients, dispatch } = usePatient();
  const { _id } = useHealth();
  const assign = useAssign();
  const { patients } = assign;
  const [data, subscribe] = useSocket();
  const [subscribe_id, setSubscriber] = useState(null);

  const _getAllPatients = async () => {
    dispatch({ ...(await getAllPatients()) });
  };

  useEffect(() => {
    _getAllPatients();
  }, []);

  useEffect(() => {
    _id && subscribe(_id);
  }, [_id]);

  return (
    <HomeContainer>
      <div className="patient-container">
        <div className="patients-list-container">
          <Modal
            title={`Patient Monitoring of ${allPatientDetails[_id]?.patientName}`}
            trigger={
              <div className="add-patient-btn">
                <Button
                  title={"Get Patient Details"}
                  type={buttonStyle.OUTLINE}
                />
              </div>
            }
            modalRef={ref}
            open={subscribe_id ? true : false}
            closeModal={() => setSubscriber(null)}
          >
            <PatientDetails data={allPatientDetails[_id]} />
          </Modal>
          <div className="patient-detail"></div>
          <PatientData data={data} />
          {/* {Array.isArray(patients) &&
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
                    
                  </Modal>
                </div>
              );
            })} */}
        </div>
      </div>
    </HomeContainer>
  );
}

export default Monitor;
