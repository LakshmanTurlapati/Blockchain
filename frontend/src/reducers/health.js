import { GET_ROLE, healthState, SET_LOADING } from "../actions/Health";

export const healthReducer = (state = healthState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_ROLE:
      return {
        ...state,
        ...data,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: data,
      };
    default:
      return {
        ...state,
      };
  }
};
