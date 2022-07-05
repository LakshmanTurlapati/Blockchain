const doctorState = {
  doctorDetails: {
    _id: null,
    doctorName: null,
    age: null,
    gender: null,
    bloodGroup: null,
    Address: null,
    hospital: null,
    device_id: null,
    doctorAssigned: null,
    role: null,
  },
  allDoctors: [],
  totalDoctors: null,
};

const GET_DOCTOR = "GET_DOCTOR";
const GET_DOCTORS = "GET_DOCTORS";
const ADD_DOCTOR = "ADD_DOCTOR";
const GET_ALL_DOCTORS = "GET_ALL_DOCTORS";

export { ADD_DOCTOR, GET_DOCTOR, GET_DOCTORS, doctorState, GET_ALL_DOCTORS };
