import { createContext, useContext, useReducer } from "react";
import assignContract from "../contractEther/assign";
import { toast } from "react-toastify";
import {
  assignState,
  ASSIGN_DOCTOR,
  GET_ASSIGNED_PATIENTS,
} from "../actions/Assign";
import assignReducer from "../reducers/assign";
import patientContract from "../contractEther/patient";

const AssignContext = createContext(assignState);
const AssignContract = assignContract();
const PatientContract = patientContract();

const AssignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assignReducer, assignState);

  return (
    <AssignContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AssignContext.Provider>
  );
};

const useAssign = () => useContext(AssignContext);

const assignDoctor = async (doc_id, doc_name, patient_id) => {
  try {
    const resp = await AssignContract.AssignPatientToDoctor(
      doc_id,
      doc_name,
      patient_id
    );
    await PatientContract.editPatientData(patient_id, doc_id);
    toast.success("Doctor Assigned Successfully");
    return { type: ASSIGN_DOCTOR, data: { assigned: true } };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
  }
};

const getPatientsAssigned = async (doctor_id) => {
  try {
    const doctorsPatientslength =
      await AssignContract.getPatientsAssignedLength(doctor_id);
    const res = [];
    for (let i = 0; i < parseInt(doctorsPatientslength); i++) {
      const [_id, name, patient_id] = await AssignContract.getPatientByDoctor(
        doctor_id,
        i
      );
      res.push({
        _id: doctor_id.toLowerCase(),
        doctorName: name,
        patient_id: patient_id.toLowerCase(),
      });
    }
    toast.success("Fetched Assigned Patients Successfully");
    return { type: GET_ASSIGNED_PATIENTS, data: res };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
  }
};

export { AssignProvider, useAssign, assignDoctor, getPatientsAssigned };
