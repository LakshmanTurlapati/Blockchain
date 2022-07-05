import { GET_PATIENT_DATA } from "../actions/Monitor";
import { monitorState } from "../actions/Monitor";

const monitorReducer = (state = monitorState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_PATIENT_DATA:
      return {
        ...state,
        patientData: data.reverse(),
      };

    default:
      return {
        ...state,
      };
  }
};

export default monitorReducer;
