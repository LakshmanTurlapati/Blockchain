import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import "./index.css";
import Button from "../../components/Button";
import { buttonStyle, loaderType } from "../../util/constants";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { closeModal } from "../../util";
import { addPatient, getAllPatients, usePatient } from "../../context/patient";
import useLoader from "../../hooks/useLoader";
import PatientDetails from "../../components/PatientDetails";
import { useDoctor, getAllDoctors } from "../../context/doctor";
import { assignDoctor, useAssign } from "../../context/assign";

function Patient() {
  const ref = useRef();
  const { dispatch, allPatients } = usePatient();
  const doctor = useDoctor();
  const { allDoctors } = doctor;
  const assign = useAssign();
  const [loading, setLoader] = useLoader();
  const [patientData, setPatientData] = useState({
    pId: {
      name: "Patient Public Key",
      value: "",
      placeholder: "Ex : 0xaxxxx",
    },
    patientName: {
      name: "Patient Name",
      value: "",
      placeholder: "Ex : Atif",
    },
    age: { name: "Age", value: "", placeholder: "Ex : 25" },
    gender: { name: "Gender", value: "", placeholder: "Ex : M/F/B " },
    bloodGroup: { name: "Blood Group", value: "", placeholder: "Ex : AB+" },
    Address: {
      name: "Address",
      value: "",
      placeholder: "Ex : H.No 17-xx Charminar Hyd",
      textarea: true,
    },
    device_id: {
      name: "Device ID",
      value: "",
      placeholder: "Ex : 2ABCDXX",
    },
    phone: {
      name: "Phone No.",
      value: "+91",
      placeholder: "Ex : 987xxxxxxx",
    },
  });
  const patientsKeysArr = Object.keys(patientData);

  const handleTyping = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPatientData((_patientData) => ({
      ..._patientData,
      [name]: { ...patientData[name], value: value },
    }));
  };

  const getAllPatient = async () => {
    setLoader(loaderType.DATA);
    dispatch({ ...(await getAllPatients()) });
    setLoader(false);
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  const handleAddPatient = async (e) => {
    const _data = [];
    patientsKeysArr.forEach(
      (_pKey, index) => index <= 6 && _data.push(patientData[_pKey].value)
    );
    _data.push("MEC Hospitals");
    _data.push(_data[0]);
    setLoader(loaderType.TRANSACTION);
    await addPatient(_data, patientData);
    setLoader(false);
    closeModal(e);
  };

  const assignPatientToDoctor = async (doctor, patient) => {
    const { dispatch } = assign;
    dispatch({
      ...(await assignDoctor(doctor._id, doctor.doctorName, patient._id)),
    });
  };

  return (
    <HomeContainer loader={loading}>
      <div className="patient-container">
        <Modal
          title="Add A Patient"
          modalRef={ref}
          trigger={
            <div className="add-patient-btn">
              <Button title={"Add Patient"} type={buttonStyle.OUTLINE} />
            </div>
          }
        >
          <div className="add-patient-container">
            {patientsKeysArr.map((_patKey) => (
              <Input
                onTyping={handleTyping}
                name={patientData[_patKey].name}
                type={patientData[_patKey].textarea ? "TEXTAREA" : "INPUT"}
                placeholder={patientData[_patKey].placeholder}
                label={_patKey}
                value={patientData[_patKey].value}
              />
            ))}
            <div className="add-patient-footer">
              <Button
                callBack={(e) => closeModal(e)}
                title={"Cancel"}
                type={buttonStyle.OUTLINE}
              />
              <Button
                title={"Add"}
                type={buttonStyle.PRIMARY}
                callBack={handleAddPatient}
              />
            </div>
          </div>
        </Modal>

        <div className="patients-list-container">
          <div className="header">
            <div>Patient ID</div>
            <div>Name</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Blood Group</div>
          </div>
          {allPatients.map((patient) => (
            <Modal
              title={"Assign Doctor"}
              modalRef={ref}
              trigger={
                <div className="patient-list">
                  <div>{patient._id}</div>
                  <div>{patient.patientName}</div>
                  <div>{patient.age}</div>
                  <div>{patient.gender}</div>
                  <div>{patient.bloodGroup}</div>
                </div>
              }
            >
              <PatientDetails
                data={patient}
                doctors={allDoctors}
                selectDoctor={(doc) => assignPatientToDoctor(doc, patient)}
              />
            </Modal>
          ))}
        </div>
      </div>
    </HomeContainer>
  );
}

export { Patient };
