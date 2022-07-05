import React, { useEffect, useMemo, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import "../Admin/index.css";
import Modal from "../../components/Modal";
import useLoader from "../../hooks/useLoader";
import PatientDetails from "../../components/PatientDetails";
import { useDoctor, getAllDoctors } from "../../context/doctor";
import Button from "../../components/Button";
import {
  getAllPatientsNormalData,
  getPatientData,
  useMonitor,
} from "../../context/monitor";
import { useSearchParams } from "react-router-dom";
import { buttonStyle, loaderType } from "../../util/constants";
import { getAllPatients, usePatient } from "../../context/patient";
import Loader from "../../components/Loader";

function Index() {
  const ref = useRef();
  const { dispatch, patientData } = useMonitor();
  const patient = usePatient();
  const { allPatientDetails } = patient;
  const [loading, setLoader] = useLoader();
  const [params] = useSearchParams();
  const id = params.get("id");
  const [toggleData, setToggleData] = useState(null);
  const toggleRef = useRef();

  const getAllPatientData = async () => {
    setLoader(loaderType.DATA);
    dispatch({ ...(await getPatientData(id)) });
    setLoader(false);
  };

  const getAllPatientsData = async () => {
    setLoader(loaderType.DATA);
    const { dispatch } = patient;
    dispatch({ ...(await getAllPatients()) });
    setLoader(false);
  };

  const getAllNormalData = async () => {
    setLoader(loaderType.DATA);
    dispatch({ ...(await getAllPatientsNormalData(id)) });
    setLoader(false);
  };

  const toggleClass = useMemo(() => {
    return toggleData ? "toggle-right" : "toggle";
  }, [toggleData]);

  const monitorEffect = async () => {
    if (toggleData) {
      await getAllNormalData();
    } else {
      await getAllPatientsData();
      await getAllPatientData();
    }
  };

  useEffect(() => {
    monitorEffect();
  }, [toggleData]);

  console.log({ toggleClass });

  return (
    <HomeContainer loader={loading}>
      <div className="patient-container">
        <div className="data-header">
          <h3 className="data-title">
            Health Data Of Patient {allPatientDetails[id]?.patientName}
          </h3>
          <Modal
            title="Patient Details"
            modalRef={ref}
            trigger={
              <div className="add-patient-btn">
                <Button
                  title={"Get Patient Details"}
                  type={buttonStyle.OUTLINE}
                />
              </div>
            }
          >
            <PatientDetails data={allPatientDetails[id]} />
          </Modal>
        </div>
        <div className="patients-list-container">
          <div
            onClick={() => setToggleData(!toggleData)}
            className="data-switch"
          >
            <div ref={toggleRef} className={toggleClass}></div>
          </div>
          <div className="header">
            <div>Patient ID</div>
            <div>Pulse</div>
            <div>Spo2</div>
            <div>Temperature</div>
          </div>
          {patientData.map((data) => (
            <div className="patient-list">
              <div>{data._id}</div>
              <div>{data.pulse}</div>
              <div>{data.spo2}</div>
              <div>{data.temp}</div>
            </div>
          ))}
        </div>
      </div>
    </HomeContainer>
  );
}

export default Index;
