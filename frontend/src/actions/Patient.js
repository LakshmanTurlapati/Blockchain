const patientState = {
  patientDetails: {
    patientName: "",
    bloodGroup: "",
    age: "",
    gender: "",
    Address: "",
    hospital: "",
    device_id: "",
  },
  allPatients: [],
  allPatientDetails: {},
  totalPatients: null,
};

const GET_PATIENT = "GET_PATIENT";
const GET_PATIENTS = "GET_PATIENTS";
const ADD_PATIENT = "ADD_PATIENT";
const GET_ALL_PATIENTS = "GET_ALL_PATIENTS";

export {
  ADD_PATIENT,
  GET_PATIENT,
  GET_PATIENTS,
  patientState,
  GET_ALL_PATIENTS,
};
