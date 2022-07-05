import { createContext, useContext, useReducer } from "react";
import { GET_ROLE, healthState, GET_ROLE_ERROR } from "../actions/Health";
import assignContract from "../contractEther/assign";
import doctorContract from "../contractEther/doctor";
import patientContract from "../contractEther/patient";
import { healthReducer } from "../reducers/health";

const HealthContext = createContext(healthState);
const HealthContract = assignContract();
const PatientContract = patientContract();
const DoctorContract = doctorContract();

const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, healthState);

  return (
    <HealthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

const useHealth = () => useContext(HealthContext);

const getRole = async (id) => {
  try {
    // const resp = await HealthContract.getRole();
    const res = { type: GET_ROLE, data: {} };
    const isValidDoctor = await DoctorContract.isDoctorValid(id);
    const isValidPatient = await PatientContract.isValidPatient(id);
    if (id == 0xb39bb3b7e9d15d53ba99286202ae82ebd148197c)
      res.data = { type: "ROOT", _id: id, role: 0 };
    else if (isValidDoctor) res.data = { type: "DOCTOR", _id: id, role: 1 };
    else if (isValidPatient) res.data = { type: "PATIENT", _id: id, role: 2 };
    else res.data = { type: "INVALID", _id: id, role: -1 };
    return { ...res };
  } catch (e) {
    console.log(e);
    return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { HealthProvider, useHealth, getRole };
