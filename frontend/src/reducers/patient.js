import {
  ADD_PATIENT,
  GET_ALL_PATIENTS,
  patientState,
} from "../actions/Patient";

const patientReducer = (state = patientState, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_PATIENT:
      return {
        ...state,
        ...data,
      };
    case GET_ALL_PATIENTS:
      const allPatients = data;
      const _allPat = [];
      const _allPatientDetails = {};
      allPatients.forEach((patient) => {
        const patientData = {
          _id: patient[0].toLowerCase(),
          patientName: patient[1],
          age: patient[2],
          gender: patient[3],
          bloodGroup: patient[4],
          Address: patient[5],
          device_id: patient[6],
          doctorAssigned:
            patient[7].toString() === patient[0]
              ? "Not Assigned"
              : patient[7].toString(),
          hospital: patient[9].toString(),
        };
        _allPat.push(patientData);
        _allPatientDetails[patientData._id] = { ...patientData };
      });
      return {
        ...state,
        totalPatients: data,
        allPatients: [..._allPat.reverse()],
        allPatientDetails: _allPatientDetails,
      };
    default:
      return {
        ...state,
      };
  }
};

export default patientReducer;
