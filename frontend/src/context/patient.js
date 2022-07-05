import { createContext, useContext, useReducer } from "react";
import {
  ADD_PATIENT,
  GET_PATIENT,
  GET_PATIENTS,
  GET_ALL_PATIENTS,
  patientState,
} from "../actions/Patient";
import patientContract from "../contractEther/patient";
import patientReducer from "../reducers/patient";
import { toast } from "react-toastify";
import axios from "axios";

const PatientContext = createContext(patientState);
const PatientContract = patientContract();

const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, patientState);

  return (
    <PatientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

const usePatient = () => useContext(PatientContext);

const addPatient = async (data, patientData) => {
  try {
    const resp = await PatientContract.addPatient(...data);
    const registerResp = await axios.post(
      `${process.env.REACT_APP_HEALTH_API}/register`,
      {
        name: patientData["patientName"].value,
        publicId: patientData["pId"].value,
        phone: patientData["phone"].value,
        type: "patient",
      }
    );
    const pId = resp;
    toast.success("Patient Added Succesfully");
    return { type: ADD_PATIENT, data: { pId } };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
    // return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

const getAllPatients = async () => {
  try {
    const patientsLength = await PatientContract.totalPatientsLength();
    const patientDataList = [];
    for (let i = 0; i < patientsLength; i++) {
      const patientId = await PatientContract.getPatientId(i);
      const patientData = await PatientContract.getPatient(patientId);
      patientDataList.push(patientData);
    }
    return { type: GET_ALL_PATIENTS, data: patientDataList };
  } catch (e) {
    console.log(e);
    // return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { PatientProvider, usePatient, addPatient, getAllPatients };
