import {
  ASSIGN_DOCTOR,
  GET_ASSIGNED_PATIENTS,
  assignState,
} from "../actions/Assign";

const assignReducer = (state = assignState, action) => {
  const { type, data } = action;
  switch (type) {
    case ASSIGN_DOCTOR:
      return {
        ...state,
        ...data,
      };
    case GET_ASSIGNED_PATIENTS:
      const patients = data;
      return {
        ...state,
        patients: patients,
      };
    default:
      return {
        ...state,
      };
  }
};

export default assignReducer;
