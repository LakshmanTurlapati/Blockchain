import { ADD_DOCTOR, GET_ALL_DOCTORS, doctorState } from "../actions/Doctor";

const doctorReducer = (state = doctorState, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_DOCTOR:
      return {
        ...state,
        ...data,
      };
    case GET_ALL_DOCTORS:
      const allDoctors = data;
      const _allDoctors = [];
      allDoctors.forEach((doctor) => {
        _allDoctors.push({
          _id: doctor[0],
          doctorName: doctor[1],
          age: doctor[2],
          gender: doctor[3],
          bloodGroup: doctor[4],
          Address: doctor[5],
          hospital: doctor[6],
        });
      });
      return {
        ...state,
        totalDoctors: data,
        allDoctors: [..._allDoctors.reverse()],
      };
    default:
      return {
        ...state,
      };
  }
};

export default doctorReducer;
